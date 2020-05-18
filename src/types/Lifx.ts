export type LifxLanDevice = {
  turnOn(options: { duration: number }): Promise<void>;
  turnOff(options: { duration: number }): Promise<void>;
};
