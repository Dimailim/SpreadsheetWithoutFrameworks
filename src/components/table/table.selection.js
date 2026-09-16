import $ from '@core/dom';
import {cellsRange, nextSelection} from '@/components/table/table.functions';
import parse from '@core/formulaEngine/parse';

/**
 * Logic for cell selection using mouse.
 * @param {MouseEvent} event
 * @param {Table} table
 */
export function selectionMouseHandler(event, table) {
  const $selectedCell = $(event.target);

  if (event.ctrlKey) { // Multiple selection by pressing ctrl
    table.selection.selectGroup($selectedCell);
  } else if (event.shiftKey) { // Multiple selection by pressing shift with range
    const ids = cellsRange($selectedCell, table.selection.currentCell);
    ids.forEach((id) => table.selection.selectGroup(table.$root.find(`[data-id="${id}"]`)));
  } else { // Single selection
    table.selectCell($selectedCell);
  }
}

/**
 * Logic for cell selection using the keyboard.
 * @param {KeyboardEvent} event
 * @param {Table} table
 */
export function selectionKeyboardHandler(event, table) {
  const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'ArrowRight', 'ArrowLeft', 'Tab'];
  const {key} = event;

  if (keys.includes(key) && !event.shiftKey) {
    event.preventDefault();
    // Parsing value for calculating if it's necessary.
    const parsedValue = parse(table.selection.currentCell.data.value);
    table.selection.currentCell.setText(parsedValue);
    // Selecting to next cell
    const id = table.selection.currentCell.id(true);
    const $nextCell = table.$root.find(nextSelection(key, id));
    table.selectCell($nextCell);
  }
}
