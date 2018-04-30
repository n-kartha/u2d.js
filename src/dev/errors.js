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
   * @returns {Error} Throwable `ArgumentError`
   */
  invalidArguments(expected, found) {
    found = [].slice.call(found) // `found` is an `arguments` object
      .map(el => typeof el);

    let err = new Error(`Expected arguments [${expected.join(', ')}], found [${found.join(', ')}]. Try reading the docs to make sure that you are calling the method correctly.`);
    err.name = 'ArgumentError';

    return err;
  },

  /**
   * Thrown when keys expected in an object are not present
   * @param {string} objName Name of the invalid object
   * @param {string} expected Expected keys
   * @param {object} received Received keys
   * @returns {Error} Throwable `InvalidObjectError`
   */
  invalidObject(objName, expected, received) {
    let err = new Error(`Expected object ${objName} with keys ${expected}, found ${JSON.stringify(received)}. Try reading the docs to make sure that you're passing all objects correctly.`);
    err.name = 'InvalidObjectError';

    return err;
  },

  /**
   * Thrown when a function that should be implemented is not implemented
   * @returns {Error} Throwable `NotImplementedError`
   */
  notImplemented() {
    let err = new Error('The function accessed has not been implemented by a derived class. You have to override a few functions if you want to inherit from the specific class.');
    err.name = 'NotImplementedError';

    return err;
  },

  /**
   * Thrown when an inexistent member is passed as an argument
   * @param {string} type Type of inexistent member
   * @param {string} list List from which the member is missing
   * @returns {Error} Throwable `InexistentObjectError`
   */
  inexistent(type, list) {
    let err = new Error(`The ${type} specified does not exist in the current ${list}.`);
    err.name = 'InexistentObjectError';

    return err;
  }
};

export default errors;
