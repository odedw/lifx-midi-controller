import Visualizer from '../../action-repositiories/visualizer/Visualizer';
import Data from './Data';
import { Color } from 'p5';
import log from 'loglevel';

const CIRCLE_SIZE = 450;
export default class Sketch extends Visualizer {
  data: Data;
  circleColor: Color;
  constructor(data: Data) {
    super();
    this.data = data;
  }
  setup(): void {
    this.p.createCanvas(this.w, this.h);
    this.p.frameRate(30);
    this.p.ellipseMode(this.p.CENTER);
  }
  draw(): void {
    this.p.background(0);
    this.p.fill(255).ellipse(this.center.x, this.center.y, 10);
    // bass circle
    let randColor = this.data.getRandomColor();
    this.glitch([-2, 2], [0.97 - this.data.bassLevel / 500, 1.03 + this.data.bassLevel / 500]);
    this.p
      .fill(0, 0)
      .stroke(randColor.hex())
      .strokeWeight(8)
      .ellipse(this.center.x, this.center.y, CIRCLE_SIZE + this.data.bassLevel);
    this.unglitch();
  }

  glitch(translate: [number, number], scale: [number, number]) {
    this.p.push();
    const random = (range: [number, number]) => this.p.int(this.p.random(range[0], range[1]));
    this.p.translate(random(translate), random(translate));
    this.p.scale(this.p.random(scale[0], scale[1]), this.p.random(scale[0], scale[1]));
  }

  unglitch() {
    this.p.pop();
  }
}
