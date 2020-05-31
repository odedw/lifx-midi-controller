import { log } from '@odedw/shared';
import * as WS from 'ws';
import { Router } from './routers/router';

export class Server {
  public init(router: Router) {
    const wss = new WS.Server({ port: 2424 });
    wss.on('connection', function connection(ws) {
      log.info('Connected');

      ws.on('message', (message) => {
        log.info('Received: ', message);

        const payload = JSON.parse(message);
        router.route(payload);
      });
    });
  }
}

export default new Server();
