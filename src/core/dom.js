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
  setHtml(html) {
    this.$nativeElement.innerHTML = html;
    return this;
  }

  /**
   * Sets text data to a DOM element.
   * @param {string} text
   * @returns {Dom}
   */
  setText(text) {
    if (this.$nativeElement.tagName.toLowerCase() === 'input') {
      this.$nativeElement.value = text;
    } else {
      this.$nativeElement.textContent = text;
    }
    return this;
  }

  /**
   * Returns HTML markup data from a DOM element.
   * @returns {string}
   */
  getHtml() {
    return this.$nativeElement.outerHTML.trim();
  }

  /**
   * Returns text data from a DOM element.
   * @returns {string}
   */
  getText() {
    if (this.$nativeElement.tagName.toLowerCase() === 'input') {
      return this.$nativeElement.value.trim();
    }

    return this.$nativeElement.textContent.trim();
  }

  /**
   * Clears HTML markup data from a DOM element.
   * @returns {Dom}
   */
  clear() {
    this.setHtml('');
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
   * @param {{[attr:string]:string}} styles
   */
  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$nativeElement.style[key] = styles[key];
    });

    return this;
  }

  /**
   * Returns inline styles of the element which are specified in the style array.
   * @param {string[]} styles
   * @returns {{[key: string]: string;}}
   */
  getStyles(styles = []) {
    return styles.reduce((res, style) => {
      res[style] = this.$nativeElement.style[style];
      return res;
    }, {});
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

    return this;
  }

  /**
   * Returns found DOM element by selector.
   * @param {string} selector
   * @returns {Dom}
   */
  find(selector) {
    return $(this.$nativeElement.querySelector(selector));
  }

  /**
   * Adds a class to a DOM element.
   * @param {string} className
   */
  addClass(className) {
    this.$nativeElement.classList.add(className);

    return this;
  }

  /**
   * Removes class from the DOM element.
   * @param {string} className
   */
  removeClass(className) {
    this.$nativeElement.classList.remove(className);

    return this;
  }

  /**
   * Returns id of a cell DOM element.
   * @param {boolean} [parsed] - if true, returns an object with row and col numbers
   * @returns {{row: number, col: number}|string}
   */
  id(parsed) {
    if (parsed) {
      const id = this.id().split(':');
      return {
        row: +id[0],
        col: +id[1]
      };
    }

    return this.data.id;
  }

  /**
   * Focuses on the DOM element.
   * @returns {Dom}
   */
  focus() {
    this.$nativeElement.focus();
    return this;
  }

  /**
   * Sets new meta-attribute for the DOM element.
   * @param {string} name - attribute's name.
   * @param {string} value
   * @returns {Dom}
   */
  setAttribute(name, value) {
    this.$nativeElement.setAttribute(name, value);
    return this;
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
