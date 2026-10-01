import { register, login, refresh, logout, verifyEmail, requestPasswordReset, resetPassword, createEmailVerification } from './auth.service.js';

function setRefreshCookie(res, env, token) {
  res.cookie(env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: 'lax',
    path: '/api/v1/auth',
    maxAge: env.REFRESH_TOKEN_TTL_DAYS * 86400000
  });
}

export function createAuthController({env}){
  return {
    register: async(req,res)=>{
      const data=await register(req.body,{env,req});
      setRefreshCookie(res,env,data.refreshToken);
      const {refreshToken:_refresh,...safe}=data;
      res.status(201).json({success:true,data:safe});
    },
    login: async(req,res)=>{
      const data=await login(req.body,{env,req});
      setRefreshCookie(res,env,data.refreshToken);
      const {refreshToken:_refresh,...safe}=data;
      res.json({success:true,data:safe});
    },
    verifyEmail: async(req,res)=>{await verifyEmail(req.params.token);res.json({success:true,data:{verified:true}});},
    requestPasswordReset: async(req,res)=>{const token=await requestPasswordReset(req.body.email);res.json({success:true,data:{accepted:true,delivery:'EMAIL_ADAPTER_REQUIRED',developmentToken:env.NODE_ENV==='development'?token:undefined}});},
    resetPassword: async(req,res)=>{await resetPassword(req.body.token,req.body.password);res.json({success:true,data:{reset:true}});},
    refresh: async(req,res)=>{
      const refreshToken=req.cookies?.[env.COOKIE_NAME] || req.body?.refreshToken;
      if(!refreshToken) return res.status(401).json({success:false,error:{code:'AUTHENTICATION_ERROR',message:'Refresh session required.'}});
      const data=await refresh(refreshToken,{env,req});
      setRefreshCookie(res,env,data.refreshToken);
      const {refreshToken:_refresh,...safe}=data;
      res.json({success:true,data:safe});
    },
    logout: async(req,res)=>{
      const refreshToken=req.cookies?.[env.COOKIE_NAME] || req.body?.refreshToken;
      if(refreshToken) await logout(refreshToken);
      res.clearCookie(env.COOKIE_NAME,{httpOnly:true,secure:env.COOKIE_SECURE,sameSite:'lax',path:'/api/v1/auth'});
      res.status(204).send();
    }
  };
}
