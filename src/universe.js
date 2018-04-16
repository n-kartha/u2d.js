import {
  priv,
  Vector,
  BufferExecutor
} from './main';
import GameObject from './gameobject/gameobject';
import errors from './dev/errors';

/**
 * Adds a canvas to the document
 * @private
 * @param {Vector} dimensions Width and height
 * @param {string} appendTo Query
 */
function addCanvas(dimensions, appendTo) {
  /**
   * Cavnas onto which GameObjects are drawn
   * @member {HTMLCanvasElement} Universe#canvas
   */
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');

  Object.assign(this.canvas, {
    width: dimensions.x,
    height: dimensions.y
  });

  document.querySelector(appendTo)
    .appendChild(this.canvas);

  this[priv].startTime = this[priv].lastFrame = performance.now();
  requestAnimationFrame(this.draw.bind(this));
}

const DEFAULTS = {
  objects: [],
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
 * Class for interacting with a HTML5 <code>CanvasRenderingContext2D</code>
 */
class Universe {
  /**
   * Initializes a new 2D Universe
   * @param {Vector} dimensions Dimensions (width, height) of the canvas
   * @param {string} [appendTo='body'] Query for element to append canvas to
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
   * Get or set the number of times you expect each object to update per second. Note that setting this does not actually change anything and just makes objects move faster or slower per frame based on the <code>to</code> value specified. FPS defaults to 60.
   * @param {number} [to] Value to set update count to
   * @returns {number|undefined} Current FPS if <code>to</code> is not a <code>number</code>
   */
  fps(to) {
    if (typeof to === "number") {
      this[priv].fps = fps;
    } else {
      return this[priv].fps;
    }
  }

  /**
   * Draw all objects onto the canvas. This function is called automatically and is controlled by <code>requestAnimationFrame>.
   */
  draw() {
    requestAnimationFrame(this.draw.bind(this));
    let currTime = performance.now();
    let time = (currTime - this[priv].startTime) / 1000;
    let delta = (currTime - this[priv].startTime) * this[priv].fps / 1000;

    for (let obj of this[priv].objects) {
      try {
        obj.move(this[priv].dim, time, delta);
        obj.draw(time);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
