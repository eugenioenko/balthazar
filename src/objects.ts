import { Debug } from "./debug";

/**
 * Base constructor type for all the elements of the engine.
 */
export type ObjectConstructor<T> = { new (...args: any[]): T };

/**
 * Base object of all the elements of the engine.
 *
 * The params is used as validation of the arguments passed in the constructor for debugging.
 * The params method should return an array with the names of all the keys which should be
 * present as args of a GameObject.
 * The config method should return an object with the default values of the GameObject.
 *
 * @example
 * class Element extends GameObject {
 *  params() {
 *   return ["x", "y"];
 *  }
 *  config() {
 *    return {
 *      x: 0,
 *      y: 0,
 *      width: 100,
 *      height: 100,
 *    };
 *  }
 * }
 * const o = new Element();
 * // this will throw an error because x and y are required
 *
 * const o = new Element({ x: 10, y: 10 });
 * // this will not throw an error and x and y will be 10 and width and height will be 100
 *
 */

export class GameObject {
  constructor(args: Record<string, any> = {}) {
    Debug.validateParams(this.constructor.name, args, this.params());
    const defaults = this.config();
    Object.assign(this, defaults, args);
  }

  /**
   *
   * @returns {string[]} Array with the names of the keys that should be present in the constructor
   */
  params(): string[] {
    return [];
  }

  /**
   *
   * @returns {Record<string, any>} Object with the default values of the GameObject
   */
  config() {
    return {};
  }
}
