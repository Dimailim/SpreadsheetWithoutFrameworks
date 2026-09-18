/**
 * Creates a button element.
 * @param {{
 * iconName:string,
 * active:boolean,
 * value:{Object},
 * title:string
 * }} button - button's properties'
 * @returns {string} - HTML markup of a button
 */
function createButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `;
  return `
    <div 
    class="button ${button.active ? 'active' : ''}"
    ${meta}
    title="${button.title}"
    >
        <i class="material-icons" ${meta}>${button.iconName}</i>
    </div>
  `;
}

/**
 * Creates a group of buttons.
 * @param {string} buttons - HTML markup of buttons
 * @returns {string} - HTML markup of a group of buttons
 */
function createButtonGroup(buttons) {
  return `
    <div class="button-group">
        ${buttons}
    </div>
  `;
}

/**
 * Creates a toolbar component.
 * @param {Object} state - component state
 * @returns {string} component's HTML markup
 */
export function createToolbar(state) {
  const toolbar = [];
  const groupButtons = {
    align: [
      {
        iconName: 'format_align_left',
        active: state.textAlign === 'left',
        title: 'Align left',
        value: {textAlign: 'left'}
      },
      {
        iconName: 'format_align_center',
        active: state.textAlign === 'center',
        title: 'Align center',
        value: {textAlign: 'center'}
      },
      {
        iconName: 'format_align_right',
        active: state.textAlign === 'right',
        title: 'Align right',
        value: {textAlign: 'right'}
      },
    ],
    fontStyle: [
      {
        iconName: 'format_bold',
        active: state.fontWeight === 'bold',
        title: 'Bold',
        value: {fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold'}
      },
      {
        iconName: 'format_italic',
        active: state.fontStyle === 'italic',
        title: 'Italic',
        value: {fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic'}
      },
      {
        iconName: 'format_underlined',
        active: state.textDecoration === 'underline',
        title: 'Underline',
        value: {textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline'}
      },
      {
        iconName: 'format_strikethrough',
        active: state.textDecoration === 'line-through',
        title: 'Strikethrough',
        value: {textDecoration: state.textDecoration === 'line-through' ? 'none' : 'line-through'}
      }
    ]
  };

  Object.keys(groupButtons).forEach((group) => {
    const buttons = groupButtons[group];
    const buttonGroup = createButtonGroup(buttons.map(createButton).join(''));
    toolbar.push(buttonGroup);
  });

  return toolbar.join('');
}
