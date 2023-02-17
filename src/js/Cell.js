export default class Cell {
  constructor(element, row, column) {
    this.element = element;
    this.row = row;
    this.column = column;
    this.state = 'closed';
    this.mine = false;
  }
}
