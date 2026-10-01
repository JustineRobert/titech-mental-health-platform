import { z } from 'zod';
export const providerSchema=z.object({organizationId:z.string(),userId:z.string(),licenseReference:z.string().max(200).optional(),specialties:z.array(z.string()).default([]),bio:z.string().max(2000).optional(),languages:z.array(z.string()).default([]),status:z.enum(['ACTIVE','INACTIVE','PENDING']).default('PENDING')});
