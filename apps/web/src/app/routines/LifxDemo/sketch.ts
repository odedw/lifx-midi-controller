import p5 from 'p5';
import { Square, Shape, Rect, Circle } from '../../action-repositiories/visualizer/shapes';
import Visualizer from '../../action-repositiories/visualizer/Visualizer';
import Color from 'Color';
import d from './data';
import log from 'loglevel';

const CIRCLE_SIZE = 300;

export class Sketch extends Visualizer {
  alpha: number = 0;
  sketch(p: p5): void {
    p.setup = () => {
      p.createCanvas(this.w, this.h);
    };

    p.draw = () => {
      p.background(0);
      this.alpha = p.lerp(this.alpha, (255 * d.melodyLevel) / d.maxMelodyLevel, 0.01);
      p.fill(d.currentColor.red(), d.currentColor.green(), d.currentColor.blue(), this.alpha).rect(
        0,
        0,
        this.w,
        this.h
      );
      p.fill(255).ellipse(this.center.x, this.center.y, CIRCLE_SIZE + d.bassLevel * 2);
      p.fill(0).ellipse(this.center.x, this.center.y, CIRCLE_SIZE - 20 + d.bassLevel * 2);
      p.fill(d.currentColor.red(), d.currentColor.green(), d.currentColor.blue(), this.alpha).ellipse(
        this.center.x,
        this.center.y,
        CIRCLE_SIZE - 20 + d.bassLevel
      );
    };
  }
}

export default new Sketch();
