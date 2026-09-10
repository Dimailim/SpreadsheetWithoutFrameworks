import {ACTION_TYPES} from './types';

/**
 * Creates and fill application state.
 * @param {Object} state - application state.
 * @param {{type:ACTION_TYPES, data:Object}} action - new data for state.
 * @returns {Object} - new state.
 */
export default function rootReducer(state, action) {
  let stateType;
  switch (action.type) {
    case ACTION_TYPES.TABLE_RESIZE:
      stateType = action.data.type === 'column' ? 'colState' : 'rowState';
      return {...state, [stateType]: updateCurrentState(state, stateType, action.data)};
    case ACTION_TYPES.CHANGE_TEXT:
      stateType = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [stateType]: updateCurrentState(state, stateType, action.data)
      };
    case ACTION_TYPES.CHANGE_FILENAME:
      return {...state, filenameState: action.data};
    case ACTION_TYPES.CURRENT_STYLES:
      return {...state, currentStyles: action.data};
    case ACTION_TYPES.APPLY_STYLE:
      stateType = 'stylesState';
      return {
        ...state,
        [stateType]: updateCurrentState(state, stateType, action.data),
        currentStyles: {...state.currentStyles, ...action.data.value}
      };
    default:
      return state;
  }
}

/**
 * Updates current state of the application.
 * @param {Object} state - current application state before new changes.
 * @param {string} field - field name in the application state which need to be updated.
 * @param {{id:string|string[], value:*}} data - new data for the field.
 * @returns {Object}
 */
function updateCurrentState(state, field, data) {
  const currentState = state[field] || {};

  if (Array.isArray(data.id)) {
    data.id.forEach((id) => {
      currentState[id] = {...currentState[id], ...data.value};
    });
  } else {
    currentState[data.id] = data.value;
  }

  return currentState;
}
