import $ from '@core/dom';
import Emitter from '@core/Emitter';
import StoreSubscriber from '@core/StoreSubscriber';

/**
 * Main application entry point
 * @class Spreadsheet
 */
export default class Spreadsheet {
  /**
   * @param {string} selector
   * @param {{
   * components:[],
   * store: {
   * subscribe(Function): {unsubscribe(): void},
   * dispatch({type: string}): void,
   * getState(): *
   * }
   * }} options
   */
  constructor(selector, options) {
    this.$element = $(selector);
    this.components = options.components || [];
    this.emitter = new Emitter();
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
  }

  /**
   * Returns the root element of the component
   * @returns {Dom}
   */
  getRoot() {
    const $root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };

    this.components = this.components.map((Component) => {
      const $element = $.create('div', Component.className);
      const component = new Component($element, componentOptions);
      $element.setValue(component.toHtml());
      $root.append($element);
      return component;
    });

    return $root;
  }

  /**
   * Adds spreadsheet components to the root DOM element.
   */
  render() {
    this.$element.append(this.getRoot());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  /**
   * Destroys components.
   */
  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
  }
}
