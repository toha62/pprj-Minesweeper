export default class Cell {
  constructor(element) {
    this.element = element;
    this.state = 'closed';
    this.mine = false;
  }
}
