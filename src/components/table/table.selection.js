import $ from '@core/dom';
import {cellsRange} from '@/components/table/table.functions';

/**
 * Logic for cell selection.
 * @param {MouseEvent} event
 * @param {Table} table
 */
export default function selectionHandler(event, table) {
  const $selectedCell = $(event.target);

  if (event.ctrlKey) { // Multiple selection by pressing ctrl
    table.selection.selectGroup($selectedCell);
  } else if (event.shiftKey) { // Multiple selection by pressing shift with range
    const ids = cellsRange($selectedCell, table.selection.currentCell);
    ids.forEach((id) => table.selection.selectGroup(table.$root.find(`[data-id="${id}"]`)));
  } else { // Single selection
    table.selection.select($selectedCell);
  }
}
