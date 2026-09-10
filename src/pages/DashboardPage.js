import Page from '@core/Page';
import $ from '@core/dom';

export default class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').setValue(`
       <header class="db__header">
        <h1>Spreadsheet Editor Dashboard</h1>
       </header>
       <div class="db__new">
        <div class="db__view">
            <a href="#" class="db__create">Create new spreadsheet</a>
        </div>
       </div>

       <div class="db__table db__view">
          <header class="db__list-header">
              <span>Title</span>
              <span>Open data</span>
          </header>
          <ul class="db__list">
            <li class="db__record">
              <a href="#">New table 1</a>
              <strong>09.07.2026</strong>
            </li>
            <li class="db__record">
              <a href="#">New table 2</a>
              <strong>09.07.2026</strong>
            </li>
          </ul>
       </div>
    `);
  }
}
