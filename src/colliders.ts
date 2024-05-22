import { TestCollision } from "./collisions";
import { Debug } from "./debug";
import { Display } from "./display";
import { GameObject } from "./objects";
import { Sprite } from "./sprites";

export interface ColliderArgs {
  x: number;
  y: number;
  width: number;
  height: number;
  parent: Sprite;
}

/**
 * Collider represents a rect/circle which can collide with another collider.
 * The position of the collider is relative to its parent sprite.
 * A sprite can have "infinite" number of colliders.
 */
export class Collider extends GameObject {
  width: number;
  height: number;
  parent: Sprite;
  y: number;
  x: number;

  constructor(args: ColliderArgs) {
    super(args);
  }

  test(collider: Collider): boolean {
    throw "Not implemented";
  }

  get gx() {
    return this.parent.x + this.x;
  }

  get gy() {
    return this.parent.y + this.y;
  }

  debugDraw(color: string = "red") {
    throw "Not implemented";
  }
}
/**
 * CircleCollider is a Collider with a circular shape.
 */
export class CircleCollider extends Collider {
  radius: number;

  constructor(args: ColliderArgs) {
    super(args);
    this.radius = this.width / 2;
  }

  test(collider: Collider): boolean {
    if (collider instanceof CircleCollider) {
      return TestCollision.CircleVsCircle(this, collider);
    }
    if (collider instanceof RectCollider) {
      return TestCollision.CircleVsRect(this, collider);
    }
    throw "Unknown collider";
  }

  debugDraw(color: string = "red") {
    const display = this.parent.components.get(Display);
    if (!display) {
      return;
    }
    display.circle(this.gx, this.gy, this.radius, color);
  }
}

/**
 * RectCollider is a collider of rectangular shape.
 */
export class RectCollider extends Collider {
  x: number;
  y: number;
  width: number;
  height: number;
  parent: Sprite;

  constructor(params: ColliderArgs) {
    super(params);
  }

  params() {
    return ["x", "y", "width", "height"];
  }

  test(collider: Collider): boolean {
    if (collider instanceof CircleCollider) {
      return TestCollision.CircleVsRect(collider, this);
    }
    if (collider instanceof RectCollider) {
      return TestCollision.RectVsRect(this, collider);
    }

    Debug.error("Unknown collider " + typeof collider);
    return false;
  }

  debugDraw(color: string = "red") {
    const display = this.parent.components.get(Display);
    if (!display) {
      return;
    }
    display.rect(this.gx, this.gy, this.width, this.height, color);
  }
}
