import BufferExecutor from './util/buffer-executor';
import errors from './dev/errors';
import GameObject from './gameobject/gameobject';
import Vector from './util/vector';
import {
  priv
} from './main';

/**
 * Adds a canvas to the document
 * @private
 * @param {Vector} dimensions Width and height
 * @param {string} appendTo Query
 */
function addCanvas(dimensions, appendTo) {
  /**
   * HTML5 `Canvas` element appended to `appendTo`, containing the width and height specified in the x and y values of `dimensions` specified in {@link Universe#newuniverse-dimensions-appendto|the `constructor` of `Universe`}
   * 
   * @summary `Canvas` onto which `GameObject`s are drawn
   * @member {HTMLCanvasElement} Universe#canvas
   */
  this.canvas = document.createElement('canvas');
  Object.assign(this.canvas, {
    width: dimensions.x,
    height: dimensions.y
  });

  /**
   * HTML5 2D rendering context belonging to {@link Universe#canvas|`this.canvas`}
   * 
   * @summary 2D context API to draw onto
   * @member {CanvasRenderingContext2D} Universe#ctx
   */
  this.ctx = this.canvas.getContext('2d');

  document.querySelector(appendTo)
    .appendChild(this.canvas);

  /**
   * Timestamp of the time at which the `Universe` was created
   * 
   * @summary Creation timestamp
   * @member {number} Universe#[priv].startTime
   */
  this[priv].startTime = this[priv].lastFrame = performance.now();
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

/**
 * `U2D.Universe`: Class for interacting with a HTML5 `CanvasRenderingContext2D`
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
   * Draws all objects onto the canvas. This function is called automatically and is controlled by `requestAnimationFrame`, so you do not have to try and call this function yourself.
   * 
   * @summary Draws objects
   */
  draw() {
    requestAnimationFrame(this.draw.bind(this));
    let currTime = performance.now();
    let delta = (currTime - this[priv].lastTime) * this[priv].fps / 1000;

    for (let obj of this[priv].objects) {
      try {
        obj.move(this[priv].dim, delta);
        obj.draw(time);
      } catch (err) {
        console.log(err);
      }
    }

    this[priv].lastTime = currTime;
  }
}

export default Universe;
