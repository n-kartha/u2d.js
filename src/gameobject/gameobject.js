import errors from '../dev/errors';
import EventManager from '../dev/event-manager';
import FLAGS from '../dev/flags';
import Vector from '../util/vector';
import {
  priv
} from '../exports';

/**
 * Default values that every GameObject starts with
 * @private
 */
const DEFAULTS = {
  /**
   * Boolean values belonging to the `GameObject`. These currently include:
   * 
   * - canEscapeCanvas: Whether the object can escape the bounds of the canvas. Default: `true`
   * - hidden: Whether the object is not drawn onto the canvas. Default: `false`
   * 
   * @summary Boolean flags
   * @member GameObject#private:flags
   */
  flags: FLAGS.canEscapeCanvas,

  /**
   * Velocity vector of the object in `px/frame`
   * 
   * @summary Stored velocity
   * @member GameObject#private:velocity
   */
  velocity: new Vector(0, 0),

  /**
   * Force vector acting on the object in `kg * px / frame^2`
   * 
   * @summary Stored force
   * @member GameObject#private:force
   */
  force: new Vector(0, 0),

  /**
   * Mass of the object in `kg`
   * 
   * @summary Stored mass
   * @member GameObject#private:force
   */
  mass: 100
};

/**
 * Fires the hitEdge event and returns 0. Used in the `move` function of `GameObject`
 * 
 * @param {GameObject} obj
 * @param {string} axis
 * @private
 */
function fireEdgeEvent(obj, axis) {
  obj.event.fire('hitEdge', obj, axis);
  return 0;
}

/**
 * `U2D.dev.GameObject`: Base class for all objects in the game. Inherit this class to define new types of objects to be drawn onto the canvas. Do not use directly.
 * 
 * @summary Base class for game objects
 */
class GameObject {
  /**
   * Create a new `GameObject` at the specified position
   * 
   * @param {Vector} pos Vector describing the position of the object
   */
  constructor(pos) {
    if (pos instanceof Vector) {
      this[priv] = DEFAULTS;
      this[priv].pos = pos;
      this[priv].creation = performance.now();

      this.event = new EventManager(['draw', 'hitEdge']);
    } else {
      throw errors.invalidArguments(['Vector'], arguments);
    }
  }

  /**
   * Get or set the X co-ordinate
   * 
   * @summary Get/set X
   * @param {number} [to] Value to set the X co-ordinate to
   * @returns {number|undefined} Current X co-ordinate if `to` is not a number
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
   * 
   * @summary Get/set Y
   * @param {number} [to] Value to set the Y co-ordinate to
   * @returns {number|undefined} Current Y co-ordinate if `to` is not a number
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
   * 
   * @summary (Overridable) Get co-ordinates
   * @param {number} t Time elapsed since the creation of self (in ms)
   * @returns {Vector} Current position
   */
  getCoords(t) {
    return this[priv].pos.clone();
  }

  /**
   * Set a flag whether the gameobject can escape the canvas and leave its bounds
   * 
   * @summary Set whether the object can escape the canvas
   * @param {boolean} bool Can escape the bounds of the canvas
   */
  canEscapeCanvas(bool) {
    if (bool) {
      this[priv].flags |= FLAGS.canEscapeCanvas;
    } else {
      this[priv].flags &= ~FLAGS.canEscapeCanvas;
    }
  }

  /**
   * Hide the object by setting the `hidden` flag to 0
   * 
   * @summary Hide self
   */
  hide() {
    this[priv].flags &= ~FLAGS.hidden;
  }

  /**
   * Show the object by setting the `hidden` flag to 1
   * 
   * @summary Show self
   */
  show() {
    this[priv].flags |= FLAGS.hidden;
  }

  /**
   * Returns whether the object is currently hidden (not drawn onto the canvas)
   * 
   * @summary Hidde self
   */
  hidden() {
    return Boolean(this[priv].flags & FLAGS.hidden);
  }

  /**
   * Get or set velocity vector
   * 
   * @summary Get/set velocity
   * @param {Vector} [v] Vector to set velocity to
   * @returns {Vector|undefined} Current velociy if `v` is not a Vector
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
   * 
   * @summary (Overridable) Get velocity
   * @param {number} t Time elapsed since the creation of self (in ms)
   * @returns {Vector} Current velocity
   */
  getVelocity(t) {
    return this[priv].velocity.clone();
  }

  /**
   * Get force acting on object at current frame. Designed to be overriden.
   * 
   * @summary (Overridable) Get force
   * @param {number} t Time elapsed since the creation of self (in ms)
   * @returns {Vector} Vector representing the force acting on self
   */
  getForce(t) {
    return this[priv].force.clone();
  }

  /**
   * Get or set the mass
   * 
   * @summary Get/set mass
   * @param {number} [m] Mass to set to
   * @returns {number|undefined} Current mass if `m` is not a number
   */
  mass(m) {
    if (typeof m === "number") {
      this[priv].mass = m;
    } else {
      return this[priv].mass;
    }
  }

  /**
   * Push the object, adding the specified force to the current force for `time` milliseconds
   * 
   * @summary Apply (add) force for some time
   * @param {Vector} force Force to add
   * @param {number} time Amount of time to push (in ms)
   */
  pushXY(force, time = -1) {
    if (force instanceof Vector) {
      this[priv].force.add(force);

      if (+time > 0) {
        setTimeout(() => {
          this[priv].force.subtract(force);
        }, time);
      }
    } else {
      throw errors.invalidArguments(['Vector', '[number]'], arguments);
    }
  }

  /**
   * Draw `self` to the canvas. This is called automatically, so you do not have to call it yourself.
   * 
   * @summary (Internal) Draw `self`
   * @param {CanvasRenderingContext2D} ctx Context to draw onto
   * @param {number} time Time elapsed since the creation of self (in ms)
   * @virtual
   */
  draw(ctx, time) {
    throw errors.notImplemented();
  }

  /**
   * Returns whether the object lies entirely to the right of some X co-ordinate
   * 
   * @summary Lies right of a vertical axis
   * @param {number} x X co-ordinate to test
   * @virtual
   */
  liesRightOf(x) {
    throw errors.notImplemented();
  }

  /**
   * Returns whether the object lies entirely to the left of some X co-ordinate
   * 
   * @summary Lies left of a vertical axis
   * @param {number} x X co-ordinate to test
   */
  liesLeftOf(x) {
    throw errors.notImplemented();
  }

  /**
   * Returns whether the object lies entirely above some Y co-ordinate
   * 
   * @summary Lies above a horizontal axis
   * @param {number} y Y co-ordinate to test
   * @virtual
   */
  liesAbove(y) {
    throw errors.notImplemented();
  }

  /**
   * Returns whether the object lies entirely below some Y co-ordinate
   * 
   * @summary Lies below a virtual axis
   * @param {number} y Y co-ordinate to test
   * @virtual
   */
  liesBelow(y) {
    throw errors.notImplemented();
  }

  /**
   * Internal function used to move object. Called automatically each frame.
   * 
   * @summary (Internal) Move `self`
   * @param {Vector} bounds Width and height of bounding rectangle
   * @param {number} delta Factor to multiply all changes by
   */
  move(bounds, delta) {
    let t = performance.now() - this[priv].creation;

    this[priv].velocity.add(
      Vector.scale(this.getForce(t), delta / this[priv].mass)
    );

    let velocity = this.getVelocity(t);

    if (!(this[priv].flags & FLAGS.canEscapeCanvas)) {
      velocity = new Vector(
        this.liesRightOf(bounds.x) || this.liesLeftOf(bounds.x) ? fireEdgeEvent(this, 'x') : velocity.x,
        this.liesAbove(bounds.y) || this.liesBelow(bounds.y) ? fireEdgeEvent(this, 'y') : velocity.y
      );
    }

    this[priv].pos.add(velocity.scale(delta));
  }
}

export default GameObject;
