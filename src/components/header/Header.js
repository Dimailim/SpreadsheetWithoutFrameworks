import CommonComponent from '@core/СommonComponent';
import $ from '@core/dom';
import {createHeader} from '@/components/header/header.template';
import * as actions from '@/redux/actions';
import {debounce} from '@core/utils';

export default class Header extends CommonComponent {
  static className = 'excel__header';

  /**
   * @param {Dom} $root
   * @param {Object} options
   */
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHtml() {
    return createHeader(this.store.getState());
  }

  /**
   * Logic for handling input event
   * @param {InputEvent} event
   */
  onInput(event) {
    console.log(event);
    this.$dispatch(actions.changeFilename($(event.target).getText()));
  }
}
