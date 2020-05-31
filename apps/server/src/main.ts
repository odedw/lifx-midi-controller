import { log } from '@odedw/shared';
import server from './app/server';
import { router } from './app/routers';
async function main(): Promise<void> {
  await router.init();
  server.init(router);

  log.info('Running');
}

log.info('Starting up');
main();
