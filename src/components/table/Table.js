import CommonComponent from '@core/СommonComponent';
import $ from '@core/dom';
import {createTable} from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import {shouldResize, isCell} from '@/components/table/table.functions';
import TableSelection from '@/components/table/TableSelection';
import {selectionKeyboardHandler, selectionMouseHandler} from '@/components/table/table.selection';

export default class Table extends CommonComponent {
  static className = 'excel__table';

  /**
   * @param {Dom} $root
   * @param {Object} options
   */
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
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
    this.selectCell($defaultSelectedCell);

    this.$on('formula:input', (text) => {
      this.selection.currentCell.setText(text);
    });
    this.$on('formula:done', () => {
      this.selection.currentCell.focus();
    });
  }

  /**
   * Selects a cell
   * @param {Dom} $cell
   */
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  /**
   * Logic for handling mouse-down events
   * @param {MouseEvent} event
   */
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    } else if (isCell(event)) {
      selectionMouseHandler(event, this);
    }
  }

  /**
   * Logic for handling keydown events
   * @param {KeyboardEvent} event
   */
  onKeydown(event) {
    selectionKeyboardHandler(event, this);
  }

  /**
   * Logic for handling input events
   * @param {InputEvent} event
   */
  onInput(event) {
    this.$emit('table:input', $(event.target).getText());
  }
}
