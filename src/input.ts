import { Camera } from "./camera";
import { Component } from "./components";
import { Display } from "./display";
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
    let canvas = this.components.get(Display).canvas;
    canvas.addEventListener("mousemove", (event: any) => this.mouseMove(event));
    canvas.addEventListener("mousedown", (event: any) => this.mouseDown(event));
    canvas.addEventListener("mouseenter", () => this.mouseEnter());
    canvas.addEventListener("mouseleave", () => this.mouseLeave());
    canvas.addEventListener("click", (event: any) => this.mouseClick(event));
    window.addEventListener("keydown", (event: any) => this.onKeyDown(event));
    window.addEventListener("keyup", (event: any) => this.keyUp(event));
  }

  private mouseMove(event: PointerEvent) {
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

  private mouseEnter() {
    this.mouse.isInside = true;
  }

  private mouseLeave() {
    this.mouse.isInside = false;
  }

  private mouseClick(event: PointerEvent) {
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

  private mouseDown(event: PointerEvent): void {}

  private onKeyDown(event: KeyboardEvent): void {
    this.keyCode_[event.code] = true;
  }

  private keyUp(event: KeyboardEvent): void {
    this.keyCode_[event.code] = false;
  }

  public keyDown(code: string): boolean {
    return !!this.keyCode_[code];
  }

  public getXAxis() {
    let result = this.keyDown("ArrowLeft") ? -1 : 0;
    result += this.keyDown("ArrowRight") ? 1 : 0;
    return result;
  }

  public getYAxis() {
    let result = this.keyDown("ArrowUp") ? -1 : 0;
    result += this.keyDown("ArrowDown") ? 1 : 0;
    return result;
  }
}
