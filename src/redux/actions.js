import {ACTION_TYPES} from './types';

/**
 * Action for table resize.
 * @param {Object} data
 * @returns {{type: ACTION_TYPES, data: Object}}
 */
export function tableResize(data) {
  return {
    type: ACTION_TYPES.TABLE_RESIZE,
    data
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
    data
  };
}

/**
 * Action for changing filename.
 * @param {string} data
 * @returns {{type: ACTION_TYPES|number, data: string}}
 */
export function changeFilename(data) {
  return {
    type: ACTION_TYPES.CHANGE_FILENAME,
    data
  };
}

/**
 * Action for changing cell's styles.
 * @param {Object} data
 * @returns {{type: ACTION_TYPES|number, data: Object}}
 */
export function changeStyles(data) {
  return {
    type: ACTION_TYPES.CURRENT_STYLES,
    data
  };
}

/**
 * Action for applying style to selected cells.
 * @param {ids:string[], value:Object}data
 * @returns {{type: ACTION_TYPES|number, data: *}}
 */
export function applyStyle(data) {
  return {
    type: ACTION_TYPES.APPLY_STYLE,
    data
  };
}
