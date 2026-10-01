import { AppError } from '../errors/AppError.js';
import { recordAudit } from '../../modules/audit/audit.service.js';

export function createCrudController({ Model, resourceType, createSchema, updateSchema, policy = {} }) {
  return {
    list: async(req,res)=>{ const docs=await Model.find({tenantId:req.tenantId,...(policy.listFilter?.(req)||{})}).limit(200).lean(); res.json({success:true,data:docs}); },
    get: async(req,res)=>{ const doc=await Model.findOne({_id:req.params.id,tenantId:req.tenantId}); if(!doc) throw new AppError(`${resourceType} not found.`,{statusCode:404,code:'NOT_FOUND'}); if(policy.canRead && !policy.canRead(req,doc)) throw new AppError('Access denied.',{statusCode:403,code:'AUTHORIZATION_ERROR'}); res.json({success:true,data:doc}); },
    create: async(req,res)=>{ const data=createSchema?createSchema.parse(req.body):req.body; const doc=await Model.create({...data,tenantId:req.tenantId}); await recordAudit({tenantId:req.tenantId,actorId:req.user.sub,action:`${resourceType.toUpperCase()}_CREATED`,resourceType,resourceId:doc._id,correlationId:req.correlationId}); res.status(201).json({success:true,data:doc}); },
    update: async(req,res)=>{ const data=updateSchema?updateSchema.parse(req.body):req.body; const doc=await Model.findOneAndUpdate({_id:req.params.id,tenantId:req.tenantId},data,{new:true,runValidators:true}); if(!doc) throw new AppError(`${resourceType} not found.`,{statusCode:404,code:'NOT_FOUND'}); await recordAudit({tenantId:req.tenantId,actorId:req.user.sub,action:`${resourceType.toUpperCase()}_UPDATED`,resourceType,resourceId:doc._id,correlationId:req.correlationId}); res.json({success:true,data:doc}); },
  };
}
