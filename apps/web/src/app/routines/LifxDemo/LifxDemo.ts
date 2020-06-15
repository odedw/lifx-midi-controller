import { Routine } from '../routine';
import { Subscription } from 'rxjs';
import MidiEventEmitter from '../../event-emitters/MidiEventEmitter';
import smartLight from '../../action-repositiories/SmartLight';
import { mapToRange, log } from '@odedw/shared';
import { visualizer } from '../../action-repositiories/visualizer';
import Color from 'Color';

let colors = ['#00F1FF']; //, '#0161E8', '#290CFF', '#9B00E8', '#FF019A'];
// let colors = ['#FF0018', '#FFA52C', '#FFFF41', '#008018', '#0000F9', '#86007D'];
let currentColor = colors[0];
let currentAlpha = 1;

const randomColor = () =>
  colors.filter((c) => c !== currentColor).sort(() => Math.random() - 0.5)[0];

export default class LifxDemo extends Routine {
  start(): Subscription[] {
    visualizer.create();
    currentColor = randomColor();
    smartLight.setColor(currentColor, 0.6);
    smartLight.turnOn();
    // const square = visualizer.addSquare(currentColor);
    return [
      // MidiEventEmitter.noteOn('C3').subscribe(() => {
      // smartLight.setColor(currentColor, 0.6)
      // }),

      // MidiEventEmitter.noteOn('D3').subscribe(() =>
      // smartLight.setColor(currentColor, 1)
      // ),

      MidiEventEmitter.ccTriger(52, 10).subscribe(() => {
        currentColor = randomColor();
        smartLight.setColor(currentColor, currentAlpha);
      }),
      // MidiEventEmitter.noteOn('F3').subscribe(() => {
      //   smartLight.blink(0.5, 50);
      // }),
      // MidiEventEmitter.noteOn('G3').subscribe(() => {
      //   // visualizer.addSquare(currentColor);
      // }),
      MidiEventEmitter.cc(30).subscribe((e) => {
        currentAlpha = mapToRange(e.value, 0, 127, 0, 1);
        smartLight.setColor(currentColor, currentAlpha);
        // console.log(mapToRange(e.value, 0, 127, 0, 1));
      }),
      // MidiEventEmitter.cc(50).subscribe((e) => {
      // square.size = 20 + e.value;
      // }),
      MidiEventEmitter.ccTriger(50).subscribe(() => {
        // const c = Color(currentColor).alpha(currentAlpha);
        // visualizer.addSquare(c);
        visualizer.isAnimating = true;
      }),
    ];
  }

  async stop() {
    await smartLight.turnOff();
  }
}
