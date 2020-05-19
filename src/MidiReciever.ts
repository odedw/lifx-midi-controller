import WebMidi, { Input } from "webmidi";
import { EventHandler } from "./EventHandler";
global.navigator = require("web-midi-api");
if (!global.performance)
  global.performance = { now: require("performance-now") };
declare global {
  namespace NodeJS {
    interface Global {
      navigator: Navigator;
      performance: any;
    }
  }
}

export class MidiReciever {
  midiInput: Input;
  constructor() {}
  start(inputId: string, eventHandlers: any): Promise<void> {
    return new Promise((resolve, reject) => {
      WebMidi.enable((err) => {
        if (err) reject(err);
        this.midiInput = WebMidi.inputs.find((i) => i.id === inputId);

        // list inputs
        // WebMidi.inputs.forEach((i) => console.log(i.id));

        eventHandlers.forEach((element) => {
          this.midiInput.addListener(element.type, element.channel, (e) => {
            if (!element.filter(e)) return;
            element.handle(e);
          });
        });
        resolve();
      });
    });
  }
  stop() {}
}
