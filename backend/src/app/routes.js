import express from 'express';
import { createAuthRoutes } from '../modules/auth/auth.routes.js';
import { createOrganizationRoutes } from '../modules/organizations/organization.routes.js';
import { createProviderRoutes } from '../modules/providers/provider.routes.js';
import { createClientRoutes } from '../modules/clients/client.routes.js';
import { createConsentRoutes } from '../modules/consent/consent.routes.js';
import { createAssessmentRoutes } from '../modules/assessments/assessment.routes.js';
import { createAppointmentRoutes } from '../modules/appointments/appointment.routes.js';
import { createCarePlanRoutes } from '../modules/carePlans/carePlan.routes.js';
import { createClinicalRecordRoutes } from '../modules/clinicalRecords/clinicalRecord.routes.js';
import { createReferralRoutes } from '../modules/referrals/referral.routes.js';
import { createSafetyRoutes } from '../modules/safety/safety.routes.js';
import { createResourceRoutes } from '../modules/resources/resource.routes.js';
import { createNotificationRoutes } from '../modules/notifications/notification.routes.js';
import { createReportingRoutes } from '../modules/reporting/reporting.routes.js';
import { createFileRoutes } from '../modules/files/file.routes.js';
import { createAdminRoutes } from '../modules/administration/admin.routes.js';
import { authenticate } from '../middleware/authenticate.js';
import { resolveTenant } from '../middleware/tenant.js';

export function createApiRoutes(container){const r=express.Router(); r.use('/auth',createAuthRoutes(container)); const protectedRouter=express.Router(); protectedRouter.use(authenticate(container.env)); protectedRouter.use(resolveTenant); protectedRouter.use('/organizations',createOrganizationRoutes()); protectedRouter.use('/providers',createProviderRoutes()); protectedRouter.use('/clients',createClientRoutes()); protectedRouter.use('/consents',createConsentRoutes()); protectedRouter.use('/assessments',createAssessmentRoutes()); protectedRouter.use('/appointments',createAppointmentRoutes(container)); protectedRouter.use('/care-plans',createCarePlanRoutes()); protectedRouter.use('/clinical-records',createClinicalRecordRoutes()); protectedRouter.use('/referrals',createReferralRoutes()); protectedRouter.use('/safety',createSafetyRoutes()); protectedRouter.use('/resources',createResourceRoutes()); protectedRouter.use('/notifications',createNotificationRoutes()); protectedRouter.use('/reports',createReportingRoutes()); protectedRouter.use('/files',createFileRoutes()); protectedRouter.use('/admin',createAdminRoutes()); r.use(protectedRouter); return r;}
