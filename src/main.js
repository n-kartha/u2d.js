import Vector from './util/vector';
import BufferExecutor from './util/buffer-executor';

/**
 * Namespace for all u2d functions and variables
 */
const U2D = {
  /**
   * <code>Symbol</code> to be used for private variables in classes
   */
  priv: Symbol('Universe2D private symbol'),
  Vector,
  BufferExecutor
};

export default U2D;
