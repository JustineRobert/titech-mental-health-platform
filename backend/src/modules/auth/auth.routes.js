import express from 'express';
import { validate } from '../../middleware/validate.js';
import { authRateLimit } from '../../middleware/rateLimit.js';
import { registerSchema, loginSchema, passwordResetRequestSchema, passwordResetSchema } from './auth.validation.js';
import { createAuthController } from './auth.controller.js';

export function createAuthRoutes(deps){
  const r=express.Router();
  const c=createAuthController(deps);
  r.post('/register',authRateLimit,validate(registerSchema),c.register);
  r.post('/login',authRateLimit,validate(loginSchema),c.login);
  r.post('/verify-email/:token',authRateLimit,c.verifyEmail);
  r.post('/request-password-reset',authRateLimit,validate(passwordResetRequestSchema),c.requestPasswordReset);
  r.post('/reset-password',authRateLimit,validate(passwordResetSchema),c.resetPassword);
  r.post('/refresh',c.refresh);
  r.post('/logout',c.logout);
  return r;
}
