import {ACTION_TYPES} from './types';

/**
 * Creates root reducer for redux.
 * @param {Object} state
 * @param {{type:ACTION_TYPES, data:Object}} action
 * @returns {*}
 */
export default function rootReducer(state, action) {
  let currentColState;
  switch (action.type) {
    case ACTION_TYPES.TABLE_RESIZE:
      currentColState = state.colState || {};
      currentColState[action.data.id] = action.data.value;
      return {...state, colState: currentColState};
    default: return state;
  }
}
