/**
 * Creates store for redux.
 * @param {Function}rootReducer
 * @param {Object} initialState
 * @returns {{
 * subscribe(Function): {unsubscribe(): void},
 * dispatch({type: string}): void,
 * getState(): *}
 * }
 */
export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  let listeners = [];

  return {
    /**
     * Subscribe new listeners to state changes
     * @param {Function} fn
     * @returns {{unsubscribe(): void}}
     */
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn);
        }
      };
    },
    /**
     * Notify all listeners about state changes
     * @param {{type:ACTION_TYPES}} action
     */
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    /**
     * Return current state
     * @returns {*}
     */
    getState() {
      return JSON.parse(JSON.stringify(state));
    }
  };
}
