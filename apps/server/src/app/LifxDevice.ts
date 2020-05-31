import Lifx from 'node-lifx-lan';
import { LifxLanColor, LifxLanDevice, LifxLanColorCSS } from './types/Lifx';
import { SmartLightInterface } from '@odedw/shared';
import { log } from '@odedw/shared';
import { delay } from './utils';

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
  color: LifxLanColorCSS;
  static create(ip: string, mac: string): Promise<LifxDevice> {
    let instance: LifxDevice;
    log.info('Creating LIFX device');
    return Lifx.createDevice({
      mac,
      ip,
    })
      .then((d: any) => (instance = new LifxDevice(d)))
      .then(() => instance.turnOff(0))
      .then(() => instance.setColor('#FFFFFF', 1, 0))
      .then(() => instance);
  }

  private constructor(lifxLanDevice: LifxLanDevice) {
    this.lifxLanDevice = lifxLanDevice;
  }

  blink(increment: number, duration: number): Promise<void> {
    const brightness = this.color.brightness;
    return this.setColor(this.color.css, Math.min(1, brightness + increment), 0)
      .then(() => delay(duration))
      .then(() => this.setColor(this.color.css, brightness, 0));
    return Promise.resolve();
  }

  setColor(
    hex: string,
    brightness: number,
    duration: number = 0
  ): Promise<void> {
    const color = { css: hex, brightness } as LifxLanColorCSS;
    return this.lifxLanDevice.setColor({ color, duration }).then(() => {
      this.color = color;
    });
  }

  turnOn(duration: number): Promise<void> {
    return this.lifxLanDevice.turnOn({ duration });
  }

  turnOff(duration: number): Promise<void> {
    return this.lifxLanDevice.turnOff({ duration });
  }
}
