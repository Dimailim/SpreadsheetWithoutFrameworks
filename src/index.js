import './scss/index.scss';
import {createStore} from '@core/createStore';
import {storage} from '@core/utils';
import rootReducer from '@/redux/rootReducer';

// Components
import Spreadsheet from '@/components/spreadsheet/Spreadsheet';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';

const store = createStore(rootReducer,
    storage('spreadsheet-state'));

store.subscribe((state) => {
  console.log('App state', state);
  storage('spreadsheet-state', state);
});

const se = new Spreadsheet('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
});

se.render();
