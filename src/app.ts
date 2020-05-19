import { MidiReciever } from "./MidiReciever";
import { Device } from "./Device";
import { init, generateHandlers } from "./routine";

const config = require("../config.json");

async function start() {
  const reciever = new MidiReciever();
  const device = await Device.create(config.device.ip, config.device.mac);
  const handlers = generateHandlers(device);
  await init(device);
  await reciever.start(config.midiInput, handlers);
  console.log("running");
}

start();
