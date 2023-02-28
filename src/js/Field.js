/* eslint-disable no-new */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import Cell from './Cell';
import MouseClickHandler from './MouseClickHandler';

export default class Field {
  constructor(fieldElement, rowCount, columnCount, mineCount) {
    this.fieldElement = fieldElement;
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.mineCount = mineCount;
    this.fieldArr = [];

    // To be get from outer
    //

    this.createField();
    this.fillFieldWithMines();
    this.registerEventHandlers();
    this.renderMine(); // Test methods !!!
    this.fillFieldWithNumbers(); // Test methods !!!
  }

  registerEventHandlers() {
    new MouseClickHandler(
      this.fieldElement,
      this.leftClickCallback.bind(this),
      this.rightClickCallback.bind(this),
      this.bothClickDownCallback.bind(this),
      this.bothClickUpCallback.bind(this),
    );
  }

  // Обработчики нажатия кнопок мыши

  leftClickCallback(target) {
    const cellElement = target.closest('.cell');
    const row = +cellElement.dataset.row;
    const column = +cellElement.dataset.column;

    cellElement.classList.add('cell_clicked');

    Cell.open(this.fieldArr[row][column]);

    // if (this.field[row][column].mine) {
    //   return null;
    // }
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

  // Методы создания игрового поля
  // создание элементов ячеек поля и сохранение их в массив

  createField() {
    for (let row = 0; row < this.rowCount; row++) {
      const rowElement = this.createRowElement();

      this.appendRowToField(rowElement);
      this.appendRowToFieldArray();

      for (let column = 0; column < this.columnCount; column++) {
        const cellElement = this.createCellElement(row, column);

        this.appendCellToRow(cellElement, rowElement);
        this.appendCellToFieldArray(cellElement, row);
      }
    }
  }

  createRowElement() {
    return this.createDivWithClassName('row');
  }

  createCellElement(row, column) {
    const cellElement = this.createDivWithClassName('cell');
    const contentElement = this.createContentElement();

    cellElement.append(contentElement);

    cellElement.dataset.row = row;
    cellElement.dataset.column = column;
    cellElement.dataset.content = '';

    return cellElement;
  }

  createContentElement() {
    return this.createDivWithClassName('cell__content_hidden');
  }

  createDivWithClassName(className) {
    const div = document.createElement('div');

    div.className = className;
    return div;
  }

  appendRowToFieldArray() {
    this.fieldArr.push([]);
  }

  appendCellToFieldArray(cell, row) {
    this.fieldArr[row].push(cell);
  }

  appendRowToField(row) {
    this.fieldElement.append(row);
  }

  appendCellToRow(cell, row) {
    row.append(cell);
  }

  // Метод заполнения поля минами

  fillFieldWithMines() {
    let counter = 0;

    while (counter < this.mineCount) {
      const row = Math.floor(Math.random() * this.rowCount);
      const column = Math.floor(Math.random() * this.columnCount);

      if (!this.fieldArr[row][column].dataset.content) {
        this.fieldArr[row][column].dataset.content = 'mine';
        counter++;
      }
    }
  }

  // Метод заполнения поля числами, указывающими количество мин вокруг ячейки

  fillFieldWithNumbers() {
    for (let row = 0; row < this.rowCount; row++) {
      for (let column = 0; column < this.columnCount; column++) {
        if (this.fieldArr[row][column].dataset.content === 'mine') {
          continue;
        }
        const countOfMine = this.getCountOfMine(row, column);

        if (countOfMine) {
          this.fieldArr[row][column].dataset.content = countOfMine;
          this.renderCountOfMine(row, column, countOfMine); // temporary method
          // this.field[row][column].open();
        }
      }
    }
  }

  getCountOfMine(row, column) {
    let counter = 0;
    for (let y = row - 1; y < row + 2; y++) {
      for (let x = column - 1; x < column + 2; x++) {
        if ((y === row && x === column) || !this.isValidRowColumn(y, x)) {
          continue;
        }
        if (this.fieldArr[y][x].dataset.content === 'mine') {
          counter++;
        }
      }
    }
    return counter;
  }

  isValidRowColumn(row, column) {
    if (row < 0 || column < 0 || row >= this.rowCount || column >= this.columnCount) {
      return false;
    }
    return true;
  }

  // Метод открывает область пустых ячеек

  openFreeSpaces(row, column) {
    // if (this.field[row][column].content) {
    //   this.field[row][column].open();
    //   return null;
    // }
    for (let y = row - 1; y < row + 2; y++) {
      for (let x = column - 1; x < column + 2; x++) {
        if ((y === row && x === column) || !this.isValidRowColumn(y, x)) {
          continue;
        }

        const cellElement = this.fieldArr[y][x];
        const { content } = cellElement.dataset;

        if (content === 'mine' || cellElement.matches('.cell_open')) {
          continue;
        }

        if (!content) {
          Cell.open(cellElement);
          this.openFreeSpaces(y, x);
        }
        if (content) {
          Cell.open(cellElement);
        }
      }
    }
  }

  // Test methods !!!
  renderMine() {
    for (const row of this.fieldArr) {
      row.map(cell => {
        if (cell.dataset.content === 'mine') {
          const mineElement = cell.firstChild;

          mineElement.textContent = 'X';
          mineElement.classList.add('cell__content_hidden');
        }
      });
    }
  }

  renderCountOfMine(row, column, count) {
    const contentElement = this.fieldArr[row][column].firstChild;

    contentElement.textContent = count;
    contentElement.classList.add(`cell__content_${count}`);
    contentElement.classList.add('cell__content_hidden');
  }
}
