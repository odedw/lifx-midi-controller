import {
  SmartLightInterface,
  TurnOnMessage,
  TurnOffMessage,
  SetColorMessage,
  BlinkMessage,
} from '@odedw/shared';
import { log } from '@odedw/shared';
import { server } from '../services';
class SmartLight implements SmartLightInterface {
  constructor() {}
  blink(increment: number, duration: number): Promise<void> {
    log.info('blink');
    server.send(new BlinkMessage(increment, duration) );
    return Promise.resolve();
  }

  turnOn(duration: number = 0): Promise<void> {
    log.info('turnOn');
    server.send(new TurnOnMessage(duration));
    return Promise.resolve();
  }

  turnOff(duration: number = 0): Promise<void> {
    log.info('turnOff');
    server.send(new TurnOffMessage(duration));
    return Promise.resolve();
  }
  setColor(
    hex: string,
    brightness: number,
    duration: number = 0
  ): Promise<void> {
    log.info('setColor');
    server.send(new SetColorMessage(hex, brightness, duration));
    return Promise.resolve();
  }
}

export default new SmartLight();
