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

/**
 * Manages local storage.
 * @param {string} key - key for localStorage
 * @param {Object} [data] - data that will be saved in localStorage
 * @returns {Object}
 */
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Checks if two data are equal.
 * @param {*} sourceData
 * @param {*} currentData
 */
export function isEqual(sourceData, currentData) {
  if (typeof sourceData === 'object' && typeof currentData === 'object') {
    return JSON.stringify(sourceData) === JSON.stringify(currentData);
  }

  return sourceData === currentData;
}

/**
 * Checks if a style object has empty values.
 * @param {{[styleAttr:string]:string}} styles
 * @returns {boolean}
 */
export function isStylesEmpty(styles) {
  return Object.values(styles).every((value) => value === '');
}

/**
 * Converts camelCase to a dash-case.
 * @param {string} str camelCase string
 * @returns {string} dash-case string
 */
export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

/**
 * Converts a style object to inline styles.
 * @param {{[styleAttr:string]:string}} styles
 * @returns {string} formatted inline styles
 */
export function toInlineStyles(styles = {}) {
  return Object.keys(styles).map((key) => `${camelToDashCase(key)}:${styles[key]}`).join(';');
}

/**
 * Postpones calling the callback function until the waiting timer to prevent spam of frequent events.
 * @param {function} fn - callback function
 * @param {number} wait - waiting until exec function in mc.
 * @returns {Function}
 */
export function debounce(fn, wait) {
  let timeout = null;

  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      clearTimeout(timeout);
      // this uses for saving context of wrapped method
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
    }, wait);
  };
}

/**
 * Returns a string with a date and time in the format 'dd.mm.yyyy hh:mm:ss'.
 * @param {Date} date
 * @returns {string}
 */
export function formatDateTime(date) {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

/**
 * Replaces unsafe symbols for HTML to safe one.
 * @param {string} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
}
