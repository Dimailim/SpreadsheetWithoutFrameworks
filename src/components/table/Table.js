import CommonComponent from '@core/СommonComponent';
import {createTable} from '@/components/table/table.template';

export default class Table extends CommonComponent {
  static className = 'excel__table';
  toHtml() {
    return createTable();
  }
}
