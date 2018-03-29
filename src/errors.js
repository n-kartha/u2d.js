/**
 * Error messages to be used by all functions in Universe2D. All methods return a string containing the error message.
 */
const errorMessages = {
  /**
   * Thrown when the arguments of a function are not the same as those required
   * @param {string[]} expected Expected argument types
   * @param {Object[]} found `arguments` object for the function
   * @returns {string} Error message
   */
  invalidArguments(expected, found) {
    found = [].slice.call(found) // found is an `arguments` object which has to be converted to a regular array to call `map`
      .map(el => typeof el);

    return Error(`Argument Error: Expected arguments [${expected.join(', ')}], found [${found.join(', ')}]`);
  }
};

export default errorMessages;
