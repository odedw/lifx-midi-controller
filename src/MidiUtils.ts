import { IEventNote, IMidiChannel } from "webmidi";

interface NoteInformation {
  channel: number;
  note: IEventNote;
}
export const isMatch = (
  e: NoteInformation,
  note: string,
  channel: IMidiChannel
): boolean =>
  (channel === "all" || channel.toString() === e.channel.toString()) &&
  (!note || note === `${e.note.name}${e.note.octave}`);
