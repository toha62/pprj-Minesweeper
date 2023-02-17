/* eslint-disable no-return-assign */
/* eslint-disable arrow-parens */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import Cell from './Cell.js';

export default class Field {
  constructor(fieldElement, rowCount, columnCount, mineCount) {
    this.fieldElement = fieldElement;
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.mineCount = mineCount;
    this.field = [];

    // To be get from outer
    //

    this.createField();
    this.fillFieldWithMines();
    this.renderMine(); // Test methods !!!
    this.fillFieldWithNumbers(); // Test methods !!!
  }

  createField() {
    for (let row = 0; row < this.rowCount; row++) {
      const rowElement = this.createRowElement();

      this.appendRowToField(rowElement);
      this.field.push([]);

      for (let column = 0; column < this.columnCount; column++) {
        const cellElement = this.createCellElement();

        this.appendCellToRow(cellElement, rowElement);
        this.field[row].push(new Cell(cellElement, row, column));
      }
    }
  }

  createRowElement() {
    return this.createDivWithClassName('row');
  }

  createCellElement() {
    return this.createDivWithClassName('cell');
  }

  createDivWithClassName(className) {
    const div = document.createElement('div');

    div.className = className;
    return div;
  }

  appendRowToField(row) {
    this.fieldElement.append(row);
  }

  appendCellToRow(cell, row) {
    row.append(cell);
  }

  fillFieldWithMines() {
    let counter = 0;

    while (counter < this.mineCount) {
      const row = Math.floor(Math.random() * this.rowCount);
      const column = Math.floor(Math.random() * this.columnCount);
      if (!this.field[row][column].mine) {
        this.field[row][column].mine = true;
        counter++;
      }
    }
  }

  fillFieldWithNumbers() {
    for (let row = 0; row < this.rowCount; row++) {
      for (let column = 0; column < this.columnCount; column++) {
        if (this.field[row][column].mine) {
          continue;
        }
        const countOfMine = this.getCountOfMine(row, column);
        if (countOfMine) {
          this.renderCountOfMine(row, column, countOfMine);
        }
      }
    }
  }

  getCountOfMine(row, column) {
    let counter = 0;
    if ((row - 1) >= 0 && this.field[row - 1][column].mine) {
      counter++;
    }
    if ((row - 1) >= 0 && (column - 1) >= 0 && this.field[row - 1][column - 1].mine) {
      counter++;
    }
    if ((row - 1) >= 0 && (column + 1) < this.columnCount && this.field[row - 1][column + 1].mine) {
      counter++;
    }
    if ((row + 1) < this.rowCount && this.field[row + 1][column].mine) {
      counter++;
    }
    if ((row + 1) < this.rowCount && (column - 1) >= 0 && this.field[row + 1][column - 1].mine) {
      counter++;
    }
    if ((row + 1) < this.rowCount && (column + 1) < this.columnCount && this.field[row + 1][column + 1].mine) {
      counter++;
    }
    if ((column - 1) >= 0 && this.field[row][column - 1].mine) {
      counter++;
    }
    if ((column + 1) < this.columnCount && this.field[row][column + 1].mine) {
      counter++;
    }
    return counter;
  }

  openFreeSpaces(row, column) {
    this.renderFreeSpaceAtPosition(row, column);
  }

  // Test methods !!!
  renderMine() {
    for (const row of this.field) {
      row.map(cell => cell.mine && (cell.element.innerHTML = '<div>X</div>'));
    }
  }

  renderFreeSpace() {
    for (const row of this.field) {
      row.map(cell => cell.mine || (cell.element.innerHTML = '<div>O</div>'));
    }
  }

  renderFreeSpaceAtPosition(row, column) {
    this.field[row][column].element.innerHTML = '<div>O</div>';
  }

  renderCountOfMine(row, column, count) {
    this.field[row][column].element.innerHTML = `<div>${count}</div>`;
  }
}
