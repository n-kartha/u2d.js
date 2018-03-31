import errors from '../dev/errors';
import {
  priv
} from '../main';

function wait(ms) {
  if (ms) {
    return new Promise(resolve => setTimeout(reslove, ms));
  } else {
    return () => undefined;
  }
}

/**
 * Executes a buffer with an optional interval
 */
class BufferExecutor {
  /**
   * Initializes an empty buffer
   */
  constructor() {
    this.actionList = [];
  }

  /**
   * Add a function to be executed in the queue
   * @param {function} fn Function to queue
   * @returns {BufferExecutor} Chainable <code>this</code> value
   */
  queue(fn) {
    if (typeof fn === 'function') {
      if (!this.executed) {
        this.actionList.push(fn);
      } else {
        fn();
      }

      return this;
    }

    throw errors.invalidArguments(['function'], arguments);
  }

  /**
   * Pause execution of buffer
   */
  pause() {
    this.continueExec = false;
  }

  /**
   * Resume execution of buffer (if paused)
   */
  resume() {
    this.continueExec = true;
  }

  /**
   * Execute queued functions
   * @param {number} delay Delay between executions (ms)
   * @returns {Promise} Resloves when all execution is 
   */
  async execute(delay) {
    if (typeof delay !== "number") {
      delay = 0;
    }

    this.continueExec = true;

    return Promise((resolve, reject) => {
      while (this.actionList.length > 0) {
        await delay();
        if (this.continueExec) {
          let fn = this.actionList.shift();
          await fn();
        } else {
          reject();
        }
      }

      resolve();
      this.executed = true;
    });
  }
}

export default BufferExecutor;
