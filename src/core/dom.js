class Dom {
  /**
   * @param {string|Object} selector
   */
  constructor(selector) {
    /** @type {Element}*/
    this.$nativeElement = typeof selector === 'string' ? document.querySelector(selector) : selector;
  }

  /**
   * Sets HTML markup data to a DOM element.
   * @param {string} html
   * @returns {Dom}
   */
  setValue(html) {
    this.$nativeElement.innerHTML = html;
    return this;
  }

  /**
   * Returns HTML markup data from a DOM element.
   * @returns {string}
   */
  getValue() {
    return this.$nativeElement.outerHTML.trim();
  }

  /**
   * Clears HTML markup data from a DOM element.
   * @returns {Dom}
   */
  clear() {
    this.setValue('');
    return this;
  }

  /**
   * Adds DOM element to root DOM element.
   * @param {Element|Dom} node
   * @returns {Dom}
   */
  append(node) {
    if (node instanceof Dom) {
      node = node.$nativeElement;
    }

    if (Element.prototype.append) {
      this.$nativeElement.append(node);
    } else {
      this.$nativeElement.appendChild(node);
    }

    return this;
  }

  /**
   * Adds event listener to DOM element.
   * @param {string} eventType
   * @param {Function} callback
   */
  on(eventType, callback) {
    this.$nativeElement.addEventListener(eventType, callback);
  }

  /**
   * Removes event listener from DOM element.
   * @param {string} eventType
   * @param {Function} callback
   */
  off(eventType, callback) {
    this.$nativeElement.removeEventListener(eventType, callback);
  }

  /**
   * Finds the closest parent element by selector.
   * @param {string} selector
   * @returns {Dom}
   */
  closest(selector) {
    return $(this.$nativeElement.closest(selector));
  }

  /**
   * Returns the coordinates of the element.
   * @returns {DOMRect}
   */
  getCoords() {
    return this.$nativeElement.getBoundingClientRect();
  }
}

/**
 * @param {string|Object} selector
 * @returns {Dom}
 */
export default function $(selector) {
  return new Dom(selector);
}
/**
 * Create a new HTML element in DOM.
 * @param {string} tagName
 * @param {string} classes
 * @returns {Dom}
 */
$.create = (tagName, classes = '') => {
  const element = document.createElement(tagName);

  if (classes) {
    element.classList.add(classes);
  }

  return $(element);
};
