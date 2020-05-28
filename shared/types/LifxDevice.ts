export interface LifxDevice {
  toggle: (duration: number) => Promise<void>;
  turnOfF: (duration: number) => Promise<void>;
  turnOn: (duration: number) => Promise<void>;
  setColor: (
    hex: string,
    brightness: number,
    duration: number
  ) => Promise<void>;
}
