import crypto from 'node:crypto';

export function requestContext(req, res, next) {
  const correlationId = req.get('X-Correlation-Id') || crypto.randomUUID();
  req.correlationId = correlationId;
  res.setHeader('X-Correlation-Id', correlationId);
  next();
}
