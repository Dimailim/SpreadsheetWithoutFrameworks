import {ACTION_TYPES} from './types';

/**
 * Action for table resize.
 * @param {{id: string, value: number, type: string}} data
 * @returns {{type: ACTION_TYPES, data: {id: string, value: number, type: string}}}
 */
export function tableResize(data) {
  return {
    type: ACTION_TYPES.TABLE_RESIZE,
    data
  };
}

/**
 * Action for changing text.
 * @param {{id:string, value: string}} data
 * @returns {{type: ACTION_TYPES|number, data: {id:string, value: string}}}
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
 * @param {{[styleAttr:string]:string}} data
 * @returns {{type: ACTION_TYPES|number, data: {[styleAttr:string]:string}}}
 */
export function changeStyles(data) {
  return {
    type: ACTION_TYPES.CURRENT_STYLES,
    data
  };
}

/**
 * Action for applying style to selected cells.
 * @param {{ids:string[], value: {[styleAttr:string]:string}}}data
 * @returns {{type: ACTION_TYPES|number, data: {ids:string[], value: {[styleAttr:string]:string}}}}
 */
export function applyStyle(data) {
  return {
    type: ACTION_TYPES.APPLY_STYLE,
    data
  };
}

/**
* Action for changing the open date.
* @param data
* @returns {{type: ACTION_TYPES|number, data: number}}
*/
export function changeOpenDate(data) {
  return {
    type: ACTION_TYPES.OPEN_DATE,
    data
  };
}
