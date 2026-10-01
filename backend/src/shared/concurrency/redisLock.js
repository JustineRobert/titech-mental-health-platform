export async function withRedisLock(redis,key,ttlMs,fn){
  if(!redis) return fn();
  const token=`${process.pid}-${Date.now()}-${Math.random()}`;
  const locked=await redis.set(key,token,'PX',ttlMs,'NX');
  if(!locked) { const err=new Error('Resource is busy; retry shortly.'); err.statusCode=409; err.code='CONFLICT'; throw err; }
  try{return await fn();}finally{await redis.eval("if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end",1,key,token);}
}
