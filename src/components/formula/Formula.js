import CommonComponent from '@core/СommonComponent';
import $ from '@core/dom';

export default class Formula extends CommonComponent {
  static className = 'excel__formula';

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
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribes: ['currentText'],
      ...options
    });
  }

  /**
   * Creates HTML markup for the formula component.
   * @returns {string}
   */
  toHtml() {
    return `
      <div class="formula-info">fx</div>
      <input class="formula-input" spellcheck="false" id="formula-input"/>
    `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula-input');

    this.$on('table:select', ($selectedCell) => {
      const dataValue = $selectedCell.data.value || '';
      this.$formula.setText(dataValue);
    });
  }

  storeChanged({currentText}) {
    this.$formula.setText(currentText);
  }

  /**
   * Callback method for handling input event.
   * @param {InputEvent} event
   */
  onInput(event) {
    this.$emit('formula:input', $(event.target).getText());
  }

  /**
   * Callback method for a keydown event.
   * @param {KeyboardEvent} event
   */
  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    const {key} = event;

    if (keys.includes(key) && !event.ctrlKey) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
