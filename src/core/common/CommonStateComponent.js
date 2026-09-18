import CommonComponent from '@core/common/СommonComponent';

export default class CommonStateComponent extends CommonComponent {
  constructor(...args) {
    super(...args);
  }

  /**
   * Returns the template of the component.
   * @returns {string}
   */
  get template() {
    return JSON.stringify(this.state, null, 2);
  }

  /**
   * Initializes the state of the component.
   * @param {Object} initialState
   */
  initState(initialState = {}) {
    this.state = {...initialState};
  }

  /**
   * Sets the new state of the component.
   * @param {Object} newState
   */
  setState(newState) {
    this.state = {...this.state, ...newState};
    this.$root.setHtml(this.template);
  }
}
