import {formatDateTime, storage} from '@core/utils';

/**
 * Gets data from localStorage and render record in HTML markup.
 * @param {string} keyFromLocalStorage - key for getting data from localStorage
 * @returns {string} - HTML markup
 */
function toHTML(keyFromLocalStorage) {
  const seState = storage(keyFromLocalStorage);
  const id = keyFromLocalStorage.split(':')[1];

  return `
    <li class="db__record">
      <a href="#spreadsheet/${id}">${seState.filenameState}</a>
      <strong>${formatDateTime(new Date(seState.openDate))}</strong>
    </li>
  `;
}

/**
 * Returns keys with only spreadsheet states from localStorage.
 * @returns {string[]}
 */
function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('spreadsheet')) {
      continue;
    }
    keys.push(key);
  }

  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>There are no tables yet</p>`;
  }

  return `
    <header class="db__list-header">
      <span>Title</span>
      <span>Open data</span>
    </header>
    <ul class="db__list">
        ${keys.map(toHTML).join('')}
    </ul>
  `;
}
