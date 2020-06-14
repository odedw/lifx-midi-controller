export abstract class Shape {
  x: number;
  y: number;
  fill: string;
  abstract grow(increment: number): void;
  constructor(x: number, y: number, fill: string) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }
}

export class Square extends Shape {
  size: number;
  constructor(x: number, y: number, size: number, fill: string) {
    super(x, y, fill);
    this.size = size;
  }
  grow(increment: number) {
    this.size += increment;
  }
}
