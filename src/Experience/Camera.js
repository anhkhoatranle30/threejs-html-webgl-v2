import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import MODELS from './Constants/modelAttributes.js';
import Experience from './Experience.js';
import Calculator from './Utils/Calculator.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.currentSelectedModel = MODELS[Object.keys(MODELS)[0]];

    this.setInstance();
    // this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    );
    this.instance.position.copy(this.currentSelectedModel.camera.position);
    this.instance.lookAt(this.currentSelectedModel.camera.lookAt);
    this.scene.add(this.instance);
  }

  // setControls() {
  //   this.controls = new OrbitControls(this.instance, this.canvas);
  //   this.controls.enableDamping = true;
  // }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    // this.controls.update();
    if (this.currentSelectedModel) {
      this.instance.lookAt(this.currentSelectedModel.camera.lookAt);
    }
  }

  moveToModel(strModelName, jumpDuration) {
    gsap
      .to(this.instance.position, {
        duration: 0.5,
        x: `+= ${Math.random()}`,
        y: `+= 0`,
        z: `+= ${Math.random()}`,
      })
      .then(() => {
        this.currentSelectedModel = MODELS[strModelName];
        const currentPosition = this.instance.position.clone();
        const destination = MODELS[strModelName].camera.position.clone();
        gsap
          .to(this.instance.position, {
            duration: jumpDuration - 0.5,
            x: `+= ${destination.x - currentPosition.x}`,
            y: `+= ${destination.y - currentPosition.y}`,
            z: `+= ${destination.z - currentPosition.z}`,
          })
          .then(() => {
            // console.log(this.instance.position);
            console.log('done');
          });
      });
  }

  moveByCursor(cursorCoordinates) {
    const duration = 2;
    const sourceCameraPosition = this.currentSelectedModel.camera.position;
    const distanceFactor = 1.002;
    const distanceToCenter = Calculator.CalcDistanceTwoPoints({
      source: sourceCameraPosition,
      destination: new THREE.Vector3(),
      isEnalbled: { x: true, z: true },
    });
    gsap
      .to(this.instance.position, {
        duration,
        x:
          sourceCameraPosition.x -
          cursorCoordinates.x * Math.pow(distanceFactor, distanceToCenter),
        y:
          sourceCameraPosition.y +
          cursorCoordinates.y * Math.pow(distanceFactor, distanceToCenter),
      })
      .then(() => {
        // console.log(camera.position);
      });
  }
}
