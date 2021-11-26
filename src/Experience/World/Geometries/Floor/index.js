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
    this.geometry = new THREE.PlaneBufferGeometry(500, 500, 1024, 1024);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uBigWavesElevation: { value: 0.1 },
        uBigWavesFrequency: { value: new THREE.Vector2(2, 2.5) },
        uThickness: { value: 0.005 },
        uDensity: { value: 300.0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = -0.5;
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.scene.add(this.mesh);
  }
}
