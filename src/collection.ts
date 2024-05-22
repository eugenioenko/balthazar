/**
 * Collection are a group of items that can be of any type.
 */
export class Collection<T> {
  public items: T[] = [];

  /**
   * Add an item to the collection.
   * @param item Item to add.
   */
  add(item: T) {
    this.items.push(item);
  }

  /**
   * Remove an item from the collection.
   * @param item Item to remove.
   */
  remove(item: T) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  /**
   * Get all items in the collection.
   */
  all(): T[] {
    return this.items;
  }
}
