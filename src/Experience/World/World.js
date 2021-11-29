import Experience from '../Experience';
import Environment from './Environment';
import Overlay from './Geometries/Overlay';
import ViewPointer from './Geometries/ViewPointer';
import Water from './Geometries/Water';
import BusterDrone from './Models/BusterDrone';
import HeliBall from './Models/HeliBall';
import Shiba from './Models/Shiba';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.overlay = new Overlay();

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      // this.floor = new Floor();
      this.floor = new Water();
      this.shiba = new Shiba();
      this.busterDrone = new BusterDrone();
      this.heliBall = new HeliBall();
      this.environment = new Environment();
      this.viewPointer = new ViewPointer();
      this.overlay.fadeOut();
    });
  }

  update() {
    if (this.busterDrone) this.busterDrone.update();
    if (this.mazdaCar) this.mazdaCar.update();
    if (this.heliBall) this.heliBall.update();
    if (this.floor) this.floor.update();
    if (this.viewPointer) this.viewPointer.update();
  }

  activateViewPointer() {
    this.viewPointer.isActivated = true;
  }

  deactivateViewPointer() {
    this.viewPointer.isActivated = false;
  }
}
