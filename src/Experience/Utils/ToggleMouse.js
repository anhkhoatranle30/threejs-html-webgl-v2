import EventEmitter from './EventEmitter';

const MOUSE_EVENTS = ['mousedown', 'mouseup', 'mousemove'];

export default class ToggleMouse extends EventEmitter {
  constructor() {
    super();
    // Setup
    this.cursor = {
      x: 0,
      y: 0,
    };

    // Setup events
    MOUSE_EVENTS.forEach((mouseEvent) => {
      window.addEventListener(mouseEvent, (_event) => {
        this.updateCursorByEvent(_event);

        this.trigger(mouseEvent);
      });
    });
  }

  updateCursorByEvent(_event) {
    this.cursor.x = -(_event.clientX / window.innerWidth - 0.5) * 2;
    this.cursor.y = (_event.clientY / window.innerHeight - 0.5) * 2;
  }
}
