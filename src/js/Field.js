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
    this.field = [];

    // To be get from outer
    //

    this.createField();
    this.fillFieldWithMines();
    this.registerEventHandlers();
    this.renderMine(); // Test methods !!!
    this.fillFieldWithNumbers(); // Test methods !!!
  }

  registerEventHandlers() {
    this.fieldElement.addEventListener('mousedown', eventTarget => {
      const cellElement = eventTarget.target.closest('.cell');

      cellElement.classList.add('cell_clicked');
    });

    this.fieldElement.addEventListener('mouseup', eventTarget => {
      const cellElement = eventTarget.target.closest('.cell');
      const { row, column } = cellElement.dataset;

      this.field[row][column].open();
      if (this.field[row][column].mine) {
        return null;
      }
      if (!this.field[row][column].content) {
        this.openFreeSpaces(+row, +column);
      }
    });
  }

  createField() {
    for (let row = 0; row < this.rowCount; row++) {
      const rowElement = this.createRowElement();

      this.appendRowToField(rowElement);
      this.field.push([]);

      for (let column = 0; column < this.columnCount; column++) {
        const cellElement = this.createCellElement(row, column);

        this.appendCellToRow(cellElement, rowElement);
        this.field[row].push(new Cell(cellElement));
      }
    }
  }

  createRowElement() {
    return this.createDivWithClassName('row');
  }

  createCellElement(row, column) {
    const cellElement = this.createDivWithClassName('cell');

    cellElement.dataset.row = row;
    cellElement.dataset.column = column;

    return cellElement;
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
          this.field[row][column].content = countOfMine;
          this.renderCountOfMine(row, column, countOfMine);
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
        if (this.field[y][x].mine) {
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

  openFreeSpaces(row, column) {
    // if (this.field[row][column].content) {
    //   this.field[row][column].open();
    //   return null;
    // }
    for (let y = row - 1; y < (row + 2); y++) {
      for (let x = column - 1; x < (column + 2); x++) {
        if ((y === row && x === column) || !this.isValidRowColumn(y, x) || this.field[y][x].state === 'open') {
          continue;
        }

        if (!this.field[y][x].content) {
          this.field[y][x].open();
          this.openFreeSpaces(y, x);
        }
        if (this.field[y][x].content) {
          this.field[y][x].open();
        }
      }
    }
  }

  // Test methods !!!
  renderMine() {
    for (const row of this.field) {
      row.map(cell => {
        if (cell.mine) {
          cell.element.innerHTML = '<div>X</div>';
        }
      });
    }
  }

  // renderFreeSpace() {
  //   for (const row of this.field) {
  //     row.map(cell => {
  //       if (!cell.mine) {
  //         cell.element.innerHTML = '<div>O</div>';
  //       }
  //     });
  //   }
  // }

  // renderFreeSpaceAtPosition(row, column) {
  //   this.field[row][column].style.backgroundColor = 'white';
  // }

  renderCountOfMine(row, column, count) {
    const newElement = this.createDivWithClassName(`cell__content_${count}`);

    newElement.innerText = count;

    this.field[row][column].element.append(newElement);
  }
}
