import * as THREE from 'three';
import gsap from 'gsap';
import Experience from '../../Experience.js';

export default class Overlay {
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
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1 },
      },
      vertexShader: `
            void main()
            {
                gl_Position = vec4(position, 1.0);
            }
        `,
      fragmentShader: `
            uniform float uAlpha;
            void main()
            {
                gl_FragColor = vec4(0.5, 0.2, 0.3, uAlpha);
            }
        `,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  fadeOut() {
    gsap.to(this.material.uniforms.uAlpha, {
      duration: 3,
      value: 0,
      delay: 1,
    });
  }
}
