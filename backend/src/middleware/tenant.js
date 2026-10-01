import { AppError } from '../shared/errors/AppError.js';
import OrganizationMembership from '../modules/organizations/organizationMembership.model.js';

export async function resolveTenant(req, _res, next) {
  try {
    const tenantId = req.get('X-Tenant-Id') || req.user?.tenantId;
    if (!tenantId) return next(new AppError('Tenant context is required.', { statusCode: 400, code: 'TENANT_ACCESS_ERROR' }));
    const membership = await OrganizationMembership.findOne({ userId: req.user.sub, tenantId, status: 'ACTIVE' }).lean();
    if (!membership) return next(new AppError('Tenant access denied.', { statusCode: 403, code: 'TENANT_ACCESS_ERROR' }));
    req.tenantId = tenantId;
    req.user.permissions = membership.permissions;
    req.user.role = membership.role;
    next();
  } catch (error) { next(error); }
}
