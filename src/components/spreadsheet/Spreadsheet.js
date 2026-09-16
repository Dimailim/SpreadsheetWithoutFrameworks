import $ from '@core/dom';
import Emitter from '@core/Emitter';
import StoreSubscriber from '@core/store/StoreSubscriber';
import * as action from '@/redux/actions';

/**
 * Main spreadsheet editor entry point
 * @class Spreadsheet
 */
export default class Spreadsheet {
  /**
   * @param {{
   * components:CommonComponent[],
   * store: {
   * subscribe(Function): {unsubscribe(): void},
   * dispatch({type: ACTION_TYPES|number, data:Object|string}): void,
   * getState(): Object
   * }
   * }} options
   */
  constructor(options) {
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
   * Initializes component.
   */
  init() {
    this.store.dispatch(action.changeOpenDate(Date.now()));
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach((component) => component.init());
  }

  /**
   * Destroys component.
   */
  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
  }
}
