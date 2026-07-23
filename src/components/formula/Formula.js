import CommonComponent from '@core/СommonComponent';

export default class Formula extends CommonComponent {
  static className = 'excel__formula';

  /**
   * @param {Dom} $root
   */
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input']
    });
  }

  /**
   * Creates HTML markup for the formula component.
   * @returns {string}
   */
  toHtml() {
    return `
      <div class="formula-info">fx</div>
      <div class="formula-input" contenteditable="true" spellcheck="false">
      </div>
    `;
  }

  /**
   * Callback method for component listener.
   * @param {Event} event
   */
  onInput(event) {
    console.log('Formula onInput', event);
  }
}
