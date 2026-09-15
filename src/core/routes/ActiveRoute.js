/**
 * Static class for interacting with the current route.
 * @class ActiveRoute
 */
export default class ActiveRoute {
  /**
   * Returns the current path of the application.
   * @returns {string}
   */
  static get path() {
    return window.location.hash.slice(1);
  }

  /**
   * Returns the parameter of the current route.
   * @returns {string}
   */
  static get param() {
    return ActiveRoute.path.split('/')[1];
  }

  /**
   * Changes url hash to the specified path.
   * @param {string} path
   */
  static navigate(path) {
    window.location.hash = path;
  }
}
