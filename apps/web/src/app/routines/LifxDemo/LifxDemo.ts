import { Routine } from '../routine';
import { Subscription } from 'rxjs';
import MidiEventEmitter from '../../event-emitters/MidiEventEmitter';
import smartLight from '../../action-repositiories/SmartLight';
import { mapToRange, log } from '@odedw/shared';
import sketch from '../LifxDemo/sketch';
import Color from 'Color';
import data, { Data } from './data';

export default class LifxDemo extends Routine {
  start(): Subscription[] {
    sketch.create();
    smartLight.setColor(data.currentColor.hex(), 0);
    smartLight.turnOn();
    return [
      // MidiEventEmitter.noteOn('C3').subscribe(() => {
      // smartLight.setColor(currentColor, 0.6)
      // }),

      // MidiEventEmitter.noteOn('D3').subscribe(() =>
      // smartLight.setColor(currentColor, 1)
      // ),

      MidiEventEmitter.ccTriger(52, 10).subscribe(() => {
        data.switchToRandomColor();
      }),
      // MidiEventEmitter.noteOn('F3').subscribe(() => {
      //   smartLight.blink(0.5, 50);
      // }),
      // MidiEventEmitter.noteOn('G3').subscribe(() => {
      //   // visualizer.addSquare(currentColor);
      // }),
      MidiEventEmitter.cc(30).subscribe((e) => {
        smartLight.setColor(data.currentColor.hex(), mapToRange(e.value, 0, 127, 0, 1));
        // console.log(mapToRange(e.value, 0, 127, 0, 1));
      }),
      // MidiEventEmitter.cc(50).subscribe((e) => {
      // square.size = 20 + e.value;
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
      MidiEventEmitter.ccBind<Data>(51, 'bassLevel', data),
      MidiEventEmitter.ccBind<Data>(62, 'melodyLevel', data),
    ];
  }

  async stop() {
    await smartLight.turnOff();
  }
}
