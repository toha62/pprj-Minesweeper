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

      this.field.push([]);

      for (let j = 0; j < this.columnCount; j++) {
        const cellElement = this.createCell(row);

        this.field[i].push(new Cell(cellElement));
      }
    }
  }

  createRow() {
    const div = document.createElement('div');

    div.className = 'row';
    this.fieldElement.append(div);

    return div;
  }

  createCell(element) {
    const div = document.createElement('div');

    div.className = 'cell';
    element.append(div);

    return div;
  }
}
