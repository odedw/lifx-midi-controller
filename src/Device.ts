import Lifx from "node-lifx-lan";
import { LifxLanDevice } from "./types/Lifx";

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

export class Device {
  lifxLanDevice: LifxLanDevice;
  power: boolean;
  static create(ip: string, mac: string): Promise<Device> {
    let instance;
    return new Promise((resolve, reject) => {
      Lifx.createDevice({
        mac,
        ip,
      })
        .then((d) => {
          instance = new Device(d);
          return d.getLightState();
        })
        .then((state) => {
          instance.power = state.power;
          resolve(instance);
        })
        .catch((error) => reject(error));
    });
  }

  private constructor(lifxLanDevice: LifxLanDevice) {
    this.lifxLanDevice = lifxLanDevice;
  }

  setColor() {}

  toggle(duration: number = 0): Promise<void> {
    let promise: Promise<void> | undefined;
    if (!this.power) {
      promise = this.lifxLanDevice.turnOn({ duration });
    } else {
      promise = this.lifxLanDevice.turnOff({ duration });
    }
    return promise.then(() => {
      this.power = !this.power;
    });
  }
}
