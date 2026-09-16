import Page from '@core/common/Page';
import {createStore} from '@core/store/createStore';
import {debounce, storage} from '@core/utils';
import rootReducer from '@/redux/rootReducer';

// Components
import Spreadsheet from '@/components/spreadsheet/Spreadsheet';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';

export default class SpreadsheetPage extends Page {
  getRoot() {
    const store = createStore(rootReducer,
        storage(this.storageName()));
    const stateListener = debounce((state) => {
      storage(this.storageName(), state);
    }, 300);
    store.subscribe(stateListener);

    this.se = new Spreadsheet({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.se.getRoot();
  }

  afterRender() {
    this.se.init();
  }

  destroy() {
    this.se.destroy();
  }

  /**
   * Returns the name of the storage according to the params for the current page.
   * @returns {string}
   */
  storageName() {
    const id = this.params ? this.params : Date.now().toString();
    return `spreadsheet:${id}`;
  }
}
