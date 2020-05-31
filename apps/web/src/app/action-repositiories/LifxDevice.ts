import {
  LifxDevice as LifxDeviceInterface,
  TurnOnMessage,
  TurnOffMessage,
} from '@odedw/shared';
import * as log from 'loglevel';

class LifxDevice implements LifxDeviceInterface {
  socket: WebSocket;
  constructor() {
    this.socket = new WebSocket('ws://127.0.0.1:2424');
  }

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.onopen = (event) => {
        log.info('connected');
        resolve();
      };
    });
  }

  toggle(duration: number = 0): Promise<void> {
    log.info('toggle');
    return Promise.resolve();
  }

  turnOn(duration: number = 0): Promise<void> {
    log.info('turnOn');
    const turnOnMessage = new TurnOnMessage();
    this.socket.send(JSON.stringify(turnOnMessage));
    return Promise.resolve();
  }

  turnOff(duration: number = 0): Promise<void> {
    log.info('turnOff');
    const turnOffMessage = new TurnOffMessage();
    this.socket.send(JSON.stringify(turnOffMessage));
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

export default new LifxDevice();
