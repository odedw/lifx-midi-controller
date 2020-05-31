import { WsMessage } from './WsMessage';

export interface SmartLightInterface {
  turnOff: (duration: number) => Promise<void>;
  turnOn: (duration: number) => Promise<void>;
  setColor: (
    hex: string,
    brightness: number,
    duration: number
  ) => Promise<void>;
}

export abstract class SmartLightMessage implements WsMessage {
  abstract method: string;
  static target = 'SmartLight';
  target: string = SmartLightMessage.target;
  duration: number;
  constructor(duration: number = 0) {
    this.duration = duration;
  }
}
export class TurnOnMessage extends SmartLightMessage {
  method = 'turnOn';
}

export class TurnOffMessage extends SmartLightMessage {
  method = 'turnOff';
}
