import Page from '@core/common/Page';
import {createStore} from '@core/store/createStore';
import rootReducer from '@/redux/rootReducer';

// Components
import Spreadsheet from '@/components/spreadsheet/Spreadsheet';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import StateProcessor from '@core/store/StateProcessor';
import LocalStorageClient from '@/shared/LocalStorageClient';

export default class SpreadsheetPage extends Page {
  constructor(params) {
    super(params);

    this.storeSub = null;
    this.processor = new StateProcessor(new LocalStorageClient(this.params));
  }

  async getRoot() {
    const state = await this.processor.get();
    const store = createStore(rootReducer, state);
    this.storeSub = store.subscribe(this.processor.listen);

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
    this.storeSub.unsubscribe();
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
