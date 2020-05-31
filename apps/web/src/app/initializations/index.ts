import * as log from "loglevel";
import emitters, { EventEmitter } from "../event-emitters";
import routine from "../routine";
import lifxDevice from "../action-repositiories/SmartLight";
import { server } from '../services'
const createInitPromiseForEmitter = (e: EventEmitter) =>
  e
    .init()
    .then(() => log.info(`${e.constructor.name} finished init`))
    .catch((err) => log.error(`${e.constructor.name} error in init: ${err}`));

export default async () => {
  log.setDefaultLevel(log.levels.INFO);
  await Promise.all(emitters.map(createInitPromiseForEmitter));
  await server.init();
  routine.init();
};
