import * as THREE from 'three';
import Experience from '../../../Experience';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';

export default class Dust {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.radius = 500;
    this.quantity = 5000;

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setPoints();
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry();
    this.positions = new Float32Array(this.quantity * 3);
    this.scales = new Float32Array(this.quantity);

    for (let i = 0; i < this.quantity; i++) {
      const i3 = i * 3;

      // Position
      this.positions[i3] =
        Math.random() * this.radius * (Math.random() < 0.5 ? 1 : -1);
      this.positions[i3 + 1] =
        Math.random() * this.radius * (Math.random() < 0.5 ? 1 : -1);
      this.positions[i3 + 2] =
        Math.random() * this.radius * (Math.random() < 0.5 ? 1 : -1);

      // Scale
      this.scales[i] = Math.random();
    }

    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.positions, 3)
    );
    this.geometry.setAttribute(
      'aScale',
      new THREE.BufferAttribute(this.scales, 1)
    );
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader,
      fragmentShader,
      uniforms: {
        uSize: {
          value: 5000 * this.experience.renderer.instance.getPixelRatio(),
        },
        uTime: { value: 0 },
      },
    });
  }

  setPoints() {
    this.points = new THREE.Points(this.geometry, this.material);
    this.experience.scene.add(this.points);
  }
}
