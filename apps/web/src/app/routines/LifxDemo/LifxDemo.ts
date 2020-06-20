import { Routine } from '../routine';
import { Subscription } from 'rxjs';
import MidiEventEmitter from '../../event-emitters/MidiEventEmitter';
import smartLight from '../../action-repositiories/SmartLight';
import { mapToRange, log } from '@odedw/shared';
import sketch from '../LifxDemo/sketch';
import Color from 'Color';
import d, { Data } from './data';
import { visualizer } from '../../action-repositiories/visualizer';

export default class LifxDemo extends Routine {
  start(): Subscription[] {
    sketch.create();
    smartLight.setColor(d.currentColor.hex(), 0);
    smartLight.turnOn();
    return [
      MidiEventEmitter.ccTriger(52, 50).subscribe(() => {
        visualizer.rotationAmount = 0.03;
        d.allHH = true;
        d.bumpHH();
        d.switchToRandomColor();
      }),
      MidiEventEmitter.cc(30).subscribe((e) => {
        smartLight.setColor(d.currentColor.hex(), mapToRange(e.value, 0, 127, 0, 1) * d.melodyLevel);
      }),
      MidiEventEmitter.ccTriger(56, 1).subscribe((e) => !d.allHH && d.bumpHH()),
      MidiEventEmitter.ccTriger(53, 50).subscribe((e) => visualizer.triggerExpand()),
      MidiEventEmitter.noteOn('', 5).subscribe((e) => visualizer.twinkle()),
      MidiEventEmitter.ccBind<Data>(51, 'bassLevel', d, 1),
      MidiEventEmitter.ccBind<Data>(52, 'snareLevel', d),
      MidiEventEmitter.ccBind<Data>(56, 'hhLevel', d, 3),
      MidiEventEmitter.ccBind<Data>(62, 'melodyLevel', d, 1 / d.maxMelodyLevel),
    ];
  }

  async stop() {
    await smartLight.turnOff();
  }
}
