import { GameObject } from "./objects";
import { Point } from "./rect";

/**
 * The arguments to create a SpriteSheet.
 */
export interface SpriteSheetArgs {
  /**
   * The width of the frame/tile on the image.
   */
  width: number;

  /**
   * The height of the frame/tile on the image.
   */
  height: number;

  /**
   * The image containing the sprites/tiles.
   */
  image: HTMLImageElement;

  /**
   * The x offset of the first sprite/tile on the image.
   */
  offsetX?: number;

  /**
   * The y offset of the first sprite/tile on the image.
   */
  offsetY?: number;

  /**
   * The gap between each sprite/tile on the image.
   */
  gap?: number;
}

/**
 * A sprite sheet consists of different sprites/tiles drawn in the same image.
 * When created, the SpriteSheet will create the coordinates of each sprite/tile on
 * the image depending on the width/height of the frame/tile on the sheet.
 */
export class SpriteSheet extends GameObject {
  /**
   * The list of coordinates of each sprite/tile on the image.
   */
  tiles: Point[];
  /**
   * The width of the frame/tile on the image.
   */
  width: number;
  /**
   * The height of the frame/tile on the image.
   */
  height: number;
  /**
   * The image containing the sprites/tiles.
   */
  image: HTMLImageElement;
  /**
   * The x offset of the first sprite/tile on the image.
   */
  offsetX: number;
  /**
   * The y offset of the first sprite/tile on the image.
   */
  offsetY: number;
  /**
   * The gap between each sprite/tile on the image.
   */
  gap: number;

  constructor(args: SpriteSheetArgs) {
    super(args);
    this.tiles = [];
    let iCount = 1;
    let jCount = 1;
    if (this.gap) {
      while (
        this.image.width - this.offsetX - iCount++ * (this.width + this.gap) >=
        this.width
      );
      while (
        this.image.height -
          this.offsetY -
          jCount++ * (this.height + this.gap) >=
        this.width
      );
      iCount--;
      jCount--;
    } else {
      iCount = Math.floor((this.image.width - this.offsetX) / this.width);
      jCount = Math.floor((this.image.height - this.offsetY) / this.height);
    }

    for (let j = 0; j < jCount; ++j) {
      for (let i = 0; i < iCount; ++i) {
        let x = this.offsetX + i * this.gap + i * this.width;
        let y = this.offsetY + j * this.gap + j * this.height;
        this.tiles.push({ x, y });
      }
    }
  }

  /**
   *
   * @returns List of required parameters for the sprite sheet
   */
  params(): string[] {
    return ["width", "height", "image"];
  }

  /**
   *
   * @returns List of default optional parameters for the sprite sheet
   */
  config() {
    return {
      offsetX: 0,
      offsetY: 0,
      gap: 0,
    };
  }
}
