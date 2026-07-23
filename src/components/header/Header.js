import CommonComponent from '@core/СommonComponent';

export default class Header extends CommonComponent {
  static className = 'excel__header';
  toHtml() {
    return `
      <input 
        type="text" class="excel__header-title-input" 
        value="New table" name="file-name"
      />
      <div>
        <div class="button">
            <i class="material-icons">delete</i>
        </div>
        <div class="button">
            <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `;
  }
}
