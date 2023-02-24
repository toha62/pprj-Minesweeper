/* eslint-disable import/extensions */
import Field from './Field.js';

// const field = document.querySelector('.field');
// const rows = field.querySelectorAll('.row');

// field.addEventListener('mousedown', (event) => {
//   const { target } = event;

//   target.classList.add('cell_clicked');
// });

// field.addEventListener('mouseup', (event) => {
//   const { target } = event;

//   target.classList.remove('cell_clicked');
// });

// function getCell(x, y) {
//   const cells = rows[y].querySelectorAll('.cell');
//   return cells[x];
// }

// function setCellSelected(x, y) {
//   getCell(x, y).classList.add('cell_clicked');
// }

const field = new Field(document.querySelector('.field'), 5, 6, 10);
console.log(field);
// console.log(getCell(3, 0));
// setCellSelected(3, 0);
