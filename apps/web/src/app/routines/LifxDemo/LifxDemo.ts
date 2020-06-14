import { Routine } from '../routine';
import { Subscription } from 'rxjs';
import MidiEventEmitter from '../../event-emitters/MidiEventEmitter';
import smartLight from '../../action-repositiories/SmartLight';
import { mapToRange, log } from '@odedw/shared';
import { visualizer } from '../../action-repositiories/visualizer';
import { Square } from '../../action-repositiories/visualizer/shapes';

// let colors = ['#00F1FF', '#0161E8', '#290CFF', '#9B00E8', '#FF019A'];
let colors = ['#FF0018', '#FFA52C', '#FFFF41', '#008018', '#0000F9', '#86007D'];
let currentColor = colors[0];

const randomColor = () =>
  colors.filter((c) => c !== currentColor).sort(() => Math.random() - 0.5)[0];

export default class LifxDemo extends Routine {
  start(): Subscription[] {
    visualizer.create();
    currentColor = randomColor();
    smartLight.setColor(currentColor, 0.6);
    smartLight.turnOn();

    return [
      MidiEventEmitter.noteOn('C3').subscribe(() =>
        smartLight.setColor(currentColor, 0.6)
      ),

      MidiEventEmitter.noteOn('D3').subscribe(() =>
        smartLight.setColor(currentColor, 1)
      ),

      MidiEventEmitter.noteOn('E3').subscribe(() => {
        currentColor = randomColor();
        smartLight.setColor(currentColor, 0.6);
        visualizer.addSquare(
          new Square(
            visualizer.width / 2,
            visualizer.height / 2,
            20,
            currentColor
          )
        );
      }),
      MidiEventEmitter.noteOn('F3').subscribe(() => {
        smartLight.blink(0.5, 50);
      }),
      MidiEventEmitter.cc(30).subscribe((e) => {
        smartLight.setColor(currentColor, mapToRange(e.value, 0, 127, 0, 1));
        // console.log(mapToRange(e.value, 0, 127, 0, 1));
      }),
    ];
  }

  async stop() {
    await smartLight.turnOff();
  }
}
