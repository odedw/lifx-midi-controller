import { SessionEventEmitter } from "./event-emitters/SessionEventEmitter";
import MidiEventEmitter from "./event-emitters/MidiEventEmitter";
import { Subscription } from "rxjs";
import smartLight from "./action-repositiories/SmartLight";

let colors = ["#00F1FF", "#0161E8", "#290CFF", "#9B00E8", "#FF019A"];
let currentColor = colors[0];

const randomColor = () =>
  colors.filter((c) => c !== currentColor).sort(() => Math.random() - 0.5)[0];

export class Routine {
  subscriptions: Subscription[] = [];

  async init() {
    SessionEventEmitter.start.subscribe(this.subscribe.bind(this));
    SessionEventEmitter.stop.subscribe(this.unsubscribe.bind(this));
  }

  async subscribe() {
    this.subscriptions = [
      MidiEventEmitter.noteOn("C3").subscribe(() =>
        smartLight.setColor(currentColor, 0.6)
      ),

      MidiEventEmitter.noteOn("D3").subscribe(() =>
        smartLight.setColor(currentColor, 1)
      ),

      MidiEventEmitter.noteOn("E3").subscribe(() => {
        currentColor = randomColor();
        smartLight.setColor(currentColor, 0.6);
      }),
    ];

    currentColor = randomColor();
    await smartLight.setColor(currentColor, 0.6);
    await smartLight.turnOn();
  }

  async unsubscribe() {
    await smartLight.turnOff();

    this.subscriptions.forEach((s) => s.unsubscribe());
    this.subscriptions = [];
  }
}

export default new Routine();
