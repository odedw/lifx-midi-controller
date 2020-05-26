import { Subject } from "rxjs";
import * as log from "loglevel";

export class EventSubjectRepository {
  private static subjects: { [key: string]: any } = {};
  static subjectFor<T>(name: string, emmiter: string): Subject<T> {
    const key = `${name}.${emmiter}`;
    if (!EventSubjectRepository.subjects[key]) {
      const subject = new Subject<T>();
      subject.subscribe((t) => {
        log.info(`New ${name} event from ${emmiter}`);
      });
      EventSubjectRepository.subjects[key] = subject;
    }

    return EventSubjectRepository.subjects[key];
  }
}
