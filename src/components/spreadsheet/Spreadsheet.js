import $ from '@core/dom';

/**
 * Main application entry point
 * @class Spreadsheet
 */
export default class Spreadsheet {
  /**
   * @param {string} selector
   * @param {{components:[]}} options
   */
  constructor(selector, options) {
    this.$element = $(selector);
    this.components = options.components || [];
  }

  /**
   * Returns the root element of the component
   * @returns {Dom}
   */
  getRoot() {
    const $root = $.create('div', 'excel');

    this.components = this.components.map((Component) => {
      const $element = $.create('div', Component.className);
      const component = new Component($element);
      $element.setValue(component.toHtml());
      $root.append($element);
      console.log(component);
      return component;
    });

    return $root;
  }

  /**
   * Adds spreadsheet components to the root DOM element.
   */
  render() {
    this.$element.append(this.getRoot());
    this.components.forEach((component) => component.init());
  }

  /**
   * Destroys component listeners.
   */
  unMount() {
    this.components.forEach((component) => component.destroy());
  }
}
