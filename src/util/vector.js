import errors from '../dev/errors';

/**
 * `U2D.Vector`: Holds 2-dimensional vectors. **No type-checking is done, so that the library performs better.**
 * 
 * @summary 2D Vector
 */
class Vector {
  /**
   * Creates a new `Vector`
   * 
   * @param {number} x X value of the `Vector`
   * @param {number} y Y value of the `Vector`
   */
  constructor(x, y) {
    this.x = +x;
    this.y = +y;
  }

  /**
   * Adds another `Vector` to `self`, mutating `self`
   * 
   * @summary Mutable add
   * @param {Vector} n `Vector` to add to `self`
   * @returns {Vector} New value of `self`
   */
  add(n) {
    this.x += n.x;
    this.y += n.y;
    return this;
  }

  /**
   * Adds 2 `Vector`s, returning a new `Vector` without mutating any of the original `Vector`s
   * 
   * @summary Immutable add
   * @param {Vector} a First `Vector`
   * @param {Vector} b Second `Vector`
   * @returns {Vector} `a + b`
   */
  static add(a, b) {
    return new Vector(a.x + b.x, a.y + b.y);
  }

  /**
   * Flips the direction of and mutates `self`
   * 
   * @summary Mutable negative
   * @returns {Vector} New value of `self`
   */
  neg() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  /**
   * Returns a new `Vector` containing the negative of a `Vector` without mutating it
   * 
   * @summary Immutable negative
   * @param {Vector} a `Vector` to get the negative of
   * @returns {Vector} `-a`
   */
  static neg(a) {
    return new Vector(-a.x, -a.y);
  }

  /**
   * Subtracts another `Vector` from and mutates `self`
   * 
   * @summary Mutable subract
   * @param {Vector} n `Vector` to subtract
   * @returns {Vector} New value of `self`
   */
  subtract(n) {
    this.x -= n.x;
    this.y -= n.y;
    return this;
  }

  /**
   * Subtracts a `Vector` from another, returning a new `Vector` without mutating the original `Vector`s
   * 
   * @summary Immutable subtract
   * @param {Vector} a `Vector` to be subtracted from
   * @param {Vector} b `Vector` to be subtracted
   * @returns {Vector} `a - b`
   */
  static subtract(a, b) {
    return new Vector(a.x - b.x, a.y - b.y);
  }

  /**
   * Scales (multiplies) and mutate `self` by a number
   * 
   * @summary Mutable scale
   * @param {number} n Number to scale by
   * @returns {Vector} New value of `self`
   */
  scale(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }

  /**
   * Scales (multiplies) a `Vector` by a number without mutating it
   * 
   * @summary Immutable scale
   * @param {Vector} vec `Vector` to scale
   * @param {number} num Amount to scale by
   * @returns {Vector} `vec * num`
   */
  static scale(vec, num) {
    return new Vector(vec.x * num, vec.y * num);
  }

  /**
   * Clones `self`
   * 
   * @summary Copy `self`
   * @returns {Vector} Clone of `self`
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  /**
   * Clones a `Vector`
   * 
   * @summary Copy a `Vector`
   * @param {Vector} vec Vector to clone
   * @returns {Vector} Clone of `vec`
   */
  static clone(vec) {
    return new Vector(vec.x, vec.y);
  }

  /**
   * Checks if a `Vector` is equal to `self`
   * 
   * @summary Instance equality test
   * @param {Vector} vec `Vector` to compare `self` to
   * @returns {boolean} `self === vec`
   */
  equals(vec) {
    return this.x === vec.x && this.y === vec.y;
  }

  /**
   * Checks if 2 `Vector`s are equal
   * 
   * @summary Static equality check
   * @param {Vector} a LHS
   * @param {Vector} b RHS
   * @returns {boolean} `LHS === RHS`
   */
  static equals(a, b) {
    return a.x === b.x && a.y === b.y;
  }
}

export default Vector;
