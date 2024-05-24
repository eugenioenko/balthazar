import { Camera } from "./camera";
import { Component } from "./components";
import { Debug } from "./debug";
import { Engine } from "./engine";
import { SpriteSheet } from "./sprite-sheets";

/**
 * Abstract class of the Display component of the Engine.
 */
export abstract class DisplayAbstract extends Component {
  constructor(engine: Engine, args: Record<string, any>) {
    super(engine, args);
  }

  clear() {}

  fillRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {}

  rect(x: number, y: number, width: number, height: number, color: string) {}

  circle(x: number, y: number, diameter: number, color: string) {}

  move(): void {}
}

/**
 * Class of the Display component of the Engine.
 * The Display component is responsible for rendering the game objects on the screen.
 */

export interface DisplayArgs {
  /**
   * The id of the canvas element
   */
  id: string;

  /**
   * The width of the display
   */
  width: number;

  /**
   * The height of the display
   */
  height: number;

  /**
   * If the image smoothing is enabled
   */
  isImageSmoothingEnabled: boolean;
}

export class Display extends DisplayAbstract {
  /**
   * The canvas element
   */
  canvas: HTMLCanvasElement;

  /**
   * The canvas rendering context
   */
  ctx: CanvasRenderingContext2D;

  /**
   * The camera of the display
   */
  camera: Camera;

  /**
   * The width of the display
   */
  width: number;

  /**
   * The height of the display
   */
  height: number;

  /**
   * The id of the canvas element
   */
  id: string;

  /**
   * If the image smoothing is enabled
   * @default false
   */
  isImageSmoothingEnabled: boolean;

  constructor(engine: Engine, args: DisplayArgs) {
    super(engine, args);
    this.canvas = document.getElementById(this.id) as HTMLCanvasElement;
    this.canvas.setAttribute("width", `${this.width}`);
    this.canvas.setAttribute("height", `${this.height}`);
    this.canvas.style.cursor = "none";
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "12px Helvetica";
    this.ctx.imageSmoothingEnabled = this.isImageSmoothingEnabled;
    this.camera = this.components.get(Camera);
  }

  /**
   *
   * @returns List of required parameters for the display
   */
  params(): string[] {
    return ["id", "x", "y", "width", "height"];
  }

  /**
   *
   * @returns List of default optional parameters for the display
   */
  config(): Partial<DisplayArgs> {
    return {
      isImageSmoothingEnabled: false,
    };
  }

  clear(): void {
    this.ctx.fillStyle = "#0FF";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  fillRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void {
    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.rect(-this.camera.x + x, -this.camera.y + y, width, height);
    this.ctx.closePath();
    this.ctx.fill();
  }

  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = color;
    this.ctx.rect(-this.camera.x + x, -this.camera.y + y, width, height);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  circle(x: number, y: number, diameter: number, color: string): void {
    this.ctx.beginPath();
    this.ctx.arc(
      -this.camera.x + x,
      -this.camera.y + y,
      diameter / 2,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.strokeStyle = color;
    this.ctx.closePath();
    this.ctx.stroke();
  }

  text(text: string, x: number, y: number): void {
    this.ctx.fillText(text, x, y);
  }

  /**
   *
   * @param image The image to draw
   * @param sx The x coordinate where to start clipping
   * @param sy The y coordinate where to start clipping
   * @param sWidth The width of the clipped image
   * @param sHeight The height of the clipped image
   * @param dx The x coordinate where to place the image on the canvas
   * @param dy The y coordinate where to place the image on the canvas
   * @param dWidth The width of the image to use
   * @param dHeight The height of the image to use
   */
  drawImage(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sWidth: number,
    sHeight: number,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number
  ): void {
    this.ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  /**
   *
   * @param x The x coordinate where to place the tile image on the canvas
   * @param y The y coordinate where to place the tile image on the canvas
   * @param width The width of the tile image to use
   * @param height The height of the tile image to use
   * @param sheet The sprite sheet to use
   * @param index The index of the image to use within the sprite sheet
   */
  drawTile(
    x: number,
    y: number,
    width: number,
    height: number,
    sheet: SpriteSheet,
    index: number
  ): void {
    let tile = sheet.tiles[index];
    this.ctx.drawImage(
      sheet.image,
      tile.x,
      tile.y,
      sheet.width,
      sheet.height,
      x - this.camera.x,
      y - this.camera.y,
      width,
      height
    );
    if (Debug.active()) {
      this.ctx.fillStyle = "#F0F";
      this.ctx.font = "18px Arial";
      this.ctx.fillText(
        `${index + 1}`,
        x - this.camera.x + width / 2,
        y - this.camera.y + height / 2
      );
    }
  }

  debug(text: string): void {
    this.ctx.fillStyle = "#F00";
    this.ctx.fillText(text, 10, 10);
  }
}
