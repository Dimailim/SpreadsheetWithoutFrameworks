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

  /**
   * Adds style to the DOM element by attribute and value of attribute.
   * @example
   * $header.addStyle('width', '100px');
   * @param {string} attribute
   * @param {string|null} value
   */
  addStyle(attribute, value) {
    this.$nativeElement.style[attribute] = value;

    return this;
  }

  /**
   * Adds CSS style to the DOM element by CSS object
   * @example
   * $header.css({
   *   height: '100px',
   *   backgroundColor: 'red'
   * })
   * @param {Object} styles
   */
  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$nativeElement.style[key] = styles[key];
    });

    return this;
  }

  /**
   * Returns dataset of the element.
   * @returns {DOMStringMap}
   */
  get data() {
    return this.$nativeElement.dataset;
  }

  /**
   * Returns an array of DOM elements by selector.
   * @param selector
   * @returns {NodeListOf<HTMLElementTagNameMap[keyof HTMLElementTagNameMap]>}
   */
  findAll(selector) {
    return this.$nativeElement.querySelectorAll(selector);
  }

  /**
   * Clears inline styles properties of the DOM element.
   * @param {string[]} props - style properties which should be cleared
   * @example
   * $resizer.cssClear(['width', 'height']);
   */
  cssClear(props) {
    props.forEach((prop) => {
      this.$nativeElement.style.removeProperty(prop);
    });
    if (!this.$nativeElement.style.length) {
      this.$nativeElement.removeAttribute('style');
    }
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
