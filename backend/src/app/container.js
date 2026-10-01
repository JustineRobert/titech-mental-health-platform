import { loadEnvironment } from '../config/environment.js'; import { createLogger } from '../infrastructure/logging/logger.js'; import { createRedis } from '../config/redis.js';
export function createContainer(){const env=loadEnvironment(); const logger=createLogger(env.LOG_LEVEL); const redis=createRedis(env.REDIS_URL); return {env,logger,redis};}
