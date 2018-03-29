import errorMessages from './errors';

/**
 * Class to hold 2-dimensional vectors
 */
class Vector {
  /**
   * Creates a new Vector
   * @param {number} x X co-ordinate
   * @param {number} y Y co-ordinate
   */
  constructor(x, y) {
    if (typeof x === "number" && typeof y === "number") {
      this.x = x;
      this.y = y;
    } else {
      throw errorMessages.invalidArguments(['number', 'number'], arguments);
    }
  }

  // add(n) {
  //   if (typeof n === "number") {
  //     this.x += n;
  //     this.y += n;
  //   } else if (n instanceof Vector) {
  //     this.x += n.x;
  //     this.y += n.y;
  //   }
  // }

  /**
   * Add 2 vectors
   * @param {Vector} a First vector
   * @param {Vector} b Second vector
   * @returns {Vector} Mathematical equivalent of a + b
   */
  static add(a, b) {
    if (a instanceof Vector && b instanceof Vector) {
      return new Vector(a.x + b.x, a.y + b.y);
    } else {
      throw errorMessages.invalidArguments(['Vector', 'Vector'], arguments);
    }
  }

  // subtract(n) {
  //   if (typeof n === "number") {
  //     this.x -= n;
  //     this.y -= n;
  //   } else if (n instanceof Vector) {
  //     this.x -= n.x;
  //     this.y -= n.y;
  //   }
  // }

  /**
   * Subtract a vector from another
   * @param {Vector} a Vector to be subtracted from
   * @param {Vector} b Vector to be subtracted
   * @returns {Vector} Mathematical equivalent of a - b
   */
  static subtract(a, b) {
    if (a instanceof Vector && b instanceof Vector) {
      return new Vector(a.x - b.x, a.y - b.y);
    } else {
      throw errorMessages.invalidArguments(['Vector', 'Vector'], arguments);
    }
  }

  /**
   * Scales (multiplies) a vector by a number
   * @param {Vector} vec Vector to scale
   * @param {number} num Amount to scale by
   * @returns {Vector} vec * num
   */
  static scale(vec, num) {
    if (a instanceof Vector && typeof b === "number") {
      return new Vector(vec.x * num, vec.y * num);
    } else {
      throw errorMessages.invalidArguments(['Vector', 'number'], arguments);
    }
  }
}
