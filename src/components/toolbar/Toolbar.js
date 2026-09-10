import $ from '@core/dom';
import CommonStateComponent from '@core/CommonStateComponent';
import {createToolbar} from '@/components/toolbar/toolbar.template';
import {DEFAULT_STYLES} from '@/constants';

export default class Toolbar extends CommonStateComponent {
  static className = 'excel__toolbar';

  /**
   * @param {Dom} $root
   * @param {Object} options
   */
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribes: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(DEFAULT_STYLES);
  }

  /**
   * Returns the HTML template of the toolbar.
   * @returns {string}
   */
  get template() {
    return createToolbar(this.state);
  }

  /**
   * Creates HTML markup for the toolbar.
   * @returns {string}
   */
  toHtml() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  /**
   * Logic for handling click events.
   * @param {Event} event
   */
  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }
}
