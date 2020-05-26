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

export async function retry<T>(
  fn: () => Promise<T>,
  retriesLeft: number = 3,
  interval: number = 1000,
  exponential: boolean = false
): Promise<T> {
  try {
    const val = await fn();
    return val;
  } catch (error) {
    if (retriesLeft) {
      console.log("Retrying...");
      await new Promise((r) => setTimeout(r, interval));
      return retry(
        fn,
        retriesLeft - 1,
        exponential ? interval * 2 : interval,
        exponential
      );
    } else throw new Error(`Max retries reached for function ${fn.name}`);
  }
}

export class Device {
  lifxLanDevice: LifxLanDevice;
  power: boolean;
  color: any;
  static create(ip: string, mac: string): Promise<Device> {
    let instance: Device;
    return new Promise((resolve, reject) => {
      retry(
        () =>
          Lifx.createDevice({
            mac,
            ip,
          }),
        3,
        500
      )
        .then((d: any) => {
          console.log("-----------------------device created");
          instance = new Device(d);
          return d.getLightState();
        })
        .then((state) => {
          // console.log("-----------------------");
          // console.log(state);
          // console.log("-----------------------");

          // this.initialState = state;

          instance.power = state.power;
          // instance.color = state.color;
          resolve(instance);
        })
        .catch((error) => reject(error));
    });
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
      .catch((err) => console.log("failed to set color - " + err));
  }

  turnOn(duration: number = 0): Promise<void> {
    return this.lifxLanDevice.turnOn({ duration });
  }

  turnOfF(duration: number = 0): Promise<void> {
    return this.lifxLanDevice.turnOff({ duration });
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
