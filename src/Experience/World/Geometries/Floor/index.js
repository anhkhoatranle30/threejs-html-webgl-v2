import * as THREE from 'three';
import Experience from '../../../Experience';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneBufferGeometry(1000, 1000, 256, 256);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1 },
      },
      vertexShader,
      fragmentShader,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = -0.5;
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.scene.add(this.mesh);
  }
}
