import errors from '../dev/errors';
import FLAGS from '../dev/flags';
import Vector from '../util/vector';
import {
  priv
} from '../main';

/**
 * Default values that every GameObject starts with
 * @private
 */
const DEFAULTS = {
  /**
   * Boolean values belonging to the GameObject
   */
  flags: FLAGS.canEscapeCanvas,

  /**
   * Velocity vector of the object in pixels/frame
   */
  velocity: new Vector(0, 0),

  /**
   * Force vector acting on the object in kg*pixels/frame^2
   */
  force: new Vector(0, 0),

  /**
   * Mass of the object (an arbitrary number without any unit, but we'll use kg)
   */
  mass: 0,

  /**
   * Number of frames that the force should last for
   */
  forceTime: 0
};

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
      this[priv] = DEFAULTS;
      this[priv].pos = pos;
      this[priv].creation = performance.now();
    } else {
      throw errors.invalidArguments(['Vector'], arguments);
    }
  }

  /**
   * Get or set the X co-ordinate
   * @param {number} [to] Value to set the X co-ordinate to
   * @returns {number|undefined} Current X co-ordinate if <code>to</code> is not a number
   */
  x(to) {
    if (typeof to !== 'number') {
      return this.getCoords()
        .x;
    } else {
      this[priv].pos.x = to;
    }
  }

  /**
   * Get or set the Y co-ordinate
   * @param {number} [to] Value to set the Y co-ordinate to
   * @returns {number|undefined} Current Y co-ordinate if <code>to</code> is not a number
   */
  y(to) {
    if (typeof to !== 'number') {
      return this.getCoords()
        .y;
    } else {
      this[priv].pos.y = to;
    }
  }

  /**
   * Get position vector at current frame. Designed to be overriden.
   * @param {number} t Time elapsed since the creation of self (in ms)
   * @returns {Vector} Current position
   */
  getCoords(t) {
    return this[priv].pos.clone();
  }

  /**
   * Get or set velocity vector
   * @param {Vector} [v] Vector to set velocity to
   * @returns {Vector|undefined} Current velociy if <code>v</code> is not a Vector
   */
  velocity(v) {
    if (v instanceof Vector) {
      this[priv].velocity = v;
    } else {
      return this.getVelocity();
    }
  }

  /**
   * Get velocity vector at current frame. Designed to be overriden.
   * @param {number} t Time elapsed since the creation of self (in ms)
   * @returns {Vector} Current velocity
   */
  getVelocity(t) {
    return this[priv].velocity.clone();
  }

  /**
   * Get force acting on object at current frame. Designed to be overriden.
   * @param {number} t Time elapsed since the creation of self (in ms)
   * @returns {Vector} Vector representing the force acting on self
   */
  getForce(t) {
    if (this[priv].forceTime !== -1 && performance.now() > this[priv].forceTime) {
      this[priv].force = new Vector(0, 0);
    }

    return this[priv].force.clone();
  }

  /**
   * Get or set the mass
   */
  mass(m) {
    if (typeof m === "number") {
      this[priv].mass = m;
    } else {
      return this[priv].mass;
    }
  }

  /**
   * Push the object
   * @param {Vector} force 
   * @param {number} time Amount of time to push (in ms)
   */
  pushXY(force, time = -1) {
    if (force instanceof Vector) {
      this[priv].force.x += force.x;
      this[priv].force.y += force.y;

      if (typeof time === "number") {
        this[priv].forceTime = time === -1 ? -1 : performance.now() + time;
      }
    } else {
      throw errors.invalidArguments(['Vector', '[number]'], arguments);
    }
  }

  /**
   * Draw self to the canvas
   * @param {CanvasRenderingContext2D} ctx Context to draw onto
   * @param {number} time Time elapsed since the creation of self (in ms)
   */
  draw(ctx, time) {
    throw errors.notImplemented();
  }

  /**
   * Returns whether the object lies entirely to the right of some X co-ordinate
   * @param {number} x X co-ordinate to test
   */
  liesRightOf(x) {
    throw errors.notImplemented();
  }

  /**
   * Returns whether the object lies entirely to the left of some X co-ordinate
   * @param {number} x X co-ordinate to test
   */
  liesLeftOf(x) {
    throw errors.notImplemented();
  }

  /**
   * Returns whether the object lies entirely above some Y co-ordinate
   * @param {number} y Y co-ordinate to test
   */
  liesAbove(y) {
    throw errors.notImplemented();
  }

  /**
   * Returns whether the object lies entirely below some Y co-ordinate
   * @param {number} y Y co-ordinate to test
   */
  liesBelow(y) {
    throw errors.notImplemented();
  }

  /**
   * Internal function used to move object. Called automatically each frame.
   * @param {Vector} bounds Width and height of bounding rectangle
   * @param {number} delta Factor to multiply all changes by
   */
  move(bounds, delta) {
    let t = performance.now() - this[priv].creation;

    this[priv].velocity.add(
      Vector.scale(this.getForce(t), 1 / this[priv].mass)
      .scale(delta)
    );

    let velocity = this.getVelocity(t);

    if (!(this[priv].flags & FLAGS.canEscapeCanvas)) {
      velocity = new Vector(
        this.liesRightOf(bounds.x) || this.liesLeftOf(bounds.x) ? 0 : velocity.x,
        this.liesAbove(bounds.y) || this.liesBelow(bounds.y) ? 0 : velocity.y
      );
    }

    this[priv].pos.add(velocity.scale(delta));
  }
}

export default GameObject;
