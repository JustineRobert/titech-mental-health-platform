import Redis from 'ioredis';

export function createRedis(url) {
  const client = new Redis(url, { lazyConnect: true, maxRetriesPerRequest: 2 });
  return client;
}

export async function connectRedis(client) {
  if (client.status === 'wait') await client.connect();
  return client;
}

export async function disconnectRedis(client) {
  if (client && client.status !== 'end') await client.quit();
}
