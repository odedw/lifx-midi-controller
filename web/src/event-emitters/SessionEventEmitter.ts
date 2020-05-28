import { EventEmitter } from "./types";
import { EventSubjectRepository } from "./EventSubjectRepository";

export class SessionEventEmitter extends EventEmitter {
  static START_EVENT = "SessionEventEmitter.START_EVENT";
  static STOP_EVENT = "SessionEventEmitter.STOP_EVENT";

  static start = EventSubjectRepository.subjectFor<void>(
    SessionEventEmitter.START_EVENT
  );
  static stop = EventSubjectRepository.subjectFor<void>(
    SessionEventEmitter.STOP_EVENT
  );
}
