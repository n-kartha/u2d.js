import Vector from './vector';

/**
 * Namespace for all u2d functions and variables
 */
const U2D = {
  /**
   * <code>Symbol</code> to be used for private variables in classes
   */
  priv: Symbol('Universe2D private symbol'),
  Vector
};

window.U2D = U2D;
export default U2D;
