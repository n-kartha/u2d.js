import errors from '../dev/errors';

/**
 * Class to hold 2-dimensional vectors. WARNING: No type-checking is done to increase performance
 */
class Vector {
  /**
   * Creates a new Vector
   * @param {number} x X co-ordinate
   * @param {number} y Y co-ordinate
   */
  constructor(x, y) {
    this.x = +x;
    this.y = +y;
  }

  /**
   * Adds another vector to self
   * @param {Vector} n Vector to add
   * @returns {Vector} New value of self
   */
  add(n) {
    this.x += n.x;
    this.y += n.y;
    return this;
  }

  /**
   * Add 2 vectors
   * @param {Vector} a First vector
   * @param {Vector} b Second vector
   * @returns {Vector} Mathematical equivalent of a + b
   */
  static add(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
  }

  /**
   * Negates self
   * @returns {Vector} New value of self
   */
  neg() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  /**
   * Returns the negative of a vector
   * @param {Vector} a Vector to negate
   * @returns {Vector} Equivalent of -a
   */
  static neg(a) {
    return new Vector(-a.x, -a.y);
  }

  /**
   * Subtracts another vector from self
   * @param {Vector} n Vector to subtract
   * @returns {Vector} New value of self
   */
  subtract(n) {
    this.x -= n.x;
    this.y -= n.y;
    return this;
  }

  /**
   * Subtract a vector from another
   * @param {Vector} a Vector to be subtracted from
   * @param {Vector} b Vector to be subtracted
   * @returns {Vector} Mathematical equivalent of a - b
   */
  static subtract(a, b) {
    return new Vector(a.x - b.x, a.y - b.y);
  }

  /**
   * Scale self by a number
   * @param {number} n Number to scale by
   * @returns {Vector} New value of self
   */
  scale(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }

  /**
   * Scales (multiplies) a vector by a number
   * @param {Vector} vec Vector to scale
   * @param {number} num Amount to scale by
   * @returns {Vector} `vec` scaled by `num`
   */
  static scale(vec, num) {
    return new Vector(vec.x * num, vec.y * num);
  }

  /**
   * Compares self to another vector
   * @param {Vector} vec Vector to compare self to
   * @returns {boolean} Boolean indicating whether self is equal to vec
   */
  equals(vec) {
    return this.x == vec.x && this.y == vec.y;
  }

  /**
   * Checks whether 2 Vectors are equal (mostly used for testing)
   * @param {Vector} a LHS
   * @param {Vector} b RHS
   * @returns {boolean} Boolean indicating whether a is equal to b
   */
  static equals(a, b) {
    return a.x === b.x && a.y === b.y;
  }
}

export default Vector;
