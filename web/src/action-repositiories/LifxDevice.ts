import { LifxDevice as LifxDeviceInterface } from "../../../shared/types";

class LifxDevice implements LifxDeviceInterface {
  toggle(duration: number = 0): Promise<void> {
    console.log("toggle");
    return Promise.resolve();
  }
  turnOfF(duration: number = 0): Promise<void> {
    console.log("turnOfF");
    return Promise.resolve();
  }
  turnOn(duration: number = 0): Promise<void> {
    console.log("turnOn");
    return Promise.resolve();
  }
  setColor(
    hex: string,
    brightness: number,
    duration: number = 0
  ): Promise<void> {
    console.log("setColor");
    return Promise.resolve();
  }
}

export default new LifxDevice();
