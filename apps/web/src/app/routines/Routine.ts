import { SessionEventEmitter } from '../event-emitters/SessionEventEmitter';
import { Subscription } from 'rxjs';


export abstract class Routine {
  subscriptions: Subscription[] = [];

  async init() {
    SessionEventEmitter.start.subscribe(this.subscribe.bind(this));
    SessionEventEmitter.stop.subscribe(this.unsubscribe.bind(this));
  }

  abstract start(): Subscription[];
  abstract async stop(): Promise<void>;

  subscribe() {
    this.subscriptions = this.start();
  }

  async unsubscribe() {
    this.stop();

    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
  }
}
