import {range} from '@core/utils';

/**
 * Checks if the event target is a resize handle.
 * @param {Event} event
 * @returns {string}
 */
export function shouldResize(event) {
  return event.target.dataset.resize;
}

/**
 * Checks if the event target is a cell.
 * @param event
 * @returns {boolean}
 */
export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

/**
 * Returns a range of selected cells' ids.
 * @param {Dom} $target
 * @param {Dom} $current
 * @returns {string[]}
 */
export function cellsRange($target, $current) {
  const targetId = $target.id(true);
  const currentId = $current.id(true);
  const cols = range(currentId.col, targetId.col);
  const rows = range(currentId.row, targetId.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

/**
 * Selects the next cell based on the key pressed.
 * @param {string} key
 * @param {row:number, col:number} id
 * @returns {string}
 */
export function nextSelection(key, id) {
  const MIN_VALUE = 0;
  const MAX_VALUE = 25;

  let {row, col} = id;

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > MAX_VALUE ? MAX_VALUE : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > MAX_VALUE ? MAX_VALUE : col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row -1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
