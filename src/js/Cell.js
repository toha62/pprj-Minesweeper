export default class Cell {
  constructor(element, row, column) {
    this.element = element;
    this.row = row;
    this.column = column;
    this.isOpen = false;
    this.mine = false;
    this.content = '';
  }

  open() {
    if (this.isOpen) {
      return;
    }

    this.isOpen = true;
    this.element.classList.add('cell_clicked');
    this.element.firstChild.classList.remove('cell__content_hidden');

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
    if (this.isOpen) {
      return;
    }
    this.element.innerHTML = '<div>Q</div>';
  }
}
