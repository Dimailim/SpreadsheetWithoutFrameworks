import CommonComponent from '@core/common/СommonComponent';
import $ from '@core/dom';
import {createHeader} from '@/components/header/header.template';
import * as actions from '@/redux/actions';
import {debounce} from '@core/utils';
import {DEFAULT_FILENAME} from '@/constants';
import ActiveRoute from '@core/routes/ActiveRoute';

export default class Header extends CommonComponent {
  static className = 'excel__header';

  /**
   * @param {Dom} $root
   * @param {{
   * emitter:Emitter,
   * store: {
   * subscribe(Function): {unsubscribe(): void},
   * dispatch({type: ACTION_TYPES|number, data:*}): void,
   * getState(): Object
   * }
   * }} options
   */
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300);
    if (!this.store.getState().filenameState) {
      this.$dispatch(actions.changeFilename(DEFAULT_FILENAME));
    }
  }

  toHtml() {
    return createHeader(this.store.getState());
  }

  /**
   * Logic for handling input event
   * @param {InputEvent} event
   */
  onInput(event) {
    this.$dispatch(actions.changeFilename($(event.target).getText()));
  }

  /**
   * Logic for handling click event
   * @param {MouseEvent} event
   */
  onClick(event) {
    const dataButton = $(event.target).data.button;
    if (dataButton === 'exit') {
      ActiveRoute.navigate('#');
    } else if (dataButton === 'remove') {
      const needRemove = confirm('Are you sure you want to remove the file?');
      if (needRemove) {
        localStorage.removeItem(`spreadsheet:${ActiveRoute.param}`);
        ActiveRoute.navigate('#');
      }
    }
  }
}
