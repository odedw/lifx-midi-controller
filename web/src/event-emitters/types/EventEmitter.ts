export interface EventEmitter {
  init(): Promise<void>;
  getEvents(): object[];
}
