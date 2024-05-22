import { Debug } from "./debug";
import { ObjectConstructor } from "./objects";

/**
 * Registry stores single instances of object indexed by their constructor.
 */
export class Registry {
  items = new Map<ObjectConstructor<any>, any>();

  /**
   *
   * @param Constructor
   * @returns The instance of the object if it exists, otherwise undefined.
   */
  get<T>(Constructor: ObjectConstructor<T>): T {
    const component = this.items.get(Constructor);
    if (!component) {
      Debug.error(`Component ${Constructor.name} is not registered`);
    }
    return component;
  }

  /**
   *
   * @param Constructor The constructor of the object to store.
   * @param instance The instance of the object to store.
   */
  set<T>(Constructor: ObjectConstructor<T>, instance: T) {
    if (Debug.active()) {
      if (this.items.has(Constructor)) {
        Debug.error(`Component ${Constructor} is already defined`);
      }
    }
    this.items.set(Constructor, instance);
  }

  /**
   *
   * @returns An iterator of all the instances stored in the registry.
   */
  values<T>(): IterableIterator<T> {
    return this.items.values() as IterableIterator<T>;
  }
}
