import { bootstrap } from './app/ApplicationBootstrap.js';
const {app,container}=await bootstrap();
const server=app.listen(container.env.PORT,()=>container.logger.info({port:container.env.PORT},'TITech Mental Health Platform started'));
async function shutdown(signal){container.logger.info({signal},'Shutdown requested');server.close(async()=>{try{await container.redis?.quit();const {disconnectDatabase}=await import('./config/database.js');await disconnectDatabase();process.exit(0);}catch(error){container.logger.error(error);process.exit(1);}});}
process.on('SIGTERM',()=>shutdown('SIGTERM'));process.on('SIGINT',()=>shutdown('SIGINT'));
