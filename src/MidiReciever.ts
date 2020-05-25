import WebMidi, { Input } from "webmidi";
import { EventHandler } from "./EventHandler";
import { isMatch } from "./MidiUtils";
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
  start(inputId: string, eventHandlers: EventHandler[]): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        WebMidi.enable((err) => {
          if (err) reject(err);
          // list inputs
          // WebMidi.inputs.forEach((i) => console.log(i.id));

          this.midiInput = WebMidi.inputs.find((i) => i.id === inputId);
          this.midiInput.addListener("noteon", "all", (e) => {
            eventHandlers
              .filter((element) => element.filter(e))
              .forEach((element) => {
                element.handle(e);
              });
            console.log(`${e.channel} ${e.note.name}${e.note.octave}`);
          });
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  stop() {}
}
