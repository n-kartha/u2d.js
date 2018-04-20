import BufferExecutor from './util/buffer-executor';
import GameObject from './gameobject/gameobject';
import Vector from './util/vector';

/**
 * `Symbol` to be used for private variables in classes
 */
const priv = Symbol('Universe2D private symbol');

/**
 * Objects and classes for extending the library
 */
const dev = {
  GameObject
};

export {
  priv,
  Vector,
  BufferExecutor,
  dev
};
