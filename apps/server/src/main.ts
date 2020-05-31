import { Device } from './app/Device';
import * as config from '../config.json';
import { log } from '@odedw/shared';
const WS = require('ws');

async function main(): Promise<void> {
  const device = await Device.create(config.device.ip, config.device.mac);
  // return;
  const wss = new WS.Server({ port: 2424 });

  wss.on('connection', function connection(ws) {
    console.log('connected...');

    ws.on('message', (message) => {
      console.log('received: %s', message);
      const payload = JSON.parse(message);
      if (payload.target === 'LifxDevice') {
        device.handle(payload);
      }
    });

    ws.send('something');
  });
  log.info('running');
}

log.info('Starting up...');
main();
