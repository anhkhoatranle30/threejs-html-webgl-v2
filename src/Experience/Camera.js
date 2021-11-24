import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import MODELS from './Constants/modelAttributes.js';
import Experience from './Experience.js';

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.copy(MODELS.droneModel.camera);
    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }

  moveToModel(strModelName, jumpDuration) {
    const currentPosition = this.instance.position.clone();
    const destination = MODELS[strModelName].camera.clone();
    gsap
      .to(this.instance.position, {
        duration: jumpDuration,
        x: `+= ${destination.x - currentPosition.x}`,
        y: 0.5,
        z: `+= ${destination.z - currentPosition.z}`,
      })
      .then(() => {
        console.log('done');
      });
  }
}
