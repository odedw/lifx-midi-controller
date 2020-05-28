import { LifxDevice as LifxDeviceInterface } from "../../../shared/types";
import * as log from "loglevel";

class LifxDevice implements LifxDeviceInterface {
  toggle(duration: number = 0): Promise<void> {
    log.info("toggle");
    return Promise.resolve();
  }
  turnOfF(duration: number = 0): Promise<void> {
    log.info("turnOfF");
    return Promise.resolve();
  }
  turnOn(duration: number = 0): Promise<void> {
    log.info("turnOn");
    return Promise.resolve();
  }
  setColor(
    hex: string,
    brightness: number,
    duration: number = 0
  ): Promise<void> {
    log.info("setColor");
    return Promise.resolve();
  }
}

export default new LifxDevice();
