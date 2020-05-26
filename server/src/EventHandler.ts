import { InputEvents, IMidiChannel } from "webmidi";
export type EventType = keyof InputEvents;
export class EventHandler {
  filter: (e: any) => boolean;
  handle: (e: any) => void;
  channel: IMidiChannel;
  inputEvent: EventType;
  constructor(
    inputEvent: EventType,
    handle: () => void,
    filter: (e: any) => boolean = () => true,
    channel: IMidiChannel = "all"
  ) {
    this.inputEvent = inputEvent;
    this.filter = filter;
    this.handle = handle;
    this.channel = channel;
  }
}
// export class EventHandler {
//   constructor() {}

//   handleEvent() {}
// }
