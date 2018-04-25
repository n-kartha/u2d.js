import BufferExecutor from './util/buffer-executor';
import errors from './dev/errors';
import GameObject from './gameobject/gameobject';
import Vector from './util/vector';
import {
  priv
} from './exports';

/**
 * Adds a canvas to the document
 * @private
 * @param {Vector} dimensions Width and height
 * @param {string} appendTo Query
 */
function addCanvas(dimensions, appendTo) {
  /**
   * HTML5 `<canvas>` element appended to `appendTo`, containing the width and height specified in the x and y values of `dimensions` specified in {@link Universe#newuniverse-dimensions-appendto|the `constructor` of `Universe`}
   * 
   * @summary Canvas onto which `GameObject`s are drawn
   * @member {HTMLCanvasElement} Universe#private:canvas
   */
  this[priv].canvas = document.createElement('canvas');

  Object.assign(this[priv].canvas, {
    width: dimensions.x,
    height: dimensions.y
  });

  /**
   * HTML5 2D rendering context belonging to {@link Universe#canvas|`this.canvas`}
   * 
   * @summary 2D context API to draw onto
   * @member {CanvasRenderingContext2D} Universe#ctx
   */
  this.ctx = this[priv].canvas.getContext('2d');

  document.querySelector(appendTo)
    .appendChild(this[priv].canvas);

  /**
   * Time at which the `Universe` was created (in ms)
   * 
   * @summary Creation timestamp
   * @member {number} Universe#private:startTime
   */

  /**
   * Time at which the previous frame was shown (in ms)
   * 
   * @summary Previous frame timestamp
   * @member {number} Universe#private:lastFrame
   */
  this[priv].startTime = this[priv].lastFrame = performance.now();

  /**
   * Boolean indicating whether it is safe to request the next animation frame
   * 
   * @summary Increment frame
   * @member {boolean} Universe#running
   */
  this.running = true;
  requestAnimationFrame(this.draw.bind(this));
}

const DEFAULTS = {
  /**
   * Iterated through each frame and the `.draw()` function is called to each object within. All objects are expected to inherit from `GameObject` and implement all functions necessary.
   * 
   * @summary Objects within the `Universe`
   * @member {Array} Universe#private:objects
   */
  objects: [],

  /**
   * Changing this does not change the actual number of times the canvas is updated. Objects change their position faster or slower per frame based on this number. Changed by the {@link Universe#fps|`fps([to])` function}
   * 
   * @summary Number of times the `Universe` is expected to draw per second.
   * @member {number} Universe#private:fps
   */
  fps: 60
};

/**
 * Buffer to be executed when the document becomes ready
 * @private
 */
let readyBuffer = new BufferExecutor();

if (document.readyState === 'interactive') {
  readyBuffer.execute();
}

document.addEventListener('DOMContentLoaded', () => readyBuffer.execute());

/**
 * `U2D.Universe`: Class for interacting with a HTML5 `CanvasRenderingContext2D`
 * 
 * @summary Canvas manipulator
 */
class Universe {
  /**
   * Initializes a new 2D `Universe`
   * 
   * @param {Vector} dimensions Dimensions (`x: width`, `y: height`) of the canvas
   * @param {string} [appendTo='body'] CSS query for element to append canvas to. This is similar to jQuery query strings.
   */
  constructor(dimensions, appendTo = 'body') {
    this[priv] = DEFAULTS;

    if (dimensions instanceof Vector) {
      let self = this;
      this[priv].dim = dimensions;

      readyBuffer.queue(addCanvas.bind(this, dimensions, appendTo));
    } else {
      throw errors.invalidArguments(['Vector'], arguments);
    }
  }

  /**
   * Gets or sets the number of times you expect each object to update per second. Note that setting this does not actually change anything and just makes objects move faster or slower per frame based on the `to` value specified. FPS defaults to 60.
   * 
   * @summary Gets or sets expected update count per second
   * @param {number} [to] Value to set update count to
   * @returns {number|undefined} Current FPS if `to` is not a `number`
   */
  fps(to) {
    if (typeof to === "number") {
      this[priv].fps = fps;
    } else {
      return this[priv].fps;
    }
  }

  /**
   * Stops drawing and requesting more animation frames
   * 
   * @summary Pauses the game
   */
  pause() {
    cancelAnimationFrame(this[priv].animId);
    this.running = false;
  }


  /**
   * Restarts drawing and requesting animation frames
   * 
   * @summary Resumes the game
   */
  resume() {
    this[priv].lastFrame = performance.now();
    requestAnimationFrame(this[priv].animId);
    this.running = true;
  }

  /**
   * Adds a `GameObject` to the {@link Universe#private:objects|`objects` list} so that it is drawn onto the canvas the next time the screen is updated
   * 
   * @summary Adds an object to the game
   * @param {GameObject} obj Object to be added
   */
  add(obj) {
    this[priv].objects.push(obj);
  }

  /**
   * Move an objects Z position to just in front of another's
   * 
   * @summary Change Z in front of another object
   * @param {GameObject} obj Object to change the Z of
   * @param {GameObject} before Object to put `obj` in front of
   */
  setZBefore(obj, before) {
    let objIndex, beforeIndex;

    if ((objIndex = this[priv].objects.indexOf(obj)) === -1 ||
      (beforeIndex = this[priv].objects.indexOf(before)) === -1) {
      throw errors.inexistent();
    }

    this[priv].objects.splice(objIndex, 1);
    this[priv].objects.splice(beforeIndex, 0, obj);
  }

  /**
   * Draws all objects onto the canvas. This function is called automatically and is controlled by `requestAnimationFrame`, so you do not have to try and call this function yourself.
   * 
   * @summary (Internal) Draws objects
   */
  draw() {
    if (this.running) {
      /**
       * ID returned by `requestAnimationFrame` for the previous call of {@link Universe#draw|`Universe.prototype.draw`}
       * 
       * @summary `requestAnimationFrame` ID
       * @member {number} Universe#private:animId
       */
      this[priv].animId = requestAnimationFrame(this.draw.bind(this));
    }

    let currTime = performance.now();
    let delta = (currTime - this[priv].lastTime) * this[priv].fps / 1000;

    this.ctx.fillRect(0, 0, this[priv].dim.x, this[priv].dim.y);

    for (let obj of this[priv].objects) {
      try {
        obj.move(this[priv].dim, delta);
        obj.draw(this.ctx, currTime);
      } catch (err) {
        console.log(err);
      }
    }

    this[priv].lastTime = currTime;
  }
}

export default Universe;
