import { Camera } from "./camera";
import { Debug } from "./debug";
import { Display } from "./display";
import { Engine } from "./engine";
import { Maths } from "./maths";
import { Matrix } from "./matrix";
import { SpriteSheet } from "./sprite-sheets";
import { Sprite } from "./sprites";
import { Tile, TileCorners } from "./tile";

export interface TileMapArgs {
  x: number;
  y: number;
  width: number;
  height: number;
  tileWidth: number;
  tileHeight: number;
  sheet: string;
  tiles: string[];
}

const SOLID_TILE = new Tile({
  solid: { top: true, bottom: true, right: true, left: true },
  angle: 0,
  sheet: 0,
});
/**
 * Class for managing tileMaps.
 */
export class TileMap extends Sprite {
  /**
   * The matrix of the tile map
   */
  matrix: Matrix;

  /**
   * The width of the map in pixels
   */
  mapWidth: number;

  /**
   * The height of the map in pixels
   */
  mapHeight: number;

  /**
   * The width of a tile in pixels
   */
  tileWidth: number;

  /**
   * The height of a tile in pixels
   */
  tileHeight: number;

  /**
   * The width of the map in tiles
   */
  width: number;

  /**
   * The height of the map in tiles
   */
  height: number;

  /**
   * The camera of the tile map
   */
  camera: Camera;

  /**
   * The display of the tile map
   */
  display: Display;

  /**
   * The tiles of the tile map
   */
  tiles: Tile[];

  /**
   * The sprite sheet of the tile map
   */
  sheet: SpriteSheet;

  constructor(engine: Engine, args: any) {
    super(engine, args);
    this.matrix = new Matrix(this.width, this.height);
    this.mapWidth = this.width * this.tileWidth;
    this.mapHeight = this.height * this.tileHeight;
    this.camera = this.components.get(Camera);
    this.display = this.components.get(Display);
  }

  params() {
    return [
      "x",
      "y",
      "width",
      "height",
      "tileWidth",
      "tileHeight",
      "sheet",
      "tiles",
    ];
  }

  get(x: number, y: number): number {
    return this.matrix.get(x, y);
  }

  set(x: number, y: number, value: number): void {
    this.matrix.set(x, y, value);
  }

  load(array: number[]): void {
    if (array.length !== this.width * this.height) {
      Debug.warn(
        `Tilemap size mismatch with width: ${this.width} and height ${this.height}`
      );
    }
    this.matrix.load(array);
  }

  save(): void {
    let result = "";
    let count = 0;
    for (let i = 0; i < this.matrix.array.length; ++i) {
      let char = this.matrix.array[i].toString();
      char = char.length > 1 ? char : "  " + char;
      char = char.length > 2 ? char : " " + char;
      result += char + ",";
      if (++count >= this.width) {
        count = 0;
        result += "\r\n";
      }
    }
    (document.getElementById("map") as HTMLInputElement).value = result;
  }

  getTileX(x: number): number {
    return Math.floor((x / this.tileWidth) % this.mapWidth);
  }

  getTileY(y: number): number {
    return Math.floor((y / this.tileWidth) % this.mapWidth);
  }

  getTile(x: number, y: number): Tile {
    if (x < 0 || y < 0 || x >= this.mapWidth || y >= this.mapWidth) {
      return SOLID_TILE;
    }
    const xTile = this.getTileX(x);
    const yTile = this.getTileY(y);
    const tileIndex = this.get(xTile, yTile);
    const tile = this.tiles[tileIndex] || SOLID_TILE;

    return tile;
  }

  getCorners(x: number, y: number, width: number, height: number): TileCorners {
    return {
      upLeft: this.getTile(x, y),
      upRight: this.getTile(x + width, y),
      downLeft: this.getTile(x, y + height),
      downRight: this.getTile(x + width, y + height),
    };
  }

  getDrawRect() {
    let x1 = this.getTileX(this.camera.x);
    let y1 = this.getTileY(this.camera.y);
    let x2 = Math.ceil(this.display.width / this.tileWidth);
    let y2 = Math.ceil(this.display.height / this.tileWidth);
    x1 = Maths.clamp(x1, 0, this.width);
    y1 = Maths.clamp(y1, 0, this.height);
    x2 = Maths.clamp(x2 + x1 + 1, x1, this.width);
    y2 = Maths.clamp(y2 + y1 + 1, y1, this.height);
    return {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
    };
  }

  draw(): void {
    let rect = this.getDrawRect();
    for (let i = rect.x1; i < rect.x2; ++i) {
      for (let j = rect.y1; j < rect.y2; ++j) {
        let tile = this.get(i, j);
        if (tile) {
          this.display.drawTile(
            this.x + i * this.tileWidth,
            this.y + j * this.tileHeight,
            this.tileWidth,
            this.tileHeight,
            this.sheet,
            tile - 1
          );
        }
      }
    }
    return;
  }
}
