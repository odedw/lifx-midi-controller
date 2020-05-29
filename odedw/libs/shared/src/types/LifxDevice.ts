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
