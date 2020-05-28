import { EventSubjectRepository } from "./event-emitters/EventSubjectRepository";
import { SessionEventEmitter } from "./event-emitters/SessionEventEmitter";

export class Session {
  static start() {
    EventSubjectRepository.subjectFor<void>(
      SessionEventEmitter.START_EVENT,
      SessionEventEmitter.name
    ).next();
  }

  static stop() {
    EventSubjectRepository.subjectFor<void>(
      SessionEventEmitter.STOP_EVENT,
      SessionEventEmitter.name
    ).next();
  }
}
