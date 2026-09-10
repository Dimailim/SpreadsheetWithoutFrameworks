import {DEFAULT_FILENAME} from '@/constants';

/**
 * Creates input element.
 * @param state
 * @returns {string} HTML markup
 */
function createInput(state) {
  const value =state?.filenameState ? state.filenameState : DEFAULT_FILENAME;
  return `
    <input 
        type="text" class="excel__header-title-input" 
        value="${value}" name="file-name"
    />
  `;
}

/**
 * Creates a button element.
 * @param {{iconName:string}} button
 * @returns {string} HTML markup
 */
function createButton(button) {
  return `
    <div class="button">
        <i class="material-icons">${button.iconName}</i>
    </div>
  `;
}

/**
 * Creates a group of buttons.
 * @param {string} buttons - HTML markup of buttons
 * @returns {string} HTML markup
 */
function createButtonGroup(buttons) {
  return `
    <div>
        ${buttons}
    </div>
  `;
}

/**
 * Creates a header component.
 * @param {Object} state - application state
 * @returns {string} component's HTML markup
 */
export function createHeader(state) {
  const header = [];
  const buttons = [
    {iconName: 'delete'},
    {iconName: 'exit_to_app'}
  ];
  const buttonsElems = buttons.map(createButton).join('');

  header.push(createInput(state));
  header.push(createButtonGroup(buttonsElems));

  return header.join('');
}
