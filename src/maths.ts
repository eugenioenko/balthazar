import { Rect } from "./rect";

export class Maths {
  /**
   *
   * @param value the value to clamp
   * @param min the minimum value
   * @param max the maximum value
   * @returns the clamped value
   */
  static clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Linear interpolate between two values
   * @param min the minimum value
   * @param max the maximum value
   * @param t the time value
   * @returns the lerped value
   */
  static lerp(min: number, max: number, t: number) {
    return min + (max - min) * t;
  }

  /**
   * Generate a random number between two values
   * @param min the minimum value
   * @param max the maximum value
   * @returns the random number
   */
  static rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Check if two rectangles intersect
   * @param rect1
   * @param rect2
   * @returns true if the rectangles intersect
   */
  static RectIntersect(rect1: Rect, rect2: Rect) {
    if (
      rect1.x <= rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y <= rect2.y + rect2.height &&
      rect1.height + rect1.y >= rect2.y
    ) {
      return true;
    }
    return false;
  }
}
