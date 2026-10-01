import pino from 'pino';

export function createLogger(level = 'info') {
  return pino({ level, redact: { paths: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.token', '*.refreshToken'], censor: '[REDACTED]' } });
}
