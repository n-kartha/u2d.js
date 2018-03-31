/**
 * Error messages to be used by all functions in Universe2D. All methods return an error object containing the error message.
 * @namespace
 * @private
 */
const errors = {
  /**
   * Thrown when the arguments of a function are not the same as those required
   * @param {string[]} expected Expected argument types
   * @param {Object[]} found `arguments` object for the function
   * @returns {TypeError} Throwable error
   */
  invalidArguments(expected, found) {
    found = [].slice.call(found) // found is an `arguments` object which has to be converted to a regular array to call `map`
      .map(el => typeof el);

    return new TypeError(`Argument Error: Expected arguments [${expected.join(', ')}], found [${found.join(', ')}]`);
  },

  /**
   * Thrown when a function that should be implemented is not
   */
  notImplemented() {
    return new Error('The function accessed has not been implemented by a derived class.');
  }
};

export default errors;
