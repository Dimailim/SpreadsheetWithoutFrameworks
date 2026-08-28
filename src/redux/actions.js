import {ACTION_TYPES} from './types';

/**
 * Action for table resize.
 * @param {Object} data
 * @returns {{type: ACTION_TYPES, data: Object}}
 */
export function tableResize(data) {
  return {
    type: ACTION_TYPES.TABLE_RESIZE,
    data,
  };
}

/**
 * Action for changing text.
 * @param {Object} data
 * @returns {{type: ACTION_TYPES|number, data: Object}}
 */
export function changeText(data) {
  return {
    type: ACTION_TYPES.CHANGE_TEXT,
    data,
  };
}
