import * as THREE from 'three';
import Experience from '../../Experience.js';
import POSITIONS from '../../Constants/modelAttributes.js';

export default class HeliBall {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    // Setup
    this.resource = this.resources.items.heliBall;
    this.time = this.experience.time;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.copy(POSITIONS.heliBall.position);
    this.model.rotation.y += POSITIONS.heliBall.rotation;
    this.model.scale.set(
      POSITIONS.heliBall.scale,
      POSITIONS.heliBall.scale,
      POSITIONS.heliBall.scale
    );
    this.scene.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setAnimation() {
    this.animation = {};

    this.animation.mixer = new THREE.AnimationMixer(this.model);

    this.animation.actions = {};

    this.animation.actions.openUp = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );

    this.animation.actions.current = this.animation.actions.openUp;
    this.animation.actions.current.play();
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
