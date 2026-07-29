import CommonComponent from '@core/СommonComponent';
import {createTable} from '@/components/table/table.template';

export default class Table extends CommonComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      /* listeners: ['click', 'mousedown', 'mousemove', 'mouseup']*/
    });
  }

  toHtml() {
    return createTable();
  }

  /* onMousedown(event) {
    console.log('mousedown', event);
  }

  onClick(event) {
    console.log('onClick', event);
  }

  onMousemove(event) {
    console.log('mousemove', event);
  }

  onMouseup(event) {
    console.log('mouseup', event);
  }*/
}
