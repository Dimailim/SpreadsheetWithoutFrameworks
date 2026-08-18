export default class TableSelection {
  static className = 'selected';
  constructor() {
    /** @type {Dom[]} */
    this.selectedGroup = [];
    this.currentCell = null;
  }

  /**
   * Method adds a DOM element that has been selected to selectedGroup and adds the "selected" class to it.
   * @param {Dom} $element
   */
  select($element) {
    this.removeSelect();
    this.selectedGroup.push($element);
    $element.focus().addClass(TableSelection.className);
    this.currentCell = $element;
  }

  /**
   * Method adds multiple DOM elements that have been selected to selectedGroup and adds the "selected" class to it.
   * @param {Dom} $element
   */
  selectGroup($element) {
    this.selectedGroup.push($element);
    $element.addClass(TableSelection.className);
  }

  /**
   * Removes previously selected cells from selectedGroup and removes the "selected" class from those elements.
   */
  removeSelect() {
    this.selectedGroup.forEach((selectedElement, index) => {
      selectedElement.removeClass(TableSelection.className);
    });
    this.selectedGroup = [];
  }
}
