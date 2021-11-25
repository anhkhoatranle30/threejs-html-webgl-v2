import EventEmitter from './EventEmitter';

export default class Parallax extends EventEmitter {
  constructor() {
    super();
    // Setup
    this.cursor = {
      x: 0,
      y: 0,
    };
    // Mousemove event
    window.addEventListener('mousemove', (_event) => {
      this.cursor.x = -(_event.clientX / window.innerWidth - 0.5) * 2;
      this.cursor.y = (_event.clientY / window.innerWidth - 0.5) * 2;

      this.trigger('mousemove');
    });
  }
}
