import * as THREE from 'three';
import Experience from '../../Experience.js';
import POSITIONS from '../../Constants/modelAttributes.js';

export default class Shiba {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    // Setup
    this.resource = this.resources.items.shiba;
    this.time = this.experience.time;

    this.setModel();
    // this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.copy(POSITIONS.shiba.position);
    this.model.rotation.y += POSITIONS.shiba.rotation;
    this.model.scale.set(
      POSITIONS.shiba.scale,
      POSITIONS.shiba.scale,
      POSITIONS.shiba.scale
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

    this.animation.actions.fly = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );

    this.animation.actions.current = this.animation.actions.fly;
    this.animation.actions.current.play();
  }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}