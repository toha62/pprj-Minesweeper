export default class Button {
  constructor(buttonElement, clickCallback) {
    this.element = buttonElement;
    this.clickCallback = clickCallback;
    this.content = 'smile';

    this.registerHandlers();
  }

  registerHandlers() {
    this.element.addEventListener('mousedown', () => {
      this.element.classList.add('button_pressed');
    });

    this.element.addEventListener('mouseup', () => {
      this.element.classList.remove('button_pressed');
      this.clickCallback();
    });
  }

  set content(value) {
    const contentElement = this.element.querySelector('.button__img');

    if (value === 'smile') {
      contentElement.innerHTML = '&#128578';
    }
    if (value === 'sad') {
      contentElement.innerHTML = '&#128543';
    }
    if (value === 'frightened') {
      contentElement.innerHTML = '&#128558';
    }
  }
}
