import p5 from 'p5';
import { Square, Shape, Rect, Circle } from '../../action-repositiories/visualizer/shapes';
import Visualizer from '../../action-repositiories/visualizer/Visualizer';
import Color from 'Color';
import d from './data';
import log from 'loglevel';

const CIRCLE_SIZE = 400;

type Twinkle = {
  x: number;
  y: number;
};
export class Sketch extends Visualizer {
  rotation: number = 0;
  rotationAmount = 0;
  stripes = new Array<number>(d.numberOfHH).fill(255);
  twinkles: Twinkle[] = [];
  twinkleAlpha = 255;
  lastTwinkleSide = 'left';
  expandAlphaSpeed = 0.5;
  expandSizeSpeed = 1.8;
  expandAlpha = 0;
  expandSize = 0;

  sketch(p: p5): void {
    p.setup = () => {
      p.createCanvas(this.w, this.h);
    };
    p.mouseClicked = () => {
      log.info(`${p.mouseX}, ${p.mouseY}`);
      return false;
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

      if (this.expandAlpha > 0) {
        p.noStroke().fill(200, this.expandAlpha).ellipse(this.center.x, this.center.y, this.expandSize);
        this.expandAlpha -= this.expandAlphaSpeed;
        this.expandSize += this.expandSizeSpeed;
      }

      //twinkles
      if (this.twinkles.length >= 5) {
        this.twinkleAlpha -= 2.5;
      }
      if (this.twinkleAlpha <= 0) {
        this.twinkles = [];
        this.twinkleAlpha = 255;
      }

      this.twinkles.forEach((t) => {
        p.push();
        p.stroke(255, this.twinkleAlpha);
        p.translate(t.x, t.y);
        p.scale(0.8 + p.sin(p.frameCount) * 0.05);
        p.rotate(p.frameCount / 200.0);
        this.star(p, 0, 0, 5, 20);
        p.pop();
      });
    };
  }

  triggerExpand() {
    if (this.expandAlpha > 0) return;
    this.expandSize = 0;
    this.expandAlpha = 255;
  }

  twinkle() {
    this.lastTwinkleSide = this.lastTwinkleSide === 'left' ? 'right' : 'left';
    this.twinkles.push({
      x: this.p5.random(
        this.lastTwinkleSide === 'left' ? 0 : this.center.x + CIRCLE_SIZE / 2 + 130,
        this.lastTwinkleSide === 'left' ? this.center.x - CIRCLE_SIZE / 2 - 130 : this.w
      ),
      y: this.p5.random(50, this.h - 50),
    });
  }

  star(p, x, y, radius1, radius2, npoints = 5) {
    let angle = p.TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    p.beginShape();
    for (let a = 0; a < p.TWO_PI; a += angle) {
      let sx = x + p.cos(a) * radius2;
      let sy = y + p.sin(a) * radius2;
      p.vertex(sx, sy);
      sx = x + p.cos(a + halfAngle) * radius1;
      sy = y + p.sin(a + halfAngle) * radius1;
      p.vertex(sx, sy);
    }
    p.endShape(p.CLOSE);
  }
}

export default new Sketch();
