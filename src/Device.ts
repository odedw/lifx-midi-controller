import Lifx from "node-lifx-lan";
import { LifxLanColor, LifxLanDevice } from "./types/Lifx";

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
  color: any;
  static create(ip: string, mac: string): Promise<Device> {
    let instance: Device;
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
          // console.log("-----------------------");
          // console.log(state);
          // console.log("-----------------------");

          // this.initialState = state;
          instance.power = state.power;
          instance.color = state.color;
          resolve(instance);
        })
        .catch((error) => reject(error));
    });
  }

  private constructor(lifxLanDevice: LifxLanDevice) {
    this.lifxLanDevice = lifxLanDevice;
  }

  setColor(color: LifxLanColor, duration: number = 0): Promise<void> {
    return this.lifxLanDevice.setColor({ color, duration }).then(() => {
      console.log(`Set Color:  ${JSON.stringify(color)}`);
      this.color = color;
    });
  }

  turnOn(duration: number = 0): Promise<void> {
    return this.lifxLanDevice.turnOn({ duration });
  }

  toggle(duration: number = 0): Promise<void> {
    let promise: Promise<void> | undefined;
    if (!this.power) {
      promise = this.lifxLanDevice.turnOn({ duration });
    } else {
      promise = this.lifxLanDevice.turnOff({ duration });
    }
    return promise.then(() => {
      this.power = !this.power;
      console.log(`Switched ${this.power ? "on" : "off"}`);
    });
  }
}
