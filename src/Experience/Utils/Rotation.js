import * as THREE from 'three';
import Time from './Time';

export const ROTATION_TYPES = {
  RANDOM: 'random',
  Y_AXIS: 'y-axis',
};

export default class Rotation {
  #isRotating;
  #rotationType;
  #object;
  #rotationFieldName;

  constructor(
    toRotateObject = new THREE.Mesh(),
    strRotationType = ROTATION_TYPES.RANDOM,
    strRotationFieldName = 'rotation'
  ) {
    this.time = new Time();
    this.#isRotating = false;
    this.#rotationType = strRotationType;
    this.#object = toRotateObject;
    this.#rotationFieldName = strRotationFieldName;

    this.time.on('tick', () => {
      this.rotate();
    });
  }

  start() {
    this.#isRotating = true;
  }

  stop() {
    this.#isRotating = false;
  }

  rotate() {
    if (this.#isRotating) {
      // Factory pattern
      switch (this.#rotationType) {
        case ROTATION_TYPES.RANDOM: {
          this.rotateRandomly();
          break;
        }
        case ROTATION_TYPES.Y_AXIS: {
          this.rotateByYAxis();
          break;
        }
        default: {
          this.#isRotating = false;
        }
      }
    }
  }

  //#region Rotation strategies
  rotateRandomly() {
    this.#object[this.#rotationFieldName].x += Math.random() * 0.005;
    this.#object[this.#rotationFieldName].y += Math.random() * 0.005;
  }
  rotateByYAxis() {
    this.#object[this.#rotationFieldName].y += Math.random() * 0.005;
  }
  //#endregion
}
