export default class Emitter {
  constructor() {
    this.listeners = {};
  }

  /**
   * Notifies listeners about an event or notify.
   * @param {string} eventName - The name of the event to emit.
   * @param {...any} args - Additional arguments to pass to the listeners.
   * @example
   * table.emit('table:select', {a: 1});
   */
  emit(eventName, ...args) {
    this.listeners[eventName]?.forEach((listener) => listener(...args));
  }

  /**
   * Subscribes to an event or notify.
   * Adds a new listener.
   * @param {string} eventName - The name of the event to subscribe to.
   * @param {Function} fn - The listener function to add.
   * @returns {Function} - A function to unsubscribe the listener.
   * @example
   * formula.subscribe('formula:focus', () => {});
   */
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter((listener) => listener !== fn);
    };
  }
}

// Testing example how emitter works
/*
const emitter = new Emitter();
const unsubscribe = emitter.subscribe('test', (data) => console.log('Hello it\'s', data));

emitter.emit('test', 42);
setTimeout(() => emitter.emit('test', 'Me after 1 sec'), 1000);
setTimeout(() => unsubscribe(), 2000);
setTimeout(() => emitter.emit('test', 'Me after 4 sec'), 4000);
*/
