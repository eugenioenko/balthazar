/**
 * Class with static methods to facilitate the messages on the javascript console.
 * All the methods of Debug class will only run if the debug mode is on.
 * To activate the debug mode, declare a global variable before initializing the engine
 * with the name: GENGINE_DEBUG_MODE = true.
 * If the debug mode is off, no messages would be sent to the console.
 */

declare const GENGINE_DEBUG_MODE: boolean | undefined;

export class Debug {
  /**
   *
   * @returns If the debug mode is active
   */
  static active() {
    return GENGINE_DEBUG_MODE;
  }

  /**
   * Log a message to the console
   * @param message
   */
  static log(message: string) {
    if (!Debug.active()) return;
    console.trace();
    console.log(message);
  }

  /**
   * Log a info message to the console when the debug mode is active
   * @param message
   */
  static info(message: string) {
    if (!Debug.active()) return;
    console.info(message);
  }

  /**
   * Log a success message to the console when the debug mode is active
   * @param message
   */
  static success(message: string) {
    if (!Debug.active()) return;
    console.info(message);
  }

  /**
   * Log a warning message to the console when the debug mode is active
   */
  static warn(message: string) {
    if (!Debug.active()) return;
    console.warn(message);
  }

  /**
   * Throw an error message when the debug mode is active
   * @param message
   */
  static error(message: string) {
    if (!Debug.active()) return;
    console.groupEnd();
    throw new Error(message);
  }

  /**
   * Start a group of messages in the console
   * @param name of the group
   */
  static groupStart(name: string) {
    if (!Debug.active()) return;
    console.groupCollapsed(name);
  }

  /**
   * End a group of messages in the console
   */
  static groupEnd() {
    if (!Debug.active()) return;
    console.groupEnd();
  }

  /**
   * Validates that the object literal of the constructor has the elements of the required array
   * @param method Object method name
   * @param args the arguments object passed into the constructor
   * @param required list of required members in the constructor arguments
   * @returns
   */
  static validateParams(
    method: string,
    args: Record<string, any>,
    required: string[]
  ) {
    if (!Debug.active()) return;
    if (!required || !required.length) return;
    if (required.length && !args) {
      Debug.warn(
        `${method} requires this members in the constructor: {${required.join(
          ","
        )}}`
      );
    }
    for (let key of required) {
      if (typeof args[key] === "undefined") {
        Debug.error(`${method} requires of "${key}" in the constructor`);
      }
    }
  }
}
