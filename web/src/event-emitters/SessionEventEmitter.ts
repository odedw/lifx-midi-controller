import { EventEmitter } from "./types";
import { EventSubjectRepository } from "./EventSubjectRepository";

export class SessionEventEmitter extends EventEmitter {
  static START_EVENT = "START_EVENT";
  static STOP_EVENT = "STOP_EVENT";

  static start = EventSubjectRepository.subjectFor<void>(
    SessionEventEmitter.START_EVENT,
    SessionEventEmitter.name
  );
  static stop = EventSubjectRepository.subjectFor<void>(
    SessionEventEmitter.STOP_EVENT,
    SessionEventEmitter.name
  );
}
