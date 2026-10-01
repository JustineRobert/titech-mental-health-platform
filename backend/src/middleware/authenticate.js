import { verifyAccessToken } from '../shared/security/tokens.js';
import { AppError } from '../shared/errors/AppError.js';

export function authenticate(env) {
  return (req, _res, next) => {
    const header = req.get('Authorization');
    if (!header?.startsWith('Bearer ')) return next(new AppError('Authentication required.', { statusCode: 401, code: 'AUTHENTICATION_ERROR' }));
    try {
      req.user = verifyAccessToken(header.slice(7), env);
      next();
    } catch {
      next(new AppError('Invalid or expired access token.', { statusCode: 401, code: 'AUTHENTICATION_ERROR' }));
    }
  };
}
