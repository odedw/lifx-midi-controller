import { EventEmitter } from './types';
import WebMidi, {
  InputEventNoteon,
  IMidiChannel,
  InputEventControlchange,
  InputEventClock,
} from 'webmidi';
import { EventSubjectRepository } from './EventSubjectRepository';
import { Observable } from 'rxjs';
import { filter, bufferCount } from 'rxjs/operators';
import { isMatch } from './MidiUtils';
import { log } from '@odedw/shared';

export default class MidiEventEmitter extends EventEmitter {
  static NOTE_ON_EVENT = 'MidiEventEmitter.NOTE_ON_EVENT';
  static CONTROL_CHANGE_EVENT = 'MidiEventEmitter.CONTROL_CHANGE_EVENT';
  static CLOCK_EVENT = 'MidiEventEmitter.CLOCK_EVENT';

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      WebMidi.enable((err) => {
        if (err) reject(err);

        // list inputs
        // WebMidi.inputs.forEach((i) => log.info(i.name));

        const midiInput = WebMidi.inputs.find(
          (i) => i.name === 'Arturia KeyStep 32'
        );
        if (!midiInput) return;

        midiInput.addListener('noteon', 'all', (e) => {
          log.debug(
            `channel: ${e.channel}, note: ${e.note.name}${e.note.octave}`
          );
          EventSubjectRepository.subjectFor<InputEventNoteon>(
            MidiEventEmitter.NOTE_ON_EVENT
          ).next(e);
        });
        midiInput.addListener('controlchange', 'all', (e) => {
          EventSubjectRepository.subjectFor<InputEventControlchange>(
            MidiEventEmitter.CONTROL_CHANGE_EVENT
          ).next(e);
        });

        midiInput.addListener('clock', 'all', (e) => {
          EventSubjectRepository.subjectFor<InputEventClock>(
            MidiEventEmitter.CLOCK_EVENT
          ).next(e);
        });
      });
      resolve();
    });
  }

  static noteOn(
    note: string = '',
    channel: IMidiChannel = 'all'
  ): Observable<InputEventNoteon> {
    return EventSubjectRepository.subjectFor<InputEventNoteon>(
      MidiEventEmitter.NOTE_ON_EVENT
    ).pipe(filter((e) => isMatch(e, note, channel)));
  }

  static cc(
    ccNumber: number,
    channel: IMidiChannel = 'all'
  ): Observable<InputEventControlchange> {
    return EventSubjectRepository.subjectFor<InputEventControlchange>(
      MidiEventEmitter.CONTROL_CHANGE_EVENT
    ).pipe(
      filter((e) => {
        return (
          (channel === 'all' || e.channel === channel) &&
          e.controller.number == ccNumber
        );
      })
    );
  }

  static clock(division: number = 1): Observable<InputEventClock[]> {
    return EventSubjectRepository.subjectFor<InputEventClock>(
      MidiEventEmitter.CLOCK_EVENT
    ).pipe(bufferCount(division));
  }
}
