// Pure functions
/**
 * Capitalizes the first letter of a string
 * @param {string} string
 * @returns {string}
 */
export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Decorator that throttles the call each new wrapped function by delaying the new one to N mc.
 * @param {Function} func
 * @param {number} delay
 * @returns {(function(...[*]): void)}
 * @example
 * const throttledFunction = throttle(scrollEventHandler, 1000);
 * document.addEventListener('scroll', throttledFunction);
 */
export function throttle(func, delay) {
  let isThrottle = false;

  return function(...args) {
    if (isThrottle) {
      return;
    }
    // this uses for saving context of wrapped method
    // eslint-disable-next-line no-invalid-this
    func.apply(this, args);
    isThrottle = true;
    setTimeout(() => {
      isThrottle = false;
    }, delay);
  };
}

/**
 * Creates an array of numbers from start to end numbers.
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1)
      .fill(null)
      .map((_, index) => start + index);
}
