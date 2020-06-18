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
      // MidiEventEmitter.noteOn('C3').subscribe(() => {
      // smartLight.setColor(currentColor, 0.6)
      // }),

      // MidiEventEmitter.noteOn('D3').subscribe(() =>
      // smartLight.setColor(currentColor, 1)
      // ),

      MidiEventEmitter.ccTriger(52, 10).subscribe(() => {
        visualizer.rotationAmount = 0.03;
        d.allHH = true;
        d.bumpHH();
        d.switchToRandomColor();
      }),
      // MidiEventEmitter.noteOn('F3').subscribe(() => {
      //   smartLight.blink(0.5, 50);
      // }),
      // MidiEventEmitter.noteOn('G3').subscribe(() => {
      //   // visualizer.addSquare(currentColor);
      // }),
      MidiEventEmitter.cc(30).subscribe((e) => {
        smartLight.setColor(d.currentColor.hex(), mapToRange(e.value, 0, 127, 0, 1) * d.melodyLevel);
        // console.log(mapToRange(e.value, 0, 127, 0, 1));
      }),
      // MidiEventEmitter.cc(63).subscribe((e) => {
      // square.size = 20 + e.value;
      // log.info(e.value);
      // }),
      // MidiEventEmitter.ccTriger(50).subscribe(() => {
      // const c = Color(currentColor).alpha(currentAlpha);
      // visualizer.addSquare(c);
      // visualizer.isAnimating = true;
      // }),
      // MidiEventEmitter.cc(51).subscribe((e) => {
      //   // console.log(mapToRange(e.value, 0, 127, 0, 1));
      //   sketch.bassLevel = e.value;
      // }),
      MidiEventEmitter.ccTriger(56, 1).subscribe((e) => !d.allHH && d.bumpHH()),
      MidiEventEmitter.ccTriger(53, 50).subscribe((e) => visualizer.triggerExpand()),
      // MidiEventEmitter.ccTriger(63, 30).subscribe((e) => visualizer.twinkle('left')),
      MidiEventEmitter.noteOn('', 5).subscribe((e) => visualizer.twinkle('left')),
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
