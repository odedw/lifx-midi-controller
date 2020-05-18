import { MidiReciever } from "./MidiReciever";
import { EventHandler } from "./EventHandler";
import { Device } from "./Device";
const config = require("../config.json");

async function start() {
  const reciever = new MidiReciever();
  const device = await Device.create(config.device.ip, config.device.mac);
  const handlers = [new EventHandler("noteon", () => device.toggle())];
  await reciever.start("Arturia KeyStep 32", handlers);
  console.log("running");
}

start();
