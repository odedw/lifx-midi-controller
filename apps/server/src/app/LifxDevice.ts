import Lifx from 'node-lifx-lan';
import { LifxLanColor, LifxLanDevice } from './types/Lifx';
import { SmartLightInterface } from '@odedw/shared';
import { log } from '@odedw/shared';

// Lifx.discover()
//   .then((device_list) => {
//     device_list.forEach((device) => {
//       console.log(
//         [device["ip"], device["mac"], device["deviceInfo"]["label"]].join(" | ")
//       );
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });

export class LifxDevice implements SmartLightInterface {
  lifxLanDevice: LifxLanDevice;
  power: boolean;
  color: any;
  static create(ip: string, mac: string): Promise<LifxDevice> {
    let instance: LifxDevice;
    log.info('Creating LIFX device');
    return (
      Lifx.createDevice({
        mac,
        ip,
      })
        .then((d: any) => {
          instance = new LifxDevice(d);
          return instance.turnOff(0);
        })
        // .then(() => instance.setColor('#FFFFFF', 1, 0))
        .then(() => instance)
    );
  }

  private constructor(lifxLanDevice: LifxLanDevice) {
    this.lifxLanDevice = lifxLanDevice;
  }

  setColor(
    hex: string,
    brightness: number,
    duration: number = 0
  ): Promise<void> {
    return this.lifxLanDevice
      .setColor({ color: { css: hex, brightness } as LifxLanColor, duration })
      .then(() => {
        console.log(`Set Color:  ${hex}, ${brightness}`);
      })
      .catch((err) => console.log('failed to set color - ' + err));
  }

  turnOn(duration: number): Promise<void> {
    return this.lifxLanDevice.turnOn({ duration });
  }

  turnOff(duration: number): Promise<void> {
    return this.lifxLanDevice.turnOff({ duration });
  }
}