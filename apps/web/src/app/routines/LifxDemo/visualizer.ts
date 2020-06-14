import p5 from 'p5';
import { Square } from '../../action-repositiories/visualizer/shapes';
import Visualizer from '../../action-repositiories/visualizer/Visualizer';

export class LifxVisualizer extends Visualizer {
  backgroundColor: string = '#e6e6e6';
  squares: Square[] = [];

  sketch(p: p5): void {
    p.setup = () => {
      p.createCanvas(this.width, this.height);
    };

    p.draw = () => {
      p.background(this.backgroundColor);
      p.noStroke();
      p.noFill();
      this.squares = this.squares.filter(
        (s) => s.size <= p.max(this.height, this.width)
      );
      this.squares.forEach((s) => {
        s.grow(5);
        p.fill(s.fill);
        p.square(s.x - s.size / 2, s.y - s.size / 2, s.size);
      });
    };
  }

  setBackgroundColor(hex: string) {
    this.backgroundColor = hex;
  }

  addSquare(square: Square) {
    this.squares.push(square);
    if (this.squares.length >= 20) {
      this.squares.shift();
    }
  }
}

export default new LifxVisualizer();
