import CommonComponent from '@core/СommonComponent';
import $ from '@core/dom';

export default class Formula extends CommonComponent {
  static className = 'excel__formula';

  /**
   * @param {Dom} $root
   */
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
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
      <div class="formula-input" contenteditable="true" spellcheck="false" id="formula-input">
      </div>
    `;
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula-input');

    this.$on('table:select', ($selectedCell) => {
      this.$formula.setText($selectedCell.getText());
    });
    this.$on('table:input', (text) => {
      this.$formula.setText(text);
    });
  }

  /**
   * Callback method for component listener.
   * @param {Event} event
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
