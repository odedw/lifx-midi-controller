import { LifxDevice } from '../LifxDevice';
import * as config from '../../../config.json';
import {
  SmartLightMessage,
  TurnOnMessage,
  TurnOffMessage,
} from '@odedw/shared';

export class SmartLightRouter {
  lifxDevice: LifxDevice;
  public async init(): Promise<void> {
    this.lifxDevice = await LifxDevice.create(
      config.device.ip,
      config.device.mac
    );
  }

  public route(msg: SmartLightMessage) {
    switch (msg.method) {
      case 'turnOn':
        let turnOnMessage = msg as TurnOnMessage;
        this.lifxDevice.turnOn(turnOnMessage.duration);
        break;
      case 'turnOff':
        let turnOnffMessage = msg as TurnOffMessage;
        this.lifxDevice.turnOff(turnOnffMessage.duration);
        break;

      default:
        break;
    }
  }
}

export const smartLightRouter = new SmartLightRouter();
