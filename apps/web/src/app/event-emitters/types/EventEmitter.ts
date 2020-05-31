export abstract class EventEmitter {
  init(): Promise<void> {
    return Promise.resolve();
  }

  get name(): string {
    return this.constructor.name;
  }
}
