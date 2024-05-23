import { Component } from "./components";
import { Engine } from "./engine";

/**
 * Component for managing camera position on the screen.
 * The Camera is the viewport of the game, you see the game world through the camera.
 */

export interface CameraArgs {
  /**
   * x position of the camera
   */

  x: number;
  /**
   * y position of the camera
   */
  y: number;
}

export class Camera extends Component {
  /**
   * x position of the camera
   */
  x: number;

  /**
   * y position of the camera
   */
  y: number;

  constructor(engine: Engine, args: CameraArgs) {
    super(engine, args);
  }
  params() {
    return ["x", "y"];
  }

  move(): void {}
}
