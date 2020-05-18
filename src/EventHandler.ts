import { InputEvents, IMidiChannel } from "webmidi";

export class EventHandler<T extends keyof InputEvents> {
  type: T;
  filter: (e: InputEvents[T]) => boolean;
  handle: (e: InputEvents[T]) => void;
  channel: IMidiChannel;
  constructor(
    type: T,
    handle: () => void,
    filter: (e: InputEvents[T]) => boolean = () => true,
    channel: IMidiChannel = "all"
  ) {
    this.type = type;
    this.filter = filter;
    this.handle = handle;
    this.channel = channel;
  }
}
// export class EventHandler {
//   constructor() {}

//   handleEvent() {}
// }
