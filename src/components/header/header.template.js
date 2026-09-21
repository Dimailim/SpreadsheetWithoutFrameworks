import {escapeHtml} from '@core/utils';

/**
 * Creates an input element.
 * @param {Object} state
 * @returns {string} HTML markup
 */
function createInput(state) {
  return `
    <input 
        type="text" class="excel__header-title-input" 
        value="${escapeHtml(state.filenameState)}" name="file-name"
        autocomplete="off"
    />
  `;
}

/**
 * Creates a button element.
 * @param {{iconName:string, dataButton:string, title:string}} button
 * @returns {string} HTML markup
 */
function createButton(button) {
  const dataButton = `data-button="${button.dataButton}"`;
  return `
    <div class="button" ${dataButton} title="${button.title}">
        <i class="material-icons" ${dataButton}>${button.iconName}</i>
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
    {iconName: 'delete', dataButton: 'remove', title: 'Remove table'},
    {iconName: 'exit_to_app', dataButton: 'exit', title: 'Exit'}
  ];
  const buttonsElems = buttons.map(createButton).join('');

  header.push(createInput(state));
  header.push(createButtonGroup(buttonsElems));

  return header.join('');
}
