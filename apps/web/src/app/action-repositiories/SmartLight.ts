import {
  SmartLightInterface,
  TurnOnMessage,
  TurnOffMessage,
} from '@odedw/shared';
import { log } from '@odedw/shared';
import { server } from '../services';
class SmartLight implements SmartLightInterface {
  constructor() {}

  toggle(duration: number = 0): Promise<void> {
    log.info('toggle');
    return Promise.resolve();
  }

  turnOn(duration: number = 0): Promise<void> {
    log.info('turnOn');
    server.send(new TurnOnMessage());
    return Promise.resolve();
  }

  turnOff(duration: number = 0): Promise<void> {
    log.info('turnOff');
    server.send(new TurnOffMessage());
    return Promise.resolve();
  }
  setColor(
    hex: string,
    brightness: number,
    duration: number = 0
  ): Promise<void> {
    log.info('setColor');
    return Promise.resolve();
  }
}

export default new SmartLight();
