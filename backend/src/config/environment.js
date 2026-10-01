import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  MONGODB_URI: z.string().min(1),
  REDIS_URL: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  ACCESS_TOKEN_TTL: z.string().default('15m'),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().int().positive().default(30),
  COOKIE_NAME: z.string().default('titech_refresh'),
  COOKIE_SECURE: z.enum(['true', 'false']).default('false'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  LOG_LEVEL: z.string().default('info'),
  ENABLE_AI_ASSISTANCE: z.enum(['true', 'false']).default('false'),
  ENABLE_SMS: z.enum(['true', 'false']).default('false'),
  ENABLE_TELEHEALTH: z.enum(['true', 'false']).default('false'),
  STORAGE_BUCKET: z.string().default('titech-mental-health-private'),
  MAX_UPLOAD_BYTES: z.coerce.number().int().positive().default(10 * 1024 * 1024)
});

export function loadEnvironment(source = process.env) {
  const parsed = schema.safeParse(source);
  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ');
    throw new Error(`Invalid environment configuration: ${details}`);
  }
  return {
    ...parsed.data,
    COOKIE_SECURE: parsed.data.COOKIE_SECURE === 'true',
    ENABLE_AI_ASSISTANCE: parsed.data.ENABLE_AI_ASSISTANCE === 'true',
    ENABLE_SMS: parsed.data.ENABLE_SMS === 'true',
    ENABLE_TELEHEALTH: parsed.data.ENABLE_TELEHEALTH === 'true'
  };
}
