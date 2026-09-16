import {toInlineStyles} from '@core/utils';
import {DEFAULT_STYLES} from '@/constants';
import parse from '@core/formulaEngine/parse';

/**
 * Collection of codes for columns.
 * @enum
 */
const CODES = {
  A: 65,
  Z: 90
};

/**
 * Returns value of inline style with width from localStorage by column index.
 * If the column index has no width in localStorage, it returns empty string.
 * @param {Object} state - data from localStorage
 * @param {number} index - column index
 * @returns {string}
 */
function getWidth(state, index) {
  return state && state[index] ? `width:${state[index]}px` : '';
}

/**
 * Returns value of inline style with height from localStorage by row index.
 * If the row index has no height in localStorage, it returns empty string.
 * @param {Object} state - data from localStorage
 * @param {number} index - row index
 * @returns {string}
 */
function getHeight(state, index) {
  return state && state[index] ? `height:${state[index]}px` : '';
}

/**
 * Returns value of inline style with styles from localStorage by cell id.
 * If the cell id has no styles in localStorage, it returns empty string.
 * @param {Object} state - data from localStorage
 * @param {string} id - cell id
 * @returns {string}
 */
function getCellStyles(state, id) {
  return state && state[id] ? `${toInlineStyles({...DEFAULT_STYLES, ...state[id]})}` : '';
}

/**
 * Returns inline style.
 * @param {string[]} styles - array of values of style
 * @returns {string} - inline style for an HTML element.
 */
function getInlineStyle(styles) {
  styles = styles.filter((style) => style);

  if (styles.length) {
    const stylesValues = styles.join(';');
    return `style="${stylesValues}"`;
  }

  return '';
}

/**
 * Returns data-value meta-attribute.
 * If the content is empty, it returns an empty string.
 * @param {string} content
 * @returns {string}
 */
function getDataValue(content) {
  return content ? `data-value="${content}"` : '';
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
  const heightStyleVal = getHeight(state, rowIndex);
  const style = heightStyleVal && getInlineStyle([heightStyleVal]);

  return `
    <div class="row" data-type="resizable" ${dataRow} ${style}>
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
    const widthStyleVal = getWidth(state, colIndex);
    const style = widthStyleVal && getInlineStyle([widthStyleVal]);

    return `
      <div class="column" data-type="resizable" data-col="${colIndex}" ${style}>
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
    const cellStyle = getCellStyles(state?.stylesState, id);
    const style = (styleWidth || cellStyle) && getInlineStyle([styleWidth, cellStyle]);
    return `
        <div 
          class="cell" 
          contenteditable="true" 
          data-col="${columnIndex}"
          data-id="${id}"
          data-type="cell"
          ${getDataValue(content)}"
          ${style}
        >${parse(content) || ''}</div>
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
