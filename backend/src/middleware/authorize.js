import { AppError } from '../shared/errors/AppError.js';

export function authorize(...requiredPermissions) {
  return (req, _res, next) => {
    const permissions = new Set(req.user?.permissions || []);
    const allowed = requiredPermissions.every((permission) => permissions.has(permission) || permissions.has('*'));
    if (!allowed) return next(new AppError('You do not have permission to perform this action.', { statusCode: 403, code: 'AUTHORIZATION_ERROR' }));
    next();
  };
}
