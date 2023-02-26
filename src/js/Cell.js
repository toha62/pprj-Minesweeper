export default class Cell {
  constructor(element, row, column) {
    this.element = element;
    this.row = row;
    this.column = column;
    this.state = 'closed';
    this.mine = false;
    this.content = '';
  }

  open() {
    if (this.state === 'open') {
      return;
    }

    this.state = 'open';
    this.element.classList.add('cell_clicked');

    if (this.mine) {
      this.element.innerHTML = '<div>X</div>';
      return;
    }

    if (!this.content) {
      this.element.innerHTML = '<div></div>';
      return;
    }

    this.element.innerHTML = `<div class="cell__content_${this.content}">${this.content}</div>`;
  }

  setMineFlag() {
    if (this.state === 'open') {
      return;
    }
    this.element.innerHTML = '<div>Q</div>';
  }
}
