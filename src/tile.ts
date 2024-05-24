import { GameObject } from "./objects";

export interface TileCorners {
  upLeft: Tile;
  upRight: Tile;
  downLeft: Tile;
  downRight: Tile;
}

export interface TileEdges {
  top: Tile;
  bottom: Tile;
  left: Tile;
  right: Tile;
}

export interface TileSolid {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

export interface TileArgs {
  /**
   * The angle of the tile.
   */
  angle: number;

  /**
   * The sheet index of the tile.
   */
  sheet: number;

  /**
   * The solid property of the tile walls.
   */
  solid: TileSolid;
}

export class Tile extends GameObject {
  /**
   * The angle of the tile.
   */
  angle: number;

  /**
   * The sheet index of the tile.
   */
  sheet: number;

  /**
   * The solid property of the tile.
   */
  solid: TileEdges;

  /**
   * The x position of the tile.
   */
  x: number;

  /**
   * The y position of the tile.
   */
  y: number;

  /**
   * The width of the tile.
   */
  width: number;

  /**
   * The height of the tile.
   */
  height: number;

  constructor(args: TileArgs) {
    super(args);
  }

  /**
   *
   * @returns The default configuration of a tile.
   */
  config() {
    return {
      solid: {
        top: false,
        bottom: false,
        right: false,
        left: false,
      },
      angle: 0,
    };
  }
}
