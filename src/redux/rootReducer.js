import {ACTION_TYPES} from './types';

/**
 * Creates root reducer for redux.
 * @param {Object} state
 * @param {{type:ACTION_TYPES, data:Object}} action
 * @returns {*}
 */
export default function rootReducer(state, action) {
  let currentState;
  let stateType;

  switch (action.type) {
    case ACTION_TYPES.TABLE_RESIZE:
      stateType = action.data.type === 'column' ? 'colState' : 'rowState';
      currentState = state[stateType] || {};
      currentState[action.data.id] = action.data.value;
      return {...state, [stateType]: currentState};
    default: return state;
  }
}
