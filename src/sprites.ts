/* exported Sprite */

import { Collection } from "./collection";
import { Collider } from "./colliders";
import { Component } from "./components";
import { Display } from "./display";
import { Engine } from "./engine";

export interface SpriteArgs {
  /**
   * X position of the sprite
   */
  x: number;

  /**
   * Y position of the sprite
   */
  y: number;

  /**
   * Width of the sprite
   */
  width: number;

  /**
   * Height of the sprite
   */
  height: number;

  /**
   * If the sprite is visible, it will be drawn on the stage
   */
  isVisible: boolean;

  /**
   * If the sprite is active, it will move
   */
  isActive: boolean;
}

/**
 * Base Sprite component. Every Sprite of the engine should derive from this class.
 * Each loop of the game the sprits will move, draw and test collision.
 */
export class Sprite extends Component {
  /**
   * X position of the sprite
   */
  x: number;

  /**
   * Y position of the sprite
   */
  y: number;

  /**
   * Width of the sprite
   */
  width: number;

  /**
   * Height of the sprite
   */
  height: number;

  /**
   * If the sprite is visible, it will be drawn on the stage
   */
  isVisible: boolean;

  /**
   * If the sprite is active, it will move
   */
  isActive: boolean;

  /**
   * Collection of colliders attached to the sprite
   */
  colliders = new Collection<Collider>();

  /**
   * Parent of the sprite
   */
  parent: Component;

  constructor(engine: Engine, args: SpriteArgs) {
    super(engine, args);
  }

  /**
   *
   * @returns List of required parameters for the sprite
   */
  params() {
    return ["x", "y", "width", "height"];
  }

  config(): Partial<SpriteArgs> {
    return {
      isVisible: true,
      isActive: true,
    };
  }

  /**
   * Draws a box around the sprite
   * @param  {string} color Color of the rectangle, default red
   */
  debugDraw(color = "red") {
    const display = this.components.get(Display);
    if (display) {
      display.rect(this.x, this.y, this.width, this.height, color);
    }
  }
  /**
   * Tests for collision between each collider of the sprite against a sprite
   * @param {object} sprite Sprite to test the collision with
   * @return {boolean} True if collision detected
   */
  testCollision(sprite: Sprite) {
    if (!this.colliders.all().length || !sprite.colliders.all().length) {
      return false;
    }
    for (let collider1 of this.colliders.all())
      for (let collider2 of sprite.colliders.all())
        if (collider1.test(collider2)) return true;
    return false;
  }

  /**
   * Method called when the sprite is added to a scene after creation
   */
  init() {}

  /**
   * Method executed each game loop
   */
  move() {}

  /**
   * Method executed each loop of the game
   */
  draw(): void {}

  /**
   * Method executed when the sprite collided with another sprite.
   * @param {object} sprite The other sprite with whom the collision ocurred
   */
  collision(sprite: Sprite) {}

  /**
   * Method executed when the sprite is removed from the engine scene
   */
  destroy() {}
}
