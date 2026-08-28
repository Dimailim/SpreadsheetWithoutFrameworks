import CommonComponent from '@core/СommonComponent';
import $ from '@core/dom';
import {createTable} from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import {shouldResize, isCell} from '@/components/table/table.functions';
import TableSelection from '@/components/table/TableSelection';
import {selectionKeyboardHandler, selectionMouseHandler} from '@/components/table/table.selection';
import * as actions from '@/redux/actions';

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
    return createTable(26, this.store.getState());
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
      this.updateTextInStore(text);
    });
    this.$on('formula:done', () => {
      this.selection.currentCell.focus();
    });
    /* this.$subscribe((state) => {
      console.log('TableState', state);
    });*/
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
   * Resizes table and saves new sizes of columns or rows in the state.
   * @param {MouseEvent} event
   * @returns {Promise<void>}
   */
  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.error('Resize table error', e);
    }
  }

  /**
   * Updates text in store
   * @param {string} value
   */
  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.currentCell.id(),
      value
    }));
  }

  /**
   * Logic for handling mouse-down events
   * @param {MouseEvent} event
   */
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
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
    // this.$emit('table:input', $(event.target).getText());
    this.updateTextInStore($(event.target).getText());
  }
}
