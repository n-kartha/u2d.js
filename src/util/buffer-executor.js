import errors from '../dev/errors';
import {
  priv
} from '../exports';

function wait(ms) {
  if (ms) {
    return new Promise(resolve => setTimeout(reslove, ms));
  } else {
    return () => undefined;
  }
}

/**
 * Recursively execute buffer
 * @param {BufferExecutor} buf
 * @param {function} callback
 */
async function recurseExec(buf, callback) {
  if (buf.actionList.length === 0 || !buf.continueExec) {
    return;
  }

  await buf.actionList.shift()();
  setTimeout(recurseExec.bind(undefined, buf), buf.delay);
}

/**
 * Executes a buffer with an optional interval
 * 
 * @summary Executes functions in a buffer
 */
class BufferExecutor {
  /**
   * Initializes an empty buffer
   */
  constructor() {
    /**
     * List of functions that will be executed when {@link BufferExecutor#execute|this `BufferExecutor` is executed}.
     * 
     * @summary List of queued functions
     * @member {function[]} BufferExecutor#actionList
     */
    this.actionList = [];

    /**
     * Delay between the executions of each function in the `BufferExecutor`
     * 
     * @summary Delay between functions
     * @member {number} BufferExecutor#delay
     * @default 0
     */
    this.delay = 0;
  }

  /**
   * Adds a `function` to the queue. The `function` is executed immediately if the queue has already finished executing.
   * 
   * @summary Queue a `function`
   * @param {function} fn Function to queue
   * @returns {BufferExecutor} Chainable `this` value
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
   * Pause the execution of the `BufferExecutor`. Note that if a function was previously executing, that function will execute completely before it stops.
   * 
   * @summary Pause execution
   */
  pause() {
    this.continueExec = false;
  }

  /**
   * Resume the execution of the buffer (if paused)
   * 
   * @summary Resume execution
   */
  resume() {
    if (!this.continueExec) {
      this.execute();
    }
  }

  /**
   * Execute all queued functions asynchronously. Removes the first element from {@link BufferExecutor#actionList|the `actionList`} each time it executes. Stops execution when the list is empty or if {@link BufferExecutor#pause|pause} is called.
   * 
   * @summary Begin execution
   * @param {number} [delay=0] Delay between executions (ms)
   */
  execute(delay = 0) {
    /**
     * Boolean indicating whether execution is paused or is allowed to continue
     * 
     * @summary Continue execution
     * @member BufferExecutor#continueExec
     */
    this.continueExec = true;

    recurseExec(this, () => {
      /**
       * Boolean indicating whether execution is complete
       * 
       * @summary Finished execution
       * @member BufferExecutor#executed
       */
      this.executed = true;
    });
  }
}

export default BufferExecutor;
