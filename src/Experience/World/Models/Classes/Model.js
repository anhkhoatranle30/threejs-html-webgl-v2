import Rotation, { ROTATION_TYPES } from '../../../Utils/Rotation';
import Time from '../../../Utils/Time';
import MODELS from '../../../Constants/modelAttributes';

export default class Model {
  constructor(modelName) {
    this.time = new Time();
    this.name = modelName;
  }

  startSpinning() {
    // if (!this.rotation) {
    //    //composition
    // }
    this.rotation = new Rotation(this.model, ROTATION_TYPES.Y_AXIS);
    this.rotation.start();
  }

  stopSpinning() {
    const me = MODELS[this.name];
    if (this.rotation) this.rotation.stop();
    this.model.rotation.set(0, me.rotation, 0);
  }
}
