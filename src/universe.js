import {
  priv,
  Vector
} from './main';

import GameObject from './gameobject/gameobject';
import errors from './dev/errors';

/**
 * Class for interacting with a HTML5 <code>CanvasRendringContext2D</code>
 */
class Universe {
  /**
   * Initializes a new 2D Universe
   * @param {Vector} dimensions Dimensions (width, height) of the canvas
   */
  constructor(dimensions) {
    if (dimensions instanceof Vector) {
      this[priv].dim = dimensions;
    } else {
      throw errors.invalidArguments(['Vector'], arguments);
    }
  }
}
