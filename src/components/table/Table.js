import CommonComponent from '@core/СommonComponent';
import {createTable} from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import {shouldResize, isCell, nextSelection} from '@/components/table/table.functions';
import TableSelection from '@/components/table/TableSelection';
import selectionHandler from '@/components/table/table.selection';

export default class Table extends CommonComponent {
  static className = 'excel__table';

  /**
   * @param {Dom} $root
   */
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown']
    });
  }

  toHtml() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $defaultSelectedCell = this.$root.find('[data-id="0:0"]');
    this.selection.select($defaultSelectedCell);
  }

  /**
   * Logic for handling mouse-down events
   * @param {MouseEvent} event
   */
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event)) {
      // event.preventDefault();
      selectionHandler(event, this);
    }
  }

  /**
   * Logic for handling keydown events
   * @param {KeyboardEvent} event
   */
  onKeydown(event) {
    const keys = ['ArrowDown', 'ArrowUp', 'Enter', 'ArrowRight', 'ArrowLeft', 'Tab'];
    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.currentCell.id(true);
      const $nextCell = this.$root.find(nextSelection(key, id));
      this.selection.select($nextCell);
    }
  }
}
