import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import Experience from '../../../../Experience';

export default class ViewPointerEdges {
  constructor({
    type = 'vertical',
    offset = new THREE.Vector3(0, 0, 0),
    thickness = 1,
    depth = 1,
  }) {
    this.type = type;
    this.offset = offset;
    this.thickness = thickness;
    this.depth = depth;

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    const width =
      this.type === 'vertical'
        ? (this.thickness * 2 * 2) / window.innerWidth
        : this.depth;
    const height =
      this.type === 'horizonal'
        ? (this.thickness * 2 * 2) / window.innerHeight
        : this.depth;
    this.geometry = new THREE.PlaneBufferGeometry(width, height, 1, 1);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1.0 },
        uOffset: {
          value: this.offset,
        },
      },
      vertexShader,
      fragmentShader,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  update() {
    this.mesh.lookAt(this.experience.camera);
  }
}
