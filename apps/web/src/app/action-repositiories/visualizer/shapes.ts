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

export class Square extends Shape {
  render(p5: p5): void {
    throw new Error('Method not implemented.');
  }
  size: number;
  constructor(
    x: number,
    y: number,
    size: number,
    fill: Color,
    opacity: number
  ) {
    super(x, y, fill);
    this.size = size;
  }
  // grow(increment: number) {
  //   this.size += increment;
  // }
}
