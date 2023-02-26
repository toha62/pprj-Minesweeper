export default class MouseClickHandler {
  constructor(element, leftClickCallback, rightClickCallback, bothClickDownCallback, bothClickUpCallback) {
    this.element = element;
    this.leftClickCallback = leftClickCallback;
    this.rightClickCallback = rightClickCallback;
    this.bothClickDownCallback = bothClickDownCallback;
    this.bothClickUpCallback = bothClickUpCallback;
    this.pressedButtons = [];

    this.registerHandlers();
  }

  registerHandlers() {
    this.element.addEventListener('mousedown', event => {
      const { button } = event;

      this.pressedButtons.push(button);

      if (this.pressedButtons.includes(0) && this.pressedButtons.includes(2)) {
        this.bothClickDownCallback(event.target);
      }
    });

    this.element.addEventListener('mouseup', event => {
      const { button } = event;

      if (this.pressedButtons.includes(0) && this.pressedButtons.includes(2)) {
        this.bothClickUpCallback(event.target);
        this.pressedButtons.length = 0;
      } else if (this.pressedButtons.includes(0)) {
        this.leftClickCallback(event.target);
      } else if (this.pressedButtons.includes(2)) {
        this.rightClickCallback(event.target);
      }

      this.pressedButtons.splice(this.pressedButtons.indexOf(button), 1);
    });

    this.element.addEventListener('contextmenu', event => {
      event.preventDefault();
    });
  }
}
