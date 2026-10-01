import express from 'express';
import Organization from './organization.model.js';
import { createCrudController } from '../../shared/http/crudFactory.js';
import { createOrganizationSchema, updateOrganizationSchema } from './organization.validation.js';
import { authorize } from '../../middleware/authorize.js';
export function createOrganizationRoutes(){ const r=express.Router(); const c=createCrudController({Model:Organization,resourceType:'Organization',createSchema:createOrganizationSchema,updateSchema:updateOrganizationSchema}); r.get('/',authorize('organization:read'),c.list); r.get('/:id',authorize('organization:read'),c.get); r.post('/',authorize('organization:manage'),c.create); r.patch('/:id',authorize('organization:manage'),c.update); return r; }
