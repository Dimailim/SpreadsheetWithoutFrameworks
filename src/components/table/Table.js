import CommonComponent from '@core/СommonComponent';
import {createTable} from '@/components/table/table.template';
import resizeHandler from '@/components/table/table.resize';
import {shouldResize} from '@/components/table/table.functions';

export default class Table extends CommonComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  toHtml() {
    return createTable();
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root);
    }
  }
}
