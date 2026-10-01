import { AppError } from '../shared/errors/AppError.js';

export function validate(schema, source = 'body') {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(new AppError('Request validation failed.', { statusCode: 400, code: 'VALIDATION_ERROR', details: result.error.flatten() }));
    }
    req[source] = result.data;
    next();
  };
}
