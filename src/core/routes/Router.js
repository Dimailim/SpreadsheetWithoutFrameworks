import $ from '@core/dom';
import ActiveRoute from '@core/routes/ActiveRoute';
import Loader from '@/components/Loader';

export default class Router {
  /**
   * @param {string} selector
   * @param {Object} routes
   */
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }
    this.$placeholder = $(selector);
    this.routes = routes;
    this.loader = new Loader();
    this.changePageHandler = this.changePageHandler.bind(this);
    this.page = null;

    this.init();
  }

  /**
   * Initializes router
   */
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  /**
   * Logic for handling hash change event listener.
   */
  async changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear().append(this.loader);

    const DEFAULT_PAGE = 'dashboard';
    const path = ActiveRoute.path;
    const Page = path.includes('spreadsheet') ? this.routes[path.split('/')[0]] : this.routes[DEFAULT_PAGE];
    this.page = new Page(ActiveRoute.param);

    const root = await this.page.getRoot();
    this.$placeholder.clear().append(root);
    this.page.afterRender();
  }

  /**
   * Destroys router
   */
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
