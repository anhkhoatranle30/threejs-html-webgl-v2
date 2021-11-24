import Experience from '../Experience';
import BusterDrone from './BusterDrone';
import MazdaCar from './MazdaCar';
import Environment from './Environment';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      // this.floor = new Floor();
      this.busterDrone = new BusterDrone();
      this.mazdaCar = new MazdaCar();
      this.environment = new Environment();
    });
  }

  update() {
    if (this.busterDrone) this.busterDrone.update();
    if (this.mazdaCar) this.mazdaCar.update();
  }
}
