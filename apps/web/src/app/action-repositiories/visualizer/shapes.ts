import Color from 'Color';
import p5 from 'p5';

export abstract class Shape {
  x: number;
  y: number;
  fill: Color;
  // abstract grow(increment: number): void;
  // transform: () => void = () => {};
  render(p5: p5): void {
    p5.fill(this.fill.hex());
  }
  constructor(x: number, y: number, fill: Color) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }
}
export class Rect extends Shape {
  w: number;
  h: number;
  constructor(x: number, y: number, w: number, h: number, fill: Color) {
    super(x, y, fill);
    this.w = w;
    this.h = h;
  }
  render(p5: p5): void {
    super.render(p5);
    p5.rect(this.x, this.y, this.w, this.h);
  }
}

class ShapeWithSize extends Shape {
  size: number;
  constructor(x: number, y: number, size: number, fill: Color) {
    super(x, y, fill);
    this.size = size;
  }
}

export class Square extends ShapeWithSize {
  render(p5: p5): void {
    super.render(p5);
    p5.square(this.x, this.y, this.size);
  }
}

export class Circle extends ShapeWithSize {
  render(p5: p5): void {
    super.render(p5);
    p5.ellipse(this.x, this.y, this.size);
  }
}
