export default class Cell {
  constructor(element) {
    // this.cellElement = element;
    this.contentElement = element.firstChild;
    // this.row = row;
    // this.column = column;
    this.isOpen = false;
    this.isMine = false;
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
    this.contentElement.innerText = value;
    this.contentElement.classList.add(`cell__content_${value}`);
  }

  get isMine() {
    return this._isMine;
  }

  set isMine(value) {
    if (value) {
      const img = document.createElement('img');

      img.className = 'cell__mine';
      img.src = './src/svg/mine.svg';
      this.contentElement.append(img);
    }
    this._isMine = value;
  }

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value) {
    if (value) {
      this.contentElement.classList.remove('cell__content_hidden');
    } else {
      this.contentElement.classList.add('cell__content_hidden');
    }
  }
}
