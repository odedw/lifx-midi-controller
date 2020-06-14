import p5 from 'p5';

export default abstract class Visualizer {
  p5: p5;
  container: HTMLElement;
  abstract sketch(p: p5): void;
  width: number;
  height: number;
  constructor() {
    this.sketch = this.sketch.bind(this);
  }

  create() {
    this.container = document.getElementById('sketch-container');
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.p5 = new p5(this.sketch, this.container);
  }
}
