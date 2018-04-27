import errors from '../dev/errors';

/**
 * `U2D.dev.EventManager`: Manages events so that they can be added and fired easily
 * 
 * @summary Event controller
 */
class EventManager {
  /**
   * Creates a new EventManager that accepts a list of events
   * 
   * @param {string[]} eventList List of recognized events
   */
  constructor(eventList) {
    /**
     * List of recognized events. Any event added that is not mentioned in this list will throw an error
     * 
     * @summary Recognized events
     * @member {string[]} EventManager#eList
     */
    this.eList = eventList;

    /**
     * List of event handlers that are called each time an event occurs. Handlers are stored in an object where the key is the name of the event and the value is the list of functions that should be called when the event fires.
     * 
     * @summary Event handlers
     * @member {object} EventManager#eHandlers
     */
    this.eHandlers = {};

    for (let e of this.eList) {
      this.eHandlers[e] = [];
    }
  }

  /**
   * Add a new event handler to the list of event handlers
   * 
   * @summary Add an event handler
   * @param {string} e Recognized event name
   * @param {function} handler Event handler
   */
  on(e, handler) {
    if (this.eList.includes(e)) {
      if (typeof handler === "function") {
        this.eHandlers[e].push(handler);
      } else {
        throw errors.invalidArguments(['string', 'function'], arguments);
      }
    } else {
      throw errors.inexistent('event', 'list of registered events');
    }
  }

  /**
   * Add a new event to the list of registered events so that it can be accessed through {@link EventManager#on|`on`}
   * 
   * @summary Register a new event
   * @param {string} name Name of the new event to be registered
   */
  register(name) {
    this.eList.push(name);
    this.eHandlers[name] = [];
  }

  /**
   * Fires all event handlers attached to a certain event
   * 
   * @summary Fire event
   * @param {string} e Event name
   * @param {object[]} args Arguments to be passed to the handler
   */
  fire(e, ...args) {
    for (let handler of this.eHandlers[e]) {
      handler(...args);
    }
  }
}

export default EventManager;
