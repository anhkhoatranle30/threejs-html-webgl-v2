import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import Experience from '../../../Experience';
import ViewPointerEdges from './Edges';
import ToggleMouse from '../../../Utils/ToggleMouse';

const POINTER_STYLE = {
  SIZE: 30,
  MARGIN: 25,
  POSITION: new THREE.Vector3(0, 0, 0),
};

export default class ViewPointer {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.toggleMouse = new ToggleMouse();

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    // ToggleMouse mousedown & mouseup event
    this.toggleMouse.on('mousedown', () => {
      POINTER_STYLE.POSITION = new THREE.Vector3(
        -this.toggleMouse.cursor.x,
        -this.toggleMouse.cursor.y,
        0
      );
      // Update positions
      this.material.uniforms.uOffset.value = POINTER_STYLE.POSITION;
      this.leftEdge.material.uniforms.uOffset.value =
        this.calculateEdgeOffsetVector({ position: 'left' });
      this.rightEdge.material.uniforms.uOffset.value =
        this.calculateEdgeOffsetVector({ position: 'right' });
      this.topEdge.material.uniforms.uOffset.value =
        this.calculateEdgeOffsetVector({ position: 'top' });
      this.bottomEdge.material.uniforms.uOffset.value =
        this.calculateEdgeOffsetVector({ position: 'bottom' });
    });
  }

  calculateEdgeOffsetVector({ position = 'bototm' }) {
    switch (position) {
      case 'left': {
        return new THREE.Vector3(
          POINTER_STYLE.POSITION.x -
            (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN * 2) / window.innerWidth,
          POINTER_STYLE.POSITION.y,
          0
        );
      }
      case 'right': {
        return new THREE.Vector3(
          POINTER_STYLE.POSITION.x +
            (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN * 2) / window.innerWidth,
          POINTER_STYLE.POSITION.y,
          0
        );
      }
      case 'top': {
        return new THREE.Vector3(
          POINTER_STYLE.POSITION.x,
          (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN * 2) / window.innerHeight +
            POINTER_STYLE.POSITION.y,
          0
        );
      }
      default: {
        //bottom
        return new THREE.Vector3(
          POINTER_STYLE.POSITION.x,
          -(POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN * 2) /
            window.innerHeight +
            POINTER_STYLE.POSITION.y,
          0
        );
      }
    }
  }

  setGeometry() {
    this.geometry = new THREE.PlaneBufferGeometry(
      (POINTER_STYLE.SIZE * 2) / window.innerWidth,
      (POINTER_STYLE.SIZE * 2) / window.innerHeight,
      1,
      1
    );
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1.0 },
        uOffset: { value: POINTER_STYLE.POSITION },
      },
      vertexShader,
      fragmentShader,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.leftEdge = new ViewPointerEdges({
      type: 'vertical',
      thickness: 5,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerHeight,
      offset: this.calculateEdgeOffsetVector({ position: 'left' }),
    });
    this.rightEdge = new ViewPointerEdges({
      type: 'vertical',
      thickness: 5,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerHeight,
      offset: this.calculateEdgeOffsetVector({ position: 'right' }),
    });
    this.topEdge = new ViewPointerEdges({
      type: 'horizonal',
      thickness: 5,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerWidth,
      offset: this.calculateEdgeOffsetVector({ position: 'top' }),
    });
    this.bottomEdge = new ViewPointerEdges({
      type: 'horizonal',
      thickness: 5,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerWidth,
      offset: this.calculateEdgeOffsetVector({ position: 'bottom' }),
    });
    this.edges = [this.leftEdge, this.rightEdge, this.topEdge, this.bottomEdge];

    this.scene.add(this.mesh);
  }

  update() {
    this.mesh.lookAt(this.experience.camera);
    this.edges.forEach((edge) => edge.update());
  }

  fadeIn() {
    gsap
      .to(this.material.uniforms.uAlpha, {
        duration: 0.5,
        value: 1.0,
      })
      .then(() => {
        this.scene.remove(this.mesh);
      });
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
