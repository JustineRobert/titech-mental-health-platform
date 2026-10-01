import { AppError } from '../shared/errors/AppError.js';

export function notFound(req, _res, next) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, { statusCode: 404, code: 'NOT_FOUND' }));
}

export function errorHandler(err, req, res, _next) {
  const status = err instanceof AppError ? err.statusCode : 500;
  const code = err instanceof AppError ? err.code : 'INTERNAL_ERROR';
  const details = err instanceof AppError && err.expose ? err.details : undefined;
  if (req.log) req.log.error({ err, correlationId: req.correlationId, code }, err.message);
  res.status(status).json({ success: false, error: { code, message: status < 500 ? err.message : 'An unexpected error occurred.', details, correlationId: req.correlationId } });
}
