/* eslint-disable class-methods-use-this */
/* eslint-disable no-new */
import Field from './Field';
import Cell from './Cell';
import Button from './Button';
import MouseClickHandler from './MouseClickHandler';

class App {
  constructor() {
    this.field = new Field(document.querySelector('.field'), 7, 10, 10);
    this.button = new Button(document.querySelector('.button'), this.field.restart.bind(this.field));

    this.registerEventHandlers();
  }

  registerEventHandlers() {
    new MouseClickHandler(
      this.field.fieldElement,
      this.leftClickDownCallback.bind(this),
      this.leftClickUpCallback.bind(this),
      this.rightClickCallback.bind(this),
      this.bothClickDownCallback.bind(this),
      this.bothClickUpCallback.bind(this),
    );
  }

  // Обработчики нажатия кнопок мыши

  leftClickDownCallback(target) {
    const cell = target.closest('.cell');

    this.button.content = 'frightened';
    // console.log(cell);
    // if (!cell.matches('.cell_open')) {
    //   cell.classList.add('cell_open');
    // }
  }

  leftClickUpCallback(target) {
    const cellElement = target.closest('.cell');
    const row = +cellElement.dataset.row;
    const column = +cellElement.dataset.column;

    this.button.content = 'smile';

    cellElement.classList.add('cell_clicked');

    Cell.open(this.fieldArr[row][column]);

    if (this.fieldArr[row][column].dataset.content === 'mine') {
      this.button.content = 'sad';
    }

    if (!this.fieldArr[row][column].dataset.content) {
      this.openFreeSpaces(+row, +column);
    }
  }

  rightClickCallback(target) {
    const cellElement = target.closest('.cell');
    // const row = +cellElement.dataset.row;
    // const column = +cellElement.dataset.column;

    // this.field[row][column].setMineFlag();
    const mineElement = cellElement.firstChild;

    mineElement.classList.toggle('mine_label');
  }

  bothClickDownCallback(target) {
    const cellElement = target.closest('.cell');
  }

  bothClickUpCallback(target) {
    const cellElement = target.closest('.cell');
  }
}

new App();
// console.log(field, button);
// console.log(getCell(3, 0));
// setCellSelected(3, 0);
