import {isEqual} from '@core/utils';

/**
 * This class subscribes to store changes for the given components.
 * @class StoreSubscriber
 */
export default class StoreSubscriber {
  /**
   * @param {{
   * subscribe(Function): {unsubscribe(): void},
   * dispatch({type: ACTION_TYPES|number, data:*}): void,
   * getState(): Object
   * }} store
   */
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.prevState = {};
  }

  /**
   * Subscribes to store changes for the given components.
   * @param {CommonComponent[]} components
   */
  subscribeComponents(components) {
    this.prevState = this.store.getState();

    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach((component) => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]};
              component.storeChanged(changes);
            }
          });
        }
      });
      this.prevState = this.store.getState();
    });
  }

  /**
   * Unsubscribes from store changes for the given components.
   */
  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}
