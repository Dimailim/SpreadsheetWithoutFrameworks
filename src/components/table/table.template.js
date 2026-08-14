const CODES = {
  A: 65,
  Z: 90
};

/**
 * Creates row templates in HTML markup.
 * @param {string} content
 * @param {number} [rowIndex] - a header row number.
 * @returns {string} - HTML markup.
 */
function createRow(content, rowIndex) {
  const resize = rowIndex ? `<div class="row-resize" data-resize="row"></div>` : '';
  return `
    <div class="row" data-type="resizable">
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
 * @param {string} content
 * @param {number} colIndex
 * @returns {string} - HTML markup.
 */
function createColumn(content, colIndex) {
  return `
    <div class="column" data-type="resizable" data-col="${colIndex}">
        ${content}
        <div class="column-resize" data-resize="column"></div>
    </div>
  `;
}

/**
 * Creates cell templates in HTML markup.
 * @param {number} rowIndex
 * @returns {function(_, number): string} - HTML markup.
 */
function createCell(rowIndex) {
  return function(_, columnIndex) {
    return `
        <div 
          class="cell" 
          contenteditable="true" 
          data-col="${columnIndex}"
          data-id="${rowIndex}:${columnIndex}"
          data-type="cell"
        ></div>
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
 * @returns {string} - HTML markup.
 */
export function createTable(rowsCount = 26) {
  const colCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colCount)
      .fill('')
      .map(toChar)
      .map(createColumn)
      .join('');

  rows.push(createRow(cols));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colCount)
        .fill('')
        .map(createCell(row))
        .join('');
    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}
