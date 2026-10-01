import { z } from 'zod';
export const createOrganizationSchema=z.object({name:z.string().min(2).max(150),type:z.enum(['CLINIC','COUNSELING_CENTER','NGO','EMPLOYER','SCHOOL','COMMUNITY_PROGRAM','HEALTHCARE_PARTNER']),settings:z.record(z.string(),z.any()).optional()});
export const updateOrganizationSchema=createOrganizationSchema.partial();
