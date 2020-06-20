import p5 from 'p5';

export default abstract class Visualizer {
  p5: p5;
  container: HTMLElement;
  center: { x: number; y: number };
  w: number;
  h: number;
  p: p5;
  constructor() {
    this.sketch = this.sketch.bind(this);
  }

  abstract setup(): void;
  abstract draw(): void;

  sketch(p: p5): void {
    this.p = p;
    p.setup = this.setup.bind(this);
    p.draw = this.draw.bind(this);
  }

  create() {
    this.container = document.getElementById('sketch-container');
    this.w = this.container.clientWidth;
    this.h = this.container.clientHeight;
    this.center = { x: this.w / 2, y: this.h / 2 };
    this.p5 = new p5(this.sketch, this.container);
  }
}
