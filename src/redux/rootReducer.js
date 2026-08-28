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
    case ACTION_TYPES.CHANGE_TEXT:
      currentState = state['dataState'] || {};
      currentState[action.data.id] = action.data.value;
      return {...state, currentText: action.data.value, dataState: currentState};
    default:
      return state;
  }
}
