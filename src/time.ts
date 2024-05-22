/* exported Time */

import { Component } from "./components";
import { Engine } from "./engine";

/**
 * Manages the time of the game.
 * time.startTime: seconds elapsed science the game started
 * time.frameTime: almost the same as startTime, has the elapsed seconds
 * science the game started but it updates the value by counting the frame time of each game loop.
 * time.deltaTime: inverse relative value to the fps of the game. When the game runs on 60fps the value is 1.
 * When the fps drop, the deltaTime value is increased proportional to the amount of fps dropped.
 * Example:
 * 60fps: deltaTime == 1
 * 30fps: deltaTime == 2
 * 15fps: deltaTime == 4
 */
export class Time extends Component {
  /**
   * deltaTime: inverse relative value to the fps of the game. When the game runs on 60fps the value is 1.
   */
  deltaTime: number;

  /**
   * deltaTimeFS: deltaTime in floating point number.
   */
  deltaTimeFS: number;

  /**
   * time: seconds elapsed science the game started
   */
  time: number;

  /**
   * frameTime: almost the same as startTime, has the elapsed seconds
   */
  frameTime: number;

  /**
   * frameCount: number of frames elapsed science the game started
   */
  frameCount: number;

  /**
   * fps: frames per second of the game
   */
  fps: number;

  /**
   * startTime: seconds elapsed science the game started
   */
  startTime: number;

  /**
   * lastTime: last time the game loop was executed
   */
  lastTime: number;

  constructor(engine: Engine, args: unknown) {
    super(engine, args);
    this.deltaTime = 0;
    this.time = 0;
    this.frameTime = 0;
    this.frameCount = 0;
    this.fps = 0;
    this.startTime = performance.now() / 1000;
    this.lastTime = this.startTime;
    this.lastTime = performance.now() / 1000;
  }

  params(): string[] {
    return [];
  }

  /**
   * Updates the time values.
   */
  move(): void {
    let current = performance.now() / 1000;
    this.deltaTimeFS = current - this.lastTime;
    this.deltaTime = this.deltaTimeFS / (1 / 60);
    this.frameTime += this.deltaTime;
    this.time = current - this.startTime;
    this.lastTime = current;
    this.fps = 1000 / (this.deltaTimeFS * 1000);
  }
}
