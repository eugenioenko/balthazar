import { GameObject } from "./objects";
import { SpriteSheet } from "./sprite-sheets";
import { Sprite } from "./sprites";

interface AnimationArgs {
  /**
   * Name of the animation
   */
  name: string;

  /**
   * Sprite sheet of the animation
   */
  spriteSheet: SpriteSheet;

  /**
   * Frames of the animation
   */
  frames: number[];

  /**
   * Frames per second of the animation
   */
  fps: number;

  /**
   * If the animation should loop
   */
  isInfinite: boolean;
}

export class Animation extends GameObject {
  /**
   * Name of the animation
   */
  name: string;

  /**
   * Sprite sheet of the animation
   */
  spriteSheet: SpriteSheet;

  /**
   * Frames of the animation within the sprite sheet
   */
  frames: number[];

  /**
   * Start frame of the animation
   */
  start: number;

  /**
   * End frame of the animation
   */
  end: number;

  /**
   * Current frame of the animation
   */
  current: number;

  /**
   * If the animation has finished
   */
  finished: boolean;

  /**
   * Frames per second of the animation
   */
  fps: number;

  /**
   * If the animation should loop
   */
  isInfinite: boolean;

  constructor(args: AnimationArgs) {
    super(args);
    this.start = this.frames[0];
    this.end = this.frames[this.frames.length];
    this.current = this.start;
    this.finished = false;
  }

  /**
   *
   * @returns List of required parameters for the animation
   */
  params() {
    return ["name", "spriteSheet", "frames"];
  }

  /**
   *
   * @returns List of optional parameters for the animation
   */
  config() {
    return {
      fps: 60,
      isInfinite: false,
    };
  }

  /**
   * Gets next frame of the animation
   * @returns If the animation has finished
   */
  next(): boolean {
    if (!this.finished) {
      this.current += 1;
    }
    if (this.current > this.end) {
      if (this.isInfinite) {
        this.current = this.start;
      } else {
        this.finished = true;
        this.current = this.end;
      }
    }
    return this.finished;
  }

  /**
   * Restarts the animation
   */
  restart(): void {
    this.current = this.start;
  }
}

export class Animator extends GameObject {}

export class AnimatedSprite extends Sprite {
  /*
  draw(): void {
    if (this.velocity.x === 0) {
      this.animator.idle();
    } else if (this.velocity.x >= 0 && this.velocity.x <= 3) {
      this.animator.walkRight();
    } else if (this.velocity.x > 3) {
      this.animator.runRight();
    } else if (this.velocity.x < 0 && this.velocity.x >= -3) {
      this.animator.walkLeft();
    } else if (this.velocity.x < -3) {
      this.animator.runLeft();
    }
  }
  */
}
