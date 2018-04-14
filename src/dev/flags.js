/**
 * Bitwise flags for boolean values in GameObject
 * @private
 */
const FLAGS = { // using flags takes up much less memory than using individual booleans
  canEscapeCanvas: 0b01,
  hidden: 0b10
};

export default FLAGS;
