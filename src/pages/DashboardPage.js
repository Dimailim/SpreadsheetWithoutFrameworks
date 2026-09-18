import Page from '@core/common/Page';
import $ from '@core/dom';
import {createRecordsTable} from '@/shared/dashboard.functions';

export default class DashboardPage extends Page {
  getRoot() {
    const newId = Date.now().toString();
    return $.create('div', 'db').setHtml(`
       <header class="db__header">
        <h1>Spreadsheet Editor Dashboard</h1>
       </header>
       <div class="db__new">
        <div class="db__view">
            <a href="#spreadsheet/${newId}" class="db__create">Create new table</a>
        </div>
       </div>

       <div class="db__table db__view">
          ${createRecordsTable()}
       </div>
    `);
  }
}
