import { Camera } from "./camera";
import { Debug } from "./debug";
import { Display } from "./display";
import { Engine } from "./engine";
import { Maths } from "./maths";
import { Matrix } from "./matrix";
import { SpriteSheet } from "./sprite-sheets";
import { Sprite } from "./sprites";
import { Tile, TileCorners, TileEdges } from "./tile";

export interface TileMapArgs {
  x: number;
  y: number;
  width: number;
  height: number;
  twidth: number;
  theight: number;
  sheet: string;
  tiles: string[];
}

/**
 * Class for managing tileMaps.
 */
export class TileMap extends Sprite {
  matrix: Matrix;
  mwidth: number;
  mheight: number;
  twidth: number;
  theight: number;
  width: number;
  height: number;
  camera: Camera;
  display: Display;
  tiles: Tile[];
  sheet: SpriteSheet;

  constructor(engine: Engine, args: any) {
    super(engine, args);
    this.matrix = new Matrix(this.width, this.height);
    this.mwidth = this.width * this.twidth;
    this.mheight = this.height * this.theight;
    this.camera = this.components.get(Camera);
    this.display = this.components.get(Display);
  }

  params() {
    return ["x", "y", "width", "height", "twidth", "theight", "sheet", "tiles"];
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
    return Math.floor((x / this.twidth) % this.mwidth);
  }

  getTileY(y: number): number {
    return Math.floor((y / this.theight) % this.mheight);
  }

  getTile(x: number, y: number): Tile {
    x = this.getTileX(x);
    y = this.getTileY(y);
    let tile = this.tiles[this.get(x, y)] || this.tiles[0];
    tile.x = x;
    tile.y = y;
    tile.width = this.twidth;
    tile.height = this.theight;
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
    let x2 = Math.ceil(this.display.width / this.twidth);
    let y2 = Math.ceil(this.display.height / this.theight);
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
            this.x + i * this.twidth,
            this.y + j * this.theight,
            this.twidth,
            this.theight,
            this.sheet,
            tile - 1
          );
        }
      }
    }
    return;
  }
}
