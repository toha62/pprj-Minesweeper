/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import Cell from './Cell.js';

export default class Field {
  constructor(fieldElement, rowCount, columnCount) {
    this.fieldElement = fieldElement;
    this.rowCount = rowCount;
    this.columnCount = columnCount;
    this.field = [];

    this.createField();
  }

  createField() {
    for (let i = 0; i < this.rowCount; i++) {
      const row = this.createRow();

      this.appendRowToField(row);
      this.field.push([]);

      for (let j = 0; j < this.columnCount; j++) {
        const cell = this.createCell();

        this.appendCellToRow(cell, row);
        this.field[i].push(new Cell(cell));
      }
    }
  }

  createRow() {
    return this.createDivWithClassName('row');
  }

  createDivWithClassName(className) {
    const div = document.createElement('div');

    div.className = className;
    return div;
  }

  appendRowToField(row) {
    this.fieldElement.append(row);
  }

  createCell() {
    return this.createDivWithClassName('cell');
  }

  appendCellToRow(cell, row) {
    row.append(cell);
  }
}
