import { Rect } from "./rect";
import { Sprite } from "./sprites";

/**
 * QuadTree is a data structure that divides a 2D space into four quadrants.
 */

export interface QuadTreeArgs {
  /**
   * x coordinate of the QuadTree.
   */
  x: number;
  /**
   * y coordinate of the QuadTree.
   */
  y: number;
  /**
   * width of the QuadTree.
   */
  width: number;
  /**
   * height of the QuadTree.
   */
  height: number;
  /**
   * capacity of the QuadTree.
   */
  capacity: number;
}

export class QuadTree extends Rect {
  /**
   * sectors of the QuadTree.
   */
  sectors: QuadTree[] = [];

  /**
   * sprites of the QuadTree.
   */
  sprites: Sprite[] = [];

  /**
   * x coordinate of the QuadTree.
   */
  x: number;

  /**
   * y coordinate of the QuadTree.
   */
  y: number;

  /**
   * width of the QuadTree.
   */
  width: number;

  /**
   * height of the QuadTree.
   */
  height: number;

  /**
   * capacity of the QuadTree.
   */
  capacity: number;

  constructor(args: QuadTreeArgs) {
    super(args);
    this.sectors = [];
    this.sprites = [];
  }

  /**
   *
   * @returns required args of the QuadTree.
   */
  params(): string[] {
    return ["x", "y", "width", "height", "capacity"];
  }

  subdivide(): void {
    let width = this.width / 2;
    let height = this.height / 2;
    this.sectors[0] = new QuadTree({
      x: this.x,
      y: this.y,
      width: width,
      height: height,
      capacity: this.capacity,
    });
    this.sectors[1] = new QuadTree({
      x: this.x + width,
      y: this.y,
      width: width,
      height: height,
      capacity: this.capacity,
    });
    this.sectors[2] = new QuadTree({
      x: this.x + width,
      y: this.y + height,
      width: width,
      height: height,
      capacity: this.capacity,
    });
    this.sectors[3] = new QuadTree({
      x: this.x,
      y: this.y + height,
      width: width,
      height: height,
      capacity: this.capacity,
    });
  }

  insert(sprite: Sprite): boolean {
    if (!this.contains(sprite)) {
      return false;
    }
    if (this.sprites.length < this.capacity) {
      this.sprites.push(sprite);
      return true;
    }
    if (!this.sectors.length) {
      this.subdivide();
    }
    return (
      this.sectors[0].insert(sprite) ||
      this.sectors[1].insert(sprite) ||
      this.sectors[2].insert(sprite) ||
      this.sectors[3].insert(sprite)
    );
  }

  query(rect: Rect, sprites: Sprite[]): Sprite[] {
    if (typeof sprites === "undefined") {
      sprites = [];
    }
    if (!rect.intersects(this)) {
      return sprites;
    }
    for (let sprite of this.sprites) {
      if (rect.contains(sprite)) {
        sprites.push(sprite);
      }
    }
    for (let sector of this.sectors) {
      sector.query(rect, sprites);
    }
    return sprites;
  }
}
/*
let qtree = new QuadTree({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    capacity: 10
});
for (let i = 0; i < 30; ++i) {
    qtree.insert({
        x: Maths.rand(0, 100),
        y: Maths.rand(0, 100),
        width: 10,
        height: 10
    });
}
*/
