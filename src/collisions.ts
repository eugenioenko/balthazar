import { CircleCollider, RectCollider } from "./colliders";

/**
 * A class with static methods which test for collision between different
 * types of colliders.
 */
export class TestCollision {
  static CircleVsRect(circle: CircleCollider, rect: RectCollider): boolean {
    let halfRectWidth = rect.width / 2;
    let halfRectHeight = rect.height / 2;
    let halfDistX = Math.abs(circle.gx - rect.gx - halfRectWidth);
    let halfDistY = Math.abs(circle.gy - rect.gy - halfRectHeight);
    if (halfDistX > halfRectWidth + circle.radius) return false;
    if (halfDistY > halfRectHeight + circle.radius) return false;
    if (halfDistX <= halfRectWidth) return true;
    if (halfDistY <= halfRectHeight) return true;
    //corner collision
    let dx = halfDistX - halfRectWidth;
    let dy = halfDistY - halfRectHeight;
    return dx * dx + dy * dy <= Math.pow(circle.radius, 2);
  }

  static RectVsCircle(rect: RectCollider, circle: CircleCollider): boolean {
    return this.CircleVsRect(circle, rect);
  }

  static RectVsRect(rect1: RectCollider, rect2: RectCollider): boolean {
    if (
      rect1.gx <= rect2.gx + rect2.width &&
      rect1.gx + rect1.width > rect2.gx &&
      rect1.gy <= rect2.gy + rect2.height &&
      rect1.height + rect1.gy >= rect2.gy
    ) {
      return true;
    }
    return false;
  }

  static CircleVsCircle(
    circle1: CircleCollider,
    circle2: CircleCollider
  ): boolean {
    let dx = circle1.gx - circle2.gx;
    let dy = circle1.gy - circle2.gy;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < circle1.width / 2 + circle2.width / 2) {
      return true;
    }
    return false;
  }
}
