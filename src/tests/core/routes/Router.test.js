import Router from '@core/routes/Router';
import Page from '@core/common/Page';
import 'jest-location-mock';

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = '<h1>Dashboard</h1>';

    return root;
  }
}
class SpreadsheetPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = '<h1>Spreadsheet</h1>';

    return root;
  }
}

describe('Router testing:', () => {
  let router;
  let $root;

  beforeEach(() => {
    $root = document.createElement('div');
    router = new Router($root, {
      dashboard: DashboardPage,
      spreadsheet: SpreadsheetPage
    });
  });

  test('should be defined', () => {
    expect(router).toBeDefined();
  });

  test('should render dashboard page', () => {
    window.location.hash = '#';
    router.changePageHandler();

    expect($root.innerHTML).toBe('<div><h1>Dashboard</h1></div>');
  });

  test('should render spreadsheet page', () => {
    window.location.hash = '#spreadsheet/123';
    router.changePageHandler();

    expect($root.innerHTML).toBe('<div><h1>Spreadsheet</h1></div>');
  });
});
