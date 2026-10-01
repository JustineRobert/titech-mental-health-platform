import { z } from 'zod';
export const registerSchema=z.object({email:z.string().email(),password:z.string().min(12).max(128),firstName:z.string().min(1).max(80),lastName:z.string().min(1).max(80),tenantName:z.string().min(2).max(150)});
export const loginSchema=z.object({email:z.string().email(),password:z.string().min(1)});
export const passwordResetRequestSchema=z.object({email:z.string().email()});
export const passwordResetSchema=z.object({token:z.string().min(20),password:z.string().min(12).max(128)});
