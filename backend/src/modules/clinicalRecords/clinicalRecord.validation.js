import { z } from 'zod';
export const clinicalRecordSchema=z.object({clientId:z.string(),providerId:z.string(),appointmentId:z.string().optional(),type:z.enum(['SESSION_NOTE','PROGRESS_NOTE','OBSERVATION','FOLLOW_UP']),content:z.string().min(1).max(20000),attachments:z.array(z.string()).default([])});
