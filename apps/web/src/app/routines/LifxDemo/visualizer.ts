import p5 from 'p5';
import {
  Square,
  Shape,
  Rect,
} from '../../action-repositiories/visualizer/shapes';
import Visualizer from '../../action-repositiories/visualizer/Visualizer';
import Color from 'Color';

export class LifxVisualizer extends Visualizer {
  backgroundColor: string = '#e6e6e6';
  squares: Square[] = [];
  isAnimating: boolean = false;
  animationDelta = 50;
  lineSize = 5;
  startY = 250;
  // shapes: Shape[] = [];
  upRects: Rect[] = [];
  downRects: Rect[] = [];
  sketch(p: p5): void {
    p.setup = () => {
      this.squares = [];
      p.createCanvas(this.width, this.height);

      let x = 0;
      while (x < this.width) {
        const bottom = x < this.width / 3 || x > (this.width * 2) / 3;
        (bottom ? this.downRects : this.upRects).push(
          new Rect(
            x,
            bottom ? this.height - this.startY : 0,
            this.lineSize,
            this.startY,
            new Color('#00F1FF')
          )
        );
        x += this.lineSize * 2;
      }
    };

    p.draw = () => {
      p.background(this.backgroundColor);

      p.fill('#00F1FF');
      p.strokeWeight(1);
      p.stroke('#000000');
      let y = 0;
      while (y < this.height) {
        p.rect(0, y, this.width, this.lineSize);
        y += this.lineSize * 2;
      }

      this.upRects.forEach((r) => {
        if (this.isAnimating) {
          r.h += p.random(0, 5) + this.animationDelta;
        }
        r.render(p);
      });
      this.downRects.forEach((r) => {
        if (this.isAnimating) {
          const delta = p.random(0, 5) + this.animationDelta;
          r.h += delta;
          r.y -= delta;
        }
        r.render(p);
      });

      if (
        this.isAnimating &&
        this.animationDelta > 0 &&
        this.downRects[0].h >= this.height
      ) {
        this.animationDelta *= -1;
      } else if (
        this.isAnimating &&
        this.animationDelta < 0 &&
        this.downRects[0].h <= this.startY
      ) {
        this.animationDelta *= -1;
        this.isAnimating = false;
      }

      // p.stroke('#000000');
      // p.strokeWeight(2);
      // p.noFill();
      // this.squares = this.squares.filter(
      //   (s) => s.size <= p.max(this.height * 2, this.width * 2)
      // );
      // this.squares.forEach((s) => {
      //   s.grow(5);
      //   const fill = p.color(
      //     s.fill.red(),
      //     s.fill.green(),
      //     s.fill.blue(),
      //     s.fill.alpha()
      //   );
      //   // fill.setAlpha(s.opacity + 0.5);
      //   p.fill(fill);
      //   p.square(s.x - s.size / 2, s.y - s.size / 2, s.size);
      // });
    };
  }

  addSquare(color: Color): Square {
    const square = new Square(
      this.width / 2,
      this.height / 2,
      20,
      color,
      1 //currentAlpha
    );
    // square.x += this.p5.sin(this.p5.frameCount) * 100;
    // square.y += this.p5.cos(this.p5.frameCount) * 100;
    this.squares.push(square);
    // if (this.squares.length >= 20) {
    // this.squares.shift();
    // }
    return square;
  }
}

export default new LifxVisualizer();
