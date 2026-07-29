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
  const resize = rowIndex ? `<div class="row-resize"></div>` : ''
  return `
    <div class="row">
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
 * @returns {string} - HTML markup.
 */
function createColumn(content) {
  return `
    <div class="column">
        ${content}
        <div class="column-resize"></div>
    </div>
  `;
}

/**
 * Creates cell templates in HTML markup.
 * @returns {string} - HTML markup.
 */
function createCell() {
  return `<div class="cell" contenteditable="true"></div>`;
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
  for (let row = 1; row <= rowsCount; row++) {
    const cells = new Array(colCount)
        .fill('')
        .map(createCell)
        .join('');
    rows.push(createRow(cells, row));
  }

  return rows.join('');
}
