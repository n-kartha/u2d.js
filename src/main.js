import Vector from './vector';

/**
 * Namespace for all u2d functions and variables
 */
const U2D = {
  /**
   * `Symbol` to be used for private variables in classes
   */
  private: Symbol('Universe2D private symbol'),
  Vector
};

window.U2D = U2D;
export default U2D;
