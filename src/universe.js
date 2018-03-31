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
  this.canvas = document.createElement('canvas');

  Object.assign(this.canvas, {
    width: dimensions.x,
    height: dimensions.y
  });

  document.querySelector(appendTo)
    .appendChild(this.canvas);
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
    this[priv] = {};

    if (dimensions instanceof Vector) {
      let self = this;
      this[priv].dim = dimensions;

      this.buf = (new BufferExecutor())
        .queue(addCanvas.bind(this, dimensions, appendTo));
    } else {
      throw errors.invalidArguments(['Vector'], arguments);
    }
  }
}
