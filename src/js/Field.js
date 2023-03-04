/* eslint-disable no-new */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
import Cell from './Cell';

export default class Field {
  constructor(fieldElement, rowCount, columnCount, mineCount) {
    this.fieldElement = fieldElement;
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.mineCount = mineCount;

    this.start();
  }

  start() {
    this.fieldArr = [];

    this.createField();
    this.fillFieldWithMines();
    console.log(this.fieldArr);
    // this.renderMine(); // Test methods !!!
    this.fillFieldWithNumbers(); // Test methods !!!
  }

  restart() {
    this.clearField();
    this.start();
  }

  clearField() {
    const rowList = this.fieldElement.querySelectorAll('.row');

    if (rowList) {
      Array.from(rowList).map(element => element.remove());
    }
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

    return cellElement;
  }

  createContentElement() {
    return this.createDivWithClassName('cell__content');
  }

  createDivWithClassName(className) {
    const div = document.createElement('div');

    div.className = className;
    return div;
  }

  appendRowToField(row) {
    this.fieldElement.append(row);
  }

  appendRowToFieldArray() {
    this.fieldArr.push([]);
  }

  appendCellToFieldArray(cellElement, row) {
    this.fieldArr[row].push(new Cell(cellElement));
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
      const cell = this.fieldArr[row][column];

      if (!cell.isMine) {
        cell.isMine = true;
        counter++;
      }
    }
  }

  // Метод заполнения поля числами, указывающими количество мин вокруг ячейки

  fillFieldWithNumbers() {
    for (let row = 0; row < this.rowCount; row++) {
      for (let column = 0; column < this.columnCount; column++) {
        const cell = this.fieldArr[row][column];

        if (cell.isMine) {
          continue;
        }
        const countOfMine = this.getCountOfMine(row, column);

        if (countOfMine) {
          cell.content = countOfMine;
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
        if (this.fieldArr[y][x].isMine) {
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
}
