import { Device } from './app/Device';
import * as config from '../config.json';

const WS = require('ws');

async function main(): Promise<void> {
  const device = await Device.create(config.device.ip, config.device.mac);

  const wss = new WS.Server({ port: 2424 });

  wss.on('connection', function connection(ws) {
    console.log('connected...');

    ws.on('message', (message) => {
      console.log('received: %s', message);
      if (message === 'turnOn') {
        device.turnOn();
      } else if (message === 'turnOff') {
        device.turnOff();
      }
    });

    ws.send('something');
  });
  console.log('running');
}

main();
