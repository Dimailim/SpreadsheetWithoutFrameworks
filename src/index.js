import './scss/index.scss';
import Router from '@core/routes/Router';

// Pages
import DashboardPage from '@/pages/DashboardPage';
import SpreadsheetPage from '@/pages/SpreadsheetPage';

new Router('#app', {
  dashboard: DashboardPage,
  spreadsheet: SpreadsheetPage
});
