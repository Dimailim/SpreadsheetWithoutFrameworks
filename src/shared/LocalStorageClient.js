import CommonClient from '@/shared/CommonClient';
import {storage} from '@core/utils';

export default class LocalStorageClient extends CommonClient {
  constructor(name) {
    super();
    this.name = this.storageName(name);
  }

  save(state) {
    storage(this.name, state);

    return Promise.resolve();
  }

  get() {
    return new Promise((resolve) => resolve(storage(this.name)));
  }

  /**
   * Returns the name of the storage according to the params for the current page.
   * @returns {string}
   */
  storageName(name) {
    return `spreadsheet:${name}`;
  }
}
