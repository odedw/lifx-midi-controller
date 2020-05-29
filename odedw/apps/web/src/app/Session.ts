import { EventSubjectRepository } from "./event-emitters/EventSubjectRepository";
import { SessionEventEmitter } from "./event-emitters/SessionEventEmitter";

export class Session {
  static start() {
    EventSubjectRepository.subjectFor<void>(
      SessionEventEmitter.START_EVENT
    ).next();
  }

  static stop() {
    EventSubjectRepository.subjectFor<void>(
      SessionEventEmitter.STOP_EVENT
    ).next();
  }
}
