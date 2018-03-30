import errorMessages from './errors';
import {
  private,
  Vector
} from './main';

/**
 * Base class for all objects in the game
 */
class GameObject {
  /**
   * Create a new GameObject at the specified position
   * @param {Vector} pos Vector describing the position of the object
   */
  constructor(pos) {
    if (pos instanceof Vector) {
      this[private].pos = pos;
    } else {
      throw errorMessages.invalidArguments(['Vector'], arguments);
    }
  }

  /**
   * Get or set the X co-ordinate
   * @param {number} [to] Value to set the X co-ordinate to
   * @returns {number|undefined} Current X co-ordinate if `to` is not a number
   */
  x(to) {
    if (typeof to !== 'number') {
      return this[private].pos.x;
    } else {
      this[private].pos.x = to;
    }
  }

  /**
   * Get or set the Y co-ordinate
   * @param {number} [to] Value to set the Y co-ordinate to
   * @returns {number|undefined} Current Y co-ordinate if `to` is not a number
   */
  y(to) {
    if (typeof to !== 'number') {
      return this[private].pos.y;
    } else {
      this[private].pos.y = to;
    }
  }

  /**
   * Must be replaced when inherited by a derived class
   */
  draw() {
    throw errorMessages.notImplemented();
  }
}

export default GameObject;
