function createButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `;
  return `
    <div 
    class="button ${button.active ? 'active' : ''}"
    ${meta}
    >
        <i class="material-icons" ${meta}>${button.iconName}</i>
    </div>
  `;
}

/**
 * Creates a toolbar component.
 * @param {Object} state - component state
 * @returns {string} component's HTML markup
 */
export function createToolbar(state) {
  const buttons = [
    {
      iconName: 'format_align_left',
      active: state.textAlign === 'left',
      value: {textAlign: 'left'}
    },
    {
      iconName: 'format_align_center',
      active: state.textAlign === 'center',
      value: {textAlign: 'center'}
    },
    {
      iconName: 'format_align_right',
      active: state.textAlign === 'right',
      value: {textAlign: 'right'}
    },
    {
      iconName: 'format_bold',
      active: state.fontWeight === 'bold',
      value: {fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold'}
    },
    {
      iconName: 'format_italic',
      active: state.fontStyle === 'italic',
      value: {fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic'}
    },
    {
      iconName: 'format_underlined',
      active: state.textDecoration === 'underline',
      value: {textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline'}
    }
  ];
  return buttons.map(createButton).join('');
}
