import p5 from 'p5';
import { Square, Shape, Rect, Circle } from '../../action-repositiories/visualizer/shapes';
import Visualizer from '../../action-repositiories/visualizer/Visualizer';
import Color from 'Color';
import d from './data';
import log from 'loglevel';

const CIRCLE_SIZE = 400;

export class Sketch extends Visualizer {
  // alpha: number = 0;
  rotation: number = 0;
  rotationAmount = 0;
  stripes = new Array<number>(d.numberOfHH).fill(255);
  expandAlphaSpeed = 0.5;
  expandSizeSpeed = 1.5;
  expandAlpha = 0;
  expandSize = 0;
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
      // const c1 = p.color(d.currentColor.red(), d.currentColor.green(), d.currentColor.blue(), d.melodyLevel * 255);
      // const c2 = p.color(
      //   d.currentColor.lighten(0.3).red(),
      //   d.currentColor.lighten(0.3).green(),
      //   d.currentColor.lighten(0.3).blue(),
      //   d.melodyLevel * 255
      // );
      // this.setGradient(c1, c2, p);

      // stripes
      p.push();
      p.translate(this.center.x, this.center.y);

      this.stripes.forEach((s, i) => {
        const add = d.allHH ? d.snareLevel : d.currentHH === i ? d.hhLevel : 0;
        const v = p5.Vector.fromAngle(
          p.radians(this.rotation + 360 / this.stripes.length) * i - p.radians(90) + p.radians(this.rotation),
          CIRCLE_SIZE / 2 + 130 + add
        );
        p.strokeJoin('round').strokeWeight(5).stroke(230).line(0, 0, v.x, v.y);
      });
      this.rotation += this.rotationAmount;
      p.pop();

      // circles
      p.fill(255, 0)
        .stroke(255)
        .strokeWeight(12)
        .ellipse(this.center.x, this.center.y, CIRCLE_SIZE + d.bassLevel);
      // p.fill(0).ellipse(this.center.x, this.center.y, CIRCLE_SIZE - 20 + d.bassLevel);
      // p.fill(d.currentColor.red(), d.currentColor.green(), d.currentColor.blue(), d.melodyLevel * 255).ellipse(
      //   this.center.x,
      //   this.center.y,
      //   CIRCLE_SIZE - 20 + d.bassLevel
      // );

      if (this.expandAlpha > 0) {
        p.noStroke().fill(200, this.expandAlpha).ellipse(this.center.x, this.center.y, this.expandSize);
        this.expandAlpha -= this.expandAlphaSpeed;
        this.expandSize += this.expandSizeSpeed;
      }
    };
  }

  triggerExpand() {
    if (this.expandAlpha > 0) return;
    this.expandSize = 0;
    this.expandAlpha = 255;
  }

  setGradient(c1, c2, p) {
    // noprotect
    p.noFill();
    for (var y = 0; y < this.h; y++) {
      var inter = p.map(y, 0, this.h, 0, 1);
      var c = p.lerpColor(c1, c2, inter);
      p.stroke(c);
      p.strokeWeight(1);
      p.line(0, y, this.w, y);
    }
  }
}

export default new Sketch();
