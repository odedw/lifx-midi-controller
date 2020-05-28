import { EventEmitter } from "./types";
import WebMidi, { InputEventNoteon, IMidiChannel } from "webmidi";
import { EventSubjectRepository } from "./EventSubjectRepository";
import { Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { isMatch } from "./MidiUtils";

export default class MidiEventEmitter extends EventEmitter {
  static NOTE_ON_EVENT = "NOTE_ON_EVENT";

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      WebMidi.enable((err) => {
        if (err) reject(err);

        // list inputs
        // WebMidi.inputs.forEach((i) => console.log(i.name));

        const midiInput = WebMidi.inputs.find(
          (i) => i.name === "Arturia KeyStep 32"
        );
        if (!midiInput) return;
        midiInput.addListener("noteon", "all", (e) => {
          EventSubjectRepository.subjectFor<InputEventNoteon>(
            MidiEventEmitter.NOTE_ON_EVENT,
            MidiEventEmitter.name
          ).next(e);
        });
      });
      resolve();
    });
  }

  static noteOn(
    note: string = "",
    channel: IMidiChannel = "all"
  ): Observable<InputEventNoteon> {
    return EventSubjectRepository.subjectFor<InputEventNoteon>(
      MidiEventEmitter.NOTE_ON_EVENT,
      MidiEventEmitter.name
    ).pipe(filter((e) => isMatch(e, note, channel)));
  }
}
