import EventEmitter from './EventEmitter';

export default class ToggleMouse extends EventEmitter {
  constructor() {
    super();
    // Setup
    this.cursor = {
      x: 0,
      y: 0,
    };
    // Mousedown event
    window.addEventListener('mousedown', (_event) => {
      this.cursor.x = -(_event.clientX / window.innerWidth - 0.5) * 2;
      this.cursor.y = (_event.clientY / window.innerHeight - 0.5) * 2;

      this.trigger('mousedown');
    });
    // Mouseup event
    window.addEventListener('mouseup', (_event) => {
      this.cursor.x = -(_event.clientX / window.innerWidth - 0.5) * 2;
      this.cursor.y = (_event.clientY / window.innerHeight - 0.5) * 2;

      this.trigger('mouseup');
    });
  }
}
