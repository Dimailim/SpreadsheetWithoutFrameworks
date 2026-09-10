import Page from '@core/Page';
import {createStore} from '@core/createStore';
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
    console.log(this.params);
    const store = createStore(rootReducer,
        storage('spreadsheet-state'));
    const stateListener = debounce((state) => {
      storage('spreadsheet-state', state);
    }, 300);
    store.subscribe(stateListener);

    this.se = new Spreadsheet({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.se.getRoot();
  }

  afterRender() {
    console.log('SpreadsheetPage rendered');
    this.se.init();
  }

  destroy() {
    this.se.destroy();
  }
}
