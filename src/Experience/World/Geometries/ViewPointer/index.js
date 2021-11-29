import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import Experience from '../../../Experience';
import ViewPointerEdges from './Edges';

const POINTER_STYLE = {
  SIZE: 100,
  MARGIN: 50,
};

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
    this.geometry = new THREE.PlaneBufferGeometry(
      POINTER_STYLE.SIZE / window.innerWidth,
      POINTER_STYLE.SIZE / window.innerHeight,
      1,
      1
    );
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

    const leftEdge = new ViewPointerEdges({
      type: 'vertical',
      thickness: 5,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerHeight,
      offset: new THREE.Vector3(
        -(POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerWidth,
        0,
        0
      ),
    });
    const rightEdge = new ViewPointerEdges({
      type: 'vertical',
      thickness: 5,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerHeight,
      offset: new THREE.Vector3(
        (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerWidth,
        0,
        0
      ),
    });
    const topEdge = new ViewPointerEdges({
      type: 'horizonal',
      thickness: 5,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerWidth,
      offset: new THREE.Vector3(
        0,
        (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerHeight,
        0
      ),
    });
    const bottomEdge = new ViewPointerEdges({
      type: 'horizonal',
      thickness: 5,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerWidth,
      offset: new THREE.Vector3(
        0,
        -(POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerHeight,
        0
      ),
    });
    this.edges = [leftEdge, rightEdge, topEdge, bottomEdge];

    this.scene.add(this.mesh);
  }

  update() {
    this.mesh.lookAt(this.experience.camera);
    this.edges.forEach((edge) => edge.update());
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
