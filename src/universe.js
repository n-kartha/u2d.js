import {
  priv,
  Vector
} from './main';

import GameObject from './gameobject/gameobject';
import erros from './dev/errors';

/**
 * Class for interacting with a HTML5 CanvasRendringContext2D
 */
class Universe {
  constructor(dimensions) {
    if (dimensions instanceof Vector) {
      this[priv].dim = dimensions;
    }
  }
}
