import p5 from 'p5';
import { Square, Shape, Rect, Circle } from '../../action-repositiories/visualizer/shapes';
import Visualizer from '../../action-repositiories/visualizer/Visualizer';
import Color from 'Color';
import d from './data';
import log from 'loglevel';
import data from './data';

const CIRCLE_SIZE = 400;

export class Sketch extends Visualizer {
  // alpha: number = 0;
  rotation: number = 0;
  rotationAmount = 0;
  stripes = new Array<number>(data.numberOfHH).fill(255);
  sketch(p: p5): void {
    p.setup = () => {
      p.createCanvas(this.w, this.h);
    };

    p.draw = () => {
      p.background(0);

      // background
      p.noStroke()
        .fill(d.currentColor.red(), d.currentColor.green(), d.currentColor.blue(), d.melodyLevel * 255)
        .rect(0, 0, this.w, this.h);

      // stripes
      p.push();
      p.translate(this.center.x, this.center.y);

      this.stripes.forEach((s, i) => {
        const v = p5.Vector.fromAngle(
          p.radians(this.rotation + 360 / this.stripes.length) * i - p.radians(90) + p.radians(this.rotation),
          CIRCLE_SIZE / 2 + 150 + (data.currentHH === i ? 30 : 0)
        );
        p.strokeJoin('round').strokeWeight(5).stroke(200).line(0, 0, v.x, v.y);
      });
      this.rotation += this.rotationAmount;
      p.pop();

      // circles
      p.fill(255).ellipse(this.center.x, this.center.y, CIRCLE_SIZE + d.bassLevel * 2);
      p.fill(0).ellipse(this.center.x, this.center.y, CIRCLE_SIZE - 20 + d.bassLevel * 2);
      p.fill(d.currentColor.red(), d.currentColor.green(), d.currentColor.blue(), d.melodyLevel * 255).ellipse(
        this.center.x,
        this.center.y,
        CIRCLE_SIZE - 20 + d.bassLevel
      );
    };
  }
}

export default new Sketch();
