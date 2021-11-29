import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import Experience from '../../../Experience';
import ViewPointerEdges from './Edges';
import ToggleMouse from '../../../Utils/ToggleMouse';
import Coordinate2D from '../../../Utils/Coordinate2D';

const POINTER_STYLE = {
  SIZE: 30,
  MARGIN: 25,
  POSITION: new THREE.Vector3(0, 0, 0),
  EDGES: {
    THICKNESS: 3,
  },
};

export default class ViewPointer {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.toggleMouse = new ToggleMouse();
    this.isActivated = false;
    this.currentPosition = 'none';

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.setEdges();
    this.hideAll();
    // ToggleMouse mousedown & mouseup event
    this.toggleMouse.on('mousedown', () => {
      POINTER_STYLE.POSITION = new THREE.Vector3(
        -this.toggleMouse.cursor.x,
        -this.toggleMouse.cursor.y,
        0
      );
      if (this.isActivated) {
        this.showAll();
        // Setup
        this.updateAllPositions();
        // mousemove event
        this.toggleMouse.on('mousemove', () => {
          const deltaY =
            ((-this.toggleMouse.cursor.y - POINTER_STYLE.POSITION.y) *
              window.innerHeight) /
            2;
          const deltaX =
            ((-this.toggleMouse.cursor.x - POINTER_STYLE.POSITION.x) *
              window.innerWidth) /
            2;
          const delta =
            POINTER_STYLE.SIZE / 2 +
            POINTER_STYLE.MARGIN +
            POINTER_STYLE.EDGES.THICKNESS;

          if (Math.abs(deltaX) >= delta || Math.abs(deltaY) >= delta) {
            const direction = Coordinate2D.findDirection(
              POINTER_STYLE.POSITION,
              {
                x: -this.toggleMouse.cursor.x,
                y: -this.toggleMouse.cursor.y,
              }
            );
            if (direction !== this.currentPosition) {
              this.currentPosition = direction;
              console.log(this.currentPosition);
            }
          }

          // size / 2 + margin + thickness
        });
      }
    });

    this.toggleMouse.on('mouseup', () => {
      this.hideAll();
      this.toggleMouse.off('mousemove');
    });
  }

  calculateEdgeOffsetVector({ position = 'bottom' }) {
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

  updateAllPositions() {
    this.material.uniforms.uOffset.value = POINTER_STYLE.POSITION;
    this.leftEdge.material.uniforms.uOffset.value =
      this.calculateEdgeOffsetVector({ position: 'left' });
    this.rightEdge.material.uniforms.uOffset.value =
      this.calculateEdgeOffsetVector({ position: 'right' });
    this.topEdge.material.uniforms.uOffset.value =
      this.calculateEdgeOffsetVector({ position: 'top' });
    this.bottomEdge.material.uniforms.uOffset.value =
      this.calculateEdgeOffsetVector({ position: 'bottom' });
  }

  hideAll() {
    this.material.uniforms.uAlpha.value = 0;
    this.leftEdge.material.uniforms.uAlpha.value = 0;
    this.rightEdge.material.uniforms.uAlpha.value = 0;
    this.topEdge.material.uniforms.uAlpha.value = 0;
    this.bottomEdge.material.uniforms.uAlpha.value = 0;
  }

  showAll() {
    this.material.uniforms.uAlpha.value = 1.0;
    this.leftEdge.material.uniforms.uAlpha.value = 1.0;
    this.rightEdge.material.uniforms.uAlpha.value = 1.0;
    this.topEdge.material.uniforms.uAlpha.value = 1.0;
    this.bottomEdge.material.uniforms.uAlpha.value = 1.0;
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
        uAlpha: { value: this.isActivated ? 1.0 : 0 },
        uOffset: { value: POINTER_STYLE.POSITION },
      },
      vertexShader,
      fragmentShader,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  setEdges() {
    this.leftEdge = new ViewPointerEdges({
      type: 'vertical',
      thickness: POINTER_STYLE.EDGES.THICKNESS,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerHeight,
      offset: this.calculateEdgeOffsetVector({ position: 'left' }),
    });
    this.rightEdge = new ViewPointerEdges({
      type: 'vertical',
      thickness: POINTER_STYLE.EDGES.THICKNESS,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerHeight,
      offset: this.calculateEdgeOffsetVector({ position: 'right' }),
    });
    this.topEdge = new ViewPointerEdges({
      type: 'horizonal',
      thickness: POINTER_STYLE.EDGES.THICKNESS,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerWidth,
      offset: this.calculateEdgeOffsetVector({ position: 'top' }),
    });
    this.bottomEdge = new ViewPointerEdges({
      type: 'horizonal',
      thickness: POINTER_STYLE.EDGES.THICKNESS,
      depth: (POINTER_STYLE.SIZE + POINTER_STYLE.MARGIN) / window.innerWidth,
      offset: this.calculateEdgeOffsetVector({ position: 'bottom' }),
    });
    this.edges = [this.leftEdge, this.rightEdge, this.topEdge, this.bottomEdge];
  }

  update() {
    this.mesh.lookAt(this.experience.camera);
    this.edges.forEach((edge) => edge.update());
  }

  activate() {
    this.isActivated = true;
  }

  deactivate() {
    this.isActivated = false;
  }
}
