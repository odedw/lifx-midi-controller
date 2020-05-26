import { EventEmitter } from "../types";
import WebMidi, { InputEventNoteon } from "webmidi";
import { EventSubjectRepository } from "../EventSubjectRepository";
export default class MidiEventEmitter implements EventEmitter {
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
            "noteon",
            "MidiEventEmitter"
          ).next(e);
        });
      });
      resolve();
    });
  }

  getEvents(): object[] {
    return [];
  }
}
