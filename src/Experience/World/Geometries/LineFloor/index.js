import * as THREE from 'three';
import Experience from '../../../Experience';

export default class LineFloor {
  constructor(length = 1, lengthSegments = 1) {
    this.length = length;
    this.lengthSegments = lengthSegments;

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setLine();
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry();
    this.points = [];

    // Horizonal
    let count = 0;
    for (
      let z = -this.length;
      z <= this.length;
      z += (this.length * 2) / this.lengthSegments
    ) {
      const leftPoint = new THREE.Vector3(this.length, 0, z);
      const rightPoint = new THREE.Vector3(-this.length, 0, z);
      if (count % 2 === 0) {
        this.points.push(leftPoint, rightPoint);
      } else {
        this.points.push(rightPoint, leftPoint);
      }
      count++;
    }
    // Veritcal
    count = 0;
    for (
      let x = -this.length;
      x <= this.length;
      x += (this.length * 2) / this.lengthSegments
    ) {
      const topPoint = new THREE.Vector4(x, 0, this.length, 2);
      const bottomPoint = new THREE.Vector4(x, 0, -this.length, 2);
      if (count % 2 === 0) {
        this.points.push(topPoint, bottomPoint);
      } else {
        this.points.push(bottomPoint, topPoint);
      }
      count++;
    }

    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
  }

  setMaterial() {
    this.material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
    });
  }

  setLine() {
    this.line = new THREE.LineSegments(this.geometry, this.material);
    this.line.position.y = -0.5;
    this.scene.add(this.line);
  }
}
