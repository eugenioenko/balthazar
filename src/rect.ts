import { GameObject } from "./objects";

export interface Point {
  x: number;
  y: number;
}

export interface RectArgs {
  x: number;
  y: number;
  width: number;
  height: number;
}
export class Rect extends GameObject {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(args: RectArgs) {
    super(args);
  }

  params() {
    return ["x", "y", "width", "height"];
  }

  contains(point: Point): boolean {
    return (
      point.x >= this.x &&
      point.x <= this.x + this.width &&
      point.y >= this.y &&
      point.y <= this.y + this.height
    );
  }

  intersects(rect: Rect): boolean {
    return (
      this.x <= rect.x + rect.width &&
      this.x + this.width > rect.x &&
      this.y <= rect.y + rect.height &&
      this.height + this.y >= rect.y
    );
  }
}
