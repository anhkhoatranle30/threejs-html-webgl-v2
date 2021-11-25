import Experience from '../Experience';
import Environment from './Environment';
import Overlay from './Geometries/Overlay';
import BusterDrone from './Models/BusterDrone';
import HeliBall from './Models/HeliBall';
import MazdaCar from './Models/MazdaCar';

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
      this.busterDrone = new BusterDrone();
      this.mazdaCar = new MazdaCar();
      this.heliBall = new HeliBall();
      this.environment = new Environment();
      this.overlay.fadeOut();
    });
  }

  update() {
    if (this.busterDrone) this.busterDrone.update();
    if (this.mazdaCar) this.mazdaCar.update();
    if (this.heliBall) this.heliBall.update();
  }
}
