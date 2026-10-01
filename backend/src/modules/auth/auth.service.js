import crypto from 'node:crypto';
import User from '../users/user.model.js';
import Session from './session.model.js';
import Tenant from '../tenancy/tenant.model.js';
import Organization from '../organizations/organization.model.js';
import OrganizationMembership from '../organizations/organizationMembership.model.js';
import Client from '../clients/client.model.js';
import VerificationToken from './verificationToken.model.js';
import { hashPassword, verifyPassword } from '../../shared/security/password.js';
import { createAccessToken, createRefreshToken, hashToken } from '../../shared/security/tokens.js';
import { AppError } from '../../shared/errors/AppError.js';
import { recordAudit } from '../audit/audit.service.js';

const ROLE_PERMISSIONS={
  SUPER_ADMIN:['*'], PLATFORM_ADMIN:['*'], TENANT_ADMIN:['organization:read','organization:manage','user:manage','provider:read','provider:manage','client:read','client:create','client:update','assessment:read','assessment:create','assessment:complete','appointment:read','appointment:create','appointment:update','care_plan:read','care_plan:create','care_plan:update','clinical_record:read','clinical_record:create','clinical_record:update','referral:create','referral:read','safety:read','safety:create','safety:escalate','audit:read','report:read','resource:read','resource:manage','administration:manage','consent:read','consent:create','consent:update'],
  ORGANIZATION_ADMIN:['organization:read','organization:manage','provider:read','provider:manage','client:read','client:create','client:update','assessment:read','assessment:create','assessment:complete','appointment:read','appointment:create','appointment:update','care_plan:read','care_plan:create','care_plan:update','clinical_record:read','clinical_record:create','clinical_record:update','referral:create','referral:read','safety:read','safety:create','safety:escalate','audit:read','report:read','resource:read','resource:manage','consent:read','consent:create','consent:update'],
  CLINICIAN:['client:read','client:update','assessment:read','assessment:create','assessment:complete','appointment:read','appointment:create','appointment:update','care_plan:read','care_plan:create','care_plan:update','clinical_record:read','clinical_record:create','clinical_record:update','referral:create','referral:read','safety:read','safety:create','safety:escalate','resource:read','consent:read','consent:create','consent:update'],
  COUNSELOR:['client:read','assessment:read','assessment:create','assessment:complete','appointment:read','appointment:create','appointment:update','care_plan:read','care_plan:create','care_plan:update','clinical_record:read','clinical_record:create','clinical_record:update','referral:create','referral:read','safety:read','safety:create','safety:escalate','resource:read','consent:read','consent:create','consent:update'],
  CLIENT:['client:read','appointment:read','appointment:create','care_plan:read','assessment:read','assessment:create','resource:read','consent:read','consent:create','consent:update']
};

export async function register(input,{env,req}){
  const exists=await User.findOne({email:input.email}); if(exists) throw new AppError('An account with this email already exists.',{statusCode:409,code:'CONFLICT'});
  const passwordHash=await hashPassword(input.password);
  const tenant=await Tenant.create({name:input.tenantName,slug:`${input.tenantName.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${crypto.randomBytes(3).toString('hex')}`});
  const org=await Organization.create({tenantId:tenant._id,name:input.tenantName,type:'COUNSELING_CENTER'});
  const user=await User.create({email:input.email,passwordHash,firstName:input.firstName,lastName:input.lastName});
  const role='TENANT_ADMIN';
  await OrganizationMembership.create({tenantId:tenant._id,organizationId:org._id,userId:user._id,role,permissions:ROLE_PERMISSIONS[role]});
  const result=await issueSession(user,{env,tenantId:tenant._id,req});
  await recordAudit({tenantId:tenant._id,actorId:user._id,action:'USER_REGISTERED',resourceType:'User',resourceId:user._id,correlationId:req?.correlationId,metadata:{role}});
  return {...result,user:{id:user._id,email:user.email,firstName:user.firstName,lastName:user.lastName,tenantId:tenant._id,role,permissions:ROLE_PERMISSIONS[role]}};
}

export async function login(input,{env,req}){
  const user=await User.findOne({email:input.email});
  if(user?.lockedUntil && user.lockedUntil>new Date()) throw new AppError('Account temporarily locked. Try again later.',{statusCode:429,code:'RATE_LIMITED'});
  const valid=user && await verifyPassword(input.password,user.passwordHash);
  if(!valid){
    if(user){
      user.failedLoginAttempts=(user.failedLoginAttempts||0)+1;
      if(user.failedLoginAttempts>=5){ user.lockedUntil=new Date(Date.now()+15*60*1000); user.failedLoginAttempts=0; }
      await user.save();
    }
    throw new AppError('Invalid credentials.',{statusCode:401,code:'AUTHENTICATION_ERROR'});
  }
  if(user.status!=='ACTIVE') throw new AppError('Account is not active.',{statusCode:403,code:'AUTHORIZATION_ERROR'});
  user.failedLoginAttempts=0; user.lockedUntil=null;
  const membership=await OrganizationMembership.findOne({userId:user._id,status:'ACTIVE'}).lean();
  if(!membership) throw new AppError('No active organization membership exists.',{statusCode:403,code:'TENANT_ACCESS_ERROR'});
  user.lastLoginAt=new Date(); await user.save();
  const result=await issueSession(user,{env,tenantId:membership.tenantId,req});
  await recordAudit({tenantId:membership.tenantId,actorId:user._id,action:'LOGIN_SUCCESS',resourceType:'User',resourceId:user._id,correlationId:req?.correlationId});
  const client=await Client.findOne({tenantId:membership.tenantId,userId:user._id,status:'ACTIVE'}).select({_id:1}).lean();
  return {...result,user:{id:user._id,email:user.email,firstName:user.firstName,lastName:user.lastName,tenantId:membership.tenantId,clientId:client?._id,role:membership.role,permissions:membership.permissions}};
}

async function issueSession(user,{env,tenantId,req,rotatedFrom}){
  const refreshToken=createRefreshToken();
  const expiresAt=new Date(Date.now()+env.REFRESH_TOKEN_TTL_DAYS*86400000);
  const session=await Session.create({userId:user._id,tokenHash:hashToken(refreshToken),expiresAt,userAgent:req?.get?.('user-agent'),ip:req?.ip,rotatedFrom,lastUsedAt:new Date()});
  const accessToken=createAccessToken({sub:String(user._id),tenantId:String(tenantId),type:'access'},env);
  return {accessToken,refreshToken,sessionId:session._id};
}

export async function refresh(refreshToken,{env,req}){
  const session=await Session.findOne({tokenHash:hashToken(refreshToken),revokedAt:null,expiresAt:{$gt:new Date()}});
  if(!session) throw new AppError('Invalid refresh session.',{statusCode:401,code:'AUTHENTICATION_ERROR'});
  const user=await User.findById(session.userId); if(!user || user.status!=='ACTIVE') throw new AppError('Account unavailable.',{statusCode:401,code:'AUTHENTICATION_ERROR'});
  const membership=await OrganizationMembership.findOne({userId:user._id,status:'ACTIVE'}).lean(); if(!membership) throw new AppError('No active tenant membership.',{statusCode:403,code:'TENANT_ACCESS_ERROR'});
  session.revokedAt=new Date(); session.lastUsedAt=new Date(); await session.save();
  const client=await Client.findOne({tenantId:membership.tenantId,userId:user._id,status:'ACTIVE'}).select({_id:1}).lean();
  return {...await issueSession(user,{env,tenantId:membership.tenantId,req,rotatedFrom:session._id}),user:{id:user._id,email:user.email,firstName:user.firstName,lastName:user.lastName,tenantId:membership.tenantId,clientId:client?._id,role:membership.role,permissions:membership.permissions}};
}

export async function createEmailVerification(userId){
  const token=createRefreshToken();
  await VerificationToken.create({userId,tokenHash:hashToken(token),purpose:'EMAIL_VERIFY',expiresAt:new Date(Date.now()+86400000)});
  return token;
}

export async function verifyEmail(token){
  const entry=await VerificationToken.findOne({tokenHash:hashToken(token),purpose:'EMAIL_VERIFY',usedAt:null,expiresAt:{$gt:new Date()}});
  if(!entry) throw new AppError('Invalid or expired verification token.',{statusCode:400,code:'AUTHENTICATION_ERROR'});
  await User.updateOne({_id:entry.userId},{$set:{emailVerified:true}}); await VerificationToken.updateOne({_id:entry._id},{$set:{usedAt:new Date()}});
}

export async function requestPasswordReset(email){
  const user=await User.findOne({email});
  const token=createRefreshToken();
  if(user) await VerificationToken.create({userId:user._id,tokenHash:hashToken(token),purpose:'PASSWORD_RESET',expiresAt:new Date(Date.now()+30*60*1000)});
  return token;
}

export async function resetPassword(token,password){
  const entry=await VerificationToken.findOne({tokenHash:hashToken(token),purpose:'PASSWORD_RESET',usedAt:null,expiresAt:{$gt:new Date()}});
  if(!entry) throw new AppError('Invalid or expired password reset token.',{statusCode:400,code:'AUTHENTICATION_ERROR'});
  await User.updateOne({_id:entry.userId},{$set:{passwordHash:await hashPassword(password),failedLoginAttempts:0,lockedUntil:null}});
  await Session.updateMany({userId:entry.userId,revokedAt:null},{$set:{revokedAt:new Date()}});
  await VerificationToken.updateOne({_id:entry._id},{$set:{usedAt:new Date()}});
}

export async function logout(refreshToken){ await Session.updateOne({tokenHash:hashToken(refreshToken),revokedAt:null},{$set:{revokedAt:new Date()}}); }
