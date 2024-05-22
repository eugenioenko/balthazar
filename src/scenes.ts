/* exported Scene */

import { Collection } from "./collection";
import { Component } from "./components";
import { Engine } from "./engine";
import { Sprite } from "./sprites";

/**
 * Scene configuration.
 */
export interface SceneArgs {
  /**
   * If the scene is active, the sprites of the scene will move and collide.
   */
  isActive: boolean;
  /**
   * If the scene is visible, the sprites of the scene will be drawn on the stage.
   */
  isVisible: boolean;
}

/**
 * Scene is a collection of sprites of a game.
 * Only the sprites in the same scene can collide with each other.
 * The engine can have a single scene or multiple. Depending on the active scene of
 * the engine, that scene sprites would be draw, moved and collided on the stage.
 */
export class Scene extends Component {
  /**
   * Collection of sprites of the scene.
   */
  sprites = new Collection<Sprite>();

  /**
   * If the scene is active, the sprites of the scene will move and collide.
   */
  isActive: boolean;

  /**
   * If the scene is visible, the sprites of the scene will be drawn on the stage.
   */
  isVisible: boolean;

  constructor(engine: Engine, args: SceneArgs) {
    super(engine, args);
  }

  /**
   *
   * @returns default scene configuration.
   */
  config(): SceneArgs {
    return {
      isActive: true,
      isVisible: true,
    };
  }

  move(): void {
    if (!this.isActive) {
      return;
    }
    this.collision();
    for (let sprite of this.sprites.all()) {
      if (sprite.isActive) {
        sprite.move();
      }
    }
  }

  draw(): void {
    if (!this.isVisible) {
      return;
    }
    for (let sprite of this.sprites.all()) {
      if (sprite.isVisible) {
        sprite.draw();
      }
    }
  }

  /**
   *  Add a sprite to the scene.
   * @param sprite to be added.
   */
  addSprite(sprite: Sprite): void {
    sprite.engine = this.engine;
    sprite.parent = this;
    sprite.init();
    this.sprites.add(sprite);
  }

  /**
   * Removes a sprite from the scene.
   * @param sprite to be removed.
   */
  removeSprite(sprite: Sprite) {
    this.sprites.remove(sprite);
  }

  // TODO: add quad-tree for collision detection
  collision() {
    const sprites = this.sprites.all();
    for (let i = 0; i < sprites.length; ++i) {
      for (let j = i + 1; j < sprites.length; ++j) {
        let sprite1 = sprites[i];
        let sprite2 = sprites[j];
        if (sprite1.testCollision(sprite2)) {
          sprite1.collision(sprite2);
          sprite2.collision(sprite1);
        }
      }
    }
  }
}
