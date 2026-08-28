/**
 * Collection of codes for columns.
 * @enum
 */
const CODES = {
  A: 65,
  Z: 90
};

/**
 * Returns inline style with width from localStorage by column index.
 * If the column index has no width in localStorage, it returns empty string.
 * @param {Object} state - data from localStorage
 * @param {number} index - column index
 * @returns {string}
 */
function getWidth(state, index) {
  return state && state[index] ? `style="width:${state[index]}px"` : '';
}

/**
 * Returns inline style with height from localStorage by row index.
 * If the row index has no height in localStorage, it returns empty string.
 * @param {Object} state - data from localStorage
 * @param {number} index - row index
 * @returns {string}
 */
function getHeight(state, index) {
  return state && state[index] ? `style="height:${state[index]}px"` : '';
}

/**
 * Creates row templates in HTML markup.
 * @param {string} content
 * @param {Object} [state] - data from localStorage
 * @param {number} [rowIndex] - a header row number.
 * @returns {string} - HTML markup.
 */
function createRow(content, state, rowIndex) {
  const resize = rowIndex ? `<div class="row-resize" data-resize="row"></div>` : '';
  const dataRow = rowIndex ? `data-row="${rowIndex}"` : '';
  const heightStyle = getHeight(state, rowIndex);

  return `
    <div class="row" data-type="resizable" ${dataRow} ${heightStyle}>
        <div class="row-info">
            ${rowIndex ? rowIndex : ''}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
  `;
}

/**
 * Creates column templates in HTML markup.
 * @param {Object} state - data from localStorage
 * @returns {function(string, number): string} - function that returns HTML markup.
 */
function createColumn(state) {
  return function(content, colIndex) {
    const widthStyle = getWidth(state, colIndex);

    return `
      <div class="column" data-type="resizable" data-col="${colIndex}" ${widthStyle}>
          ${content}
          <div class="column-resize" data-resize="column"></div>
      </div>
    `;
  };
}

/**
 * Creates cell templates in HTML markup.
 * @param {number} rowIndex
 * @param {Object} state - data from localStorage
 * @returns {function(_, number): string} - function that returns HTML markup.
 */
function createCell(rowIndex, state) {
  return function(_, columnIndex) {
    const id = `${rowIndex}:${columnIndex}`;
    const styleWidth = getWidth(state?.colState, columnIndex);
    const content = state && state.dataState && state.dataState[id];
    return `
        <div 
          class="cell" 
          contenteditable="true" 
          data-col="${columnIndex}"
          data-id="${id}"
          data-type="cell"
          ${styleWidth}
        >${content || ''}</div>
    `;
  };
}

/**
 * Converts character code to a character.
 * @param _
 * @param {number} index
 * @returns {string}
 */
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

/**
 * Creates table template in HTML markup.
 * @param {number} rowsCount - total count of rows.
 * @param {object} state - current state of the table.
 * @returns {string} - HTML markup.
 */
export function createTable(rowsCount = 26, state) {
  const colState = state?.colState;
  const rowState = state?.rowState;
  const colCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colCount)
      .fill('')
      .map(toChar)
      .map(createColumn(colState))
      .join('');

  rows.push(createRow(cols));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colCount)
        .fill('')
        .map(createCell(row, state))
        .join('');
    rows.push(createRow(cells, rowState, row + 1));
  }

  return rows.join('');
}
