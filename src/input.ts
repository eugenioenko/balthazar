import { Camera } from "./camera";
import { Component } from "./components";
import { Engine } from "./engine";

/**
 * Input class to handle the user input
 */
export class Input extends Component {
  /**
   * Camera component
   */
  camera: Camera;

  /**
   * Key codes
   */
  keyCode_: { [key: string]: boolean };

  /**
   * Mouse coordinates
   */
  mouse: { x: number; y: number; isInside: boolean };

  /**
   * Tile input element
   */
  tileInput: HTMLInputElement;

  constructor(engine: Engine) {
    super(engine, {});
    this.camera = this.components.get(Camera);
    this.keyCode_ = {};
    this.mouse = {
      x: 0,
      y: 0,
      isInside: false,
    };
  }

  init(): void {
    this.tileInput = document.getElementById("tile") as HTMLInputElement;
  }

  mouseMove(event: PointerEvent) {
    let rect = this.engine.display.canvas.getBoundingClientRect();
    this.mouse.x = event.clientX - rect.left;
    this.mouse.y = event.clientY - rect.top;
    if (event.buttons === 2) {
      this.camera.x -= event.movementX;
      this.camera.y -= event.movementY;
    }
    if (event.shiftKey) {
      let x = this.engine.tileMap.getTileX(this.mouse.x + this.camera.x);
      let y = this.engine.tileMap.getTileY(this.mouse.y + this.camera.y);
      this.engine.tileMap.set(x, y, parseInt(this.tileInput.value));
    }
  }

  mouseEnter() {
    this.mouse.isInside = true;
  }

  mouseLeave() {
    this.mouse.isInside = false;
  }

  mouseClick(event: PointerEvent) {
    if (event.metaKey) {
      let x = this.engine.tileMap.getTileX(this.mouse.x + this.camera.x);
      let y = this.engine.tileMap.getTileY(this.mouse.y + this.camera.y);
      this.tileInput.value = `${this.engine.tileMap.get(x, y)}`;
    } else {
      let x = this.engine.tileMap.getTileX(this.mouse.x + this.camera.x);
      let y = this.engine.tileMap.getTileY(this.mouse.y + this.camera.y);
      this.engine.tileMap.set(x, y, parseInt(this.tileInput.value));
    }
  }

  mouseDown(event: PointerEvent): void {}

  keyDown(event: KeyboardEvent): void {
    this.keyCode_[event.code] = true;
  }

  keyUp(event: KeyboardEvent): void {
    this.keyCode_[event.code] = false;
  }

  keyCode(code: string): boolean {
    return typeof this.keyCode_[code] !== "undefined"
      ? this.keyCode_[code]
      : false;
  }

  getAxisHorizontal() {
    let result = this.keyCode("ArrowLeft") ? -1 : 0;
    result += this.keyCode("ArrowRight") ? 1 : 0;
    return result;
  }

  getAxisVertical() {
    let result = this.keyCode("ArrowUp") ? -1 : 0;
    result += this.keyCode("ArrowDown") ? 1 : 0;
    return result;
  }
}
