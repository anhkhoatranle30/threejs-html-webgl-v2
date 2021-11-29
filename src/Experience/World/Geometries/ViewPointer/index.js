import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import Experience from '../../../Experience';
import ViewPointerEdges from './Edges';

export default class ViewPointer {
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
    this.geometry = new THREE.PlaneBufferGeometry(0.2, 0.2, 1, 1);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1.0 },
      },
      vertexShader,
      fragmentShader,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.x += 1.0;

    this.leftEdge = new ViewPointerEdges({
      type: 'vertical',
      thickness: 5,
    });
    this.scene.add(this.mesh);
  }

  update() {
    this.mesh.lookAt(this.experience.camera);
    this.leftEdge.update();
  }

  fadeOut() {
    gsap
      .to(this.experience.camera.instance.position, {
        duration: 0.5,
        x: `+= 0.5`,
        y: `+= 0.5`,
        z: `+= 0.5`,
      })
      .then(() => {
        gsap
          .to(this.experience.camera.instance.position, {
            duration: 0.5,
            x: `-= 0.5`,
            y: `-= 0.5`,
            z: `-= 0.5`,
          })
          .then(() => {
            gsap
              .to(this.material.uniforms.uAlpha, {
                duration: 2,
                value: 0,
              })
              .then(() => {
                this.scene.remove(this.mesh);
              });
          });
      });
  }
}
