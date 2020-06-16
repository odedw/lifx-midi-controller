import p5 from 'p5';

export default abstract class Visualizer {
  p5: p5;
  container: HTMLElement;
  center: { x: number; y: number };
  abstract sketch(p: p5): void;
  w: number;
  h: number;
  constructor() {
    this.sketch = this.sketch.bind(this);
  }

  create() {
    this.container = document.getElementById('sketch-container');
    this.w = this.container.clientWidth;
    this.h = this.container.clientHeight;
    this.center = { x: this.w / 2, y: this.h / 2 };
    this.p5 = new p5(this.sketch, this.container);
  }
}
