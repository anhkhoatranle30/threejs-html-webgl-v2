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
      // this.floor = new Water();
      this.shiba = new Shiba();
      this.busterDrone = new BusterDrone();
      this.heliBall = new HeliBall();
      this.models = [this.shiba, this.busterDrone, this.heliBall];

      // Startup
      this.currentModel = this.models[0];
      this.currentModel.startSpinning();

      this.environment = new Environment();
      // this.viewPointer = new ViewPointer();
      this.overlay.fadeOut();
    });
  }

  update() {
    if (this.models) this.models.forEach((model) => model.update());
    // if (this.floor) this.floor.update();
    if (this.viewPointer) this.viewPointer.update();
  }

  updateCurrentModel(strModelName) {
    this.models.forEach((model) => {
      if (model.name !== strModelName) {
        model.stopSpinning();
      } else {
        model.startSpinning();
      }
    });
    this.currentModel = this.models.find(
      (model) => model.name === strModelName
    );
  }

  focusCurrentModel() {
    this.currentModel.stopSpinning();
  }

  loseFocusCurrentModel() {
    this.currentModel.startSpinning();
  }
}
