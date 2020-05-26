import { InputEvents, IMidiChannel, Input } from "webmidi";
import { EventHandler, EventType } from "./EventHandler";
import { Device } from "./Device";
import { LifxLanColor } from "./types/Lifx";
import { isMatch } from "./MidiUtils";

class EventHandlerBuilder {
  inputEvent: EventType;
  filter: (e: any) => boolean;
  handler: () => void;
  device: Device;
  channel: IMidiChannel;
  constructor(
    inputEvent: EventType,
    filter: (e: any) => boolean,
    channel: IMidiChannel
  ) {
    this.inputEvent = inputEvent;
    this.filter = filter;
    this.channel = channel;
  }

  do(handler: (device: Device) => Promise<void>): EventHandlerBuilder {
    this.handler = () => handler(this.device).catch((err) => console.log(err));
    return this;
  }

  create(device: Device): EventHandler {
    this.device = device;
    return new EventHandler(
      this.inputEvent,
      this.handler,
      this.filter,
      this.channel
    );
  }
}
export default class EventHandlerFactory {
  //EventHandlerFactory.withDevice(device).noteOn('f3', 2).do(device => device.turnOn()).create();
  //EventHandlerFactory.noteOn('f3', 2).do(device => device.turnOn()).create(device);
  static noteOn(
    note: string = "",
    channel: IMidiChannel = "all"
  ): EventHandlerBuilder {
    return new EventHandlerBuilder(
      "noteon",
      (e: InputEvents["noteon"]) => isMatch(e, note, channel),
      channel
    );
  }
}
