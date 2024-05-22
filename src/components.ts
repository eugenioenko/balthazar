import { Debug } from "./debug";
import { Engine } from "./engine";
import { ObjectConstructor, GameObject } from "./objects";
import { Registry } from "./registry";

/**
 * This is a base class of the component of the engine.
 * The engine consist of multiple components which perform various tasks.
 * Some Components form part of the core of the Engine, others could be added as need at runtime.
 * When the Engine is ready, it will create the instance of the component and pass itself as the engine parameter.
 * Each Component instance has access to the engine
 * @param {object} engine The instance of the engine, this will be passed by the engine
 * @param {object} params Object literal with parameters passed to the component constructed
 */

export class Component extends GameObject {
  engine: Engine;
  name: string;

  constructor(engine: Engine, args: Record<string, any>) {
    super(args);
    this.engine = engine;
  }

  /**
   * Method called when the component has been added to the engine and is ready
   */
  init() {
    Debug.success(`${this.constructor.name} initialized`);
  }

  /**
   * Method called each cycle of the engine game loop
   */
  move(): void {}

  /**
   * Method called each cycle of the engine game loop
   */
  draw(): void {}

  /**
   * Engines component registry
   */
  get components(): Registry {
    return this.engine.registry;
  }
}
