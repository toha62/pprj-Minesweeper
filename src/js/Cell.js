export default class Cell {
  constructor(element, row, column) {
    this.element = element;
    this.row = row;
    this.column = column;
    this.isOpen = false;
    this.mine = false;
    this.content = '';
  }

  static open(element) {
    if (element.matches('.cell_open')) {
      return;
    }

    const { content } = element.dataset;

    element.classList.add('cell_open');
    element.firstChild.classList.remove('cell__content_hidden');

    if (content === 'mine') {
      element.innerHTML = '<div>X</div>';
      return;
    }

    // if (!content) {
    //   element.innerHTML = '<div></div>';
    //   return;
    // }

    // element.innerHTML = `<div class="cell__content_${content}">${content}</div>`;
  }

  setMineFlag() {
    if (this.isOpen) {
      return;
    }
    this.element.innerHTML = '<div>Q</div>';
  }
}
