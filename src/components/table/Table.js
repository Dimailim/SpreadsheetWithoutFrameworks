import CommonComponent from '@core/СommonComponent';
import {createTable} from '@/components/table/table.template';
import $ from '@core/dom';

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
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $headColumn = $resizer.closest('[data-type="resizable"]');
      const headColumnsCoords = $headColumn.getCoords();
      console.log(headColumnsCoords);

      document.onmousemove = (e) => {
        const delta = e.pageX - headColumnsCoords.right;
        const widthValue = headColumnsCoords.width + delta;
        $headColumn.$nativeElement.style.width = `${widthValue}px`;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }

  /*
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
