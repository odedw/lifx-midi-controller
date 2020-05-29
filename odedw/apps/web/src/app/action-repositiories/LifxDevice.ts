// import { LifxDevice as LifxDeviceInterface } from "../../../shared";
import * as log from 'loglevel';

class LifxDevice {
  //implements LifxDeviceInterface {
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

  turnOff(duration: number = 0): Promise<void> {
    log.info('turnOff');
    this.socket.send('turnOff');
    return Promise.resolve();
  }

  turnOn(duration: number = 0): Promise<void> {
    log.info('turnOn');
    this.socket.send('turnOn');
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
