import { WsMessage } from './WsMessage';

export interface LifxDevice {
  toggle: (duration: number) => Promise<void>;
  turnOff: (duration: number) => Promise<void>;
  turnOn: (duration: number) => Promise<void>;
  setColor: (
    hex: string,
    brightness: number,
    duration: number
  ) => Promise<void>;
}

abstract class LifxDeviceMessage implements WsMessage {
  abstract method: string;
  target = 'LifxDevice';
  duration: number;
  constructor(duration: number = 0) {
    this.duration = duration;
  }
}
export class TurnOnMessage extends LifxDeviceMessage {
  method = 'turnOn';
}

export class TurnOffMessage extends LifxDeviceMessage {
  method = 'turnOff';
}
