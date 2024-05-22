import { Maths } from "./maths";

/**
 * Represents a matrix with a fixed width and height.
 */
export class Matrix {
  array: Uint16Array;

  /**
   * Creates a new Matrix instance.
   * @param width The width of the matrix.
   * @param height The height of the matrix.
   */
  constructor(public width: number, public height: number) {
    this.array = new Uint16Array(width * height);
  }

  /**
   * Gets the value at the specified position in the matrix.
   * @param x The x-coordinate of the position.
   * @param y The y-coordinate of the position.
   * @returns The value at the specified position.
   */
  get(x: number, y: number) {
    return this.array[y * this.width + x];
  }

  /**
   * Sets the value at the specified position in the matrix.
   * @param x The x-coordinate of the position.
   * @param y The y-coordinate of the position.
   * @param value The value to set.
   */
  set(x: number, y: number, value: number) {
    this.array[y * this.width + x] = value;
  }

  /**
   * Loads the matrix with the specified array of values.
   * @param array The array of values to load.
   */
  load(array: number[]) {
    this.array = new Uint16Array(array);
  }

  /**
   * Randomizes the values in the matrix.
   */
  randomize() {
    for (let i = 0; i < this.array.length; ++i) {
      this.array[i] = Maths.rand(0, 3);
    }
  }
}
