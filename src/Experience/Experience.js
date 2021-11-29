import * as THREE from 'three';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World/World';
import sources from './sources';
import Resources from './Utils/Resources';
import Debug from './Utils/Debug';
import Parallax from './Utils/Parallax';

let instance = null;

export default class Experience {
  constructor(canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;
    // Global
    // window.experience = this;
    // Bind
    this.canvas = canvas;
    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.parallax = new Parallax();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(sources);
    this.world = new World();

    // Size resize events
    this.sizes.on('resize', () => {
      this.resize();
    });
    // Time tick event
    this.time.on('tick', () => {
      this.update();
    });
    // Parallax mousemove event
    this.parallax.on('mousemove', () => {
      this.moveByCursor();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.world.update();
    this.renderer.update();
  }

  moveByCursor() {
    this.camera.moveByCursor(this.parallax.cursor);
  }

  focusCurrentModel() {
    // Camera
    this.camera.focusCurrentModel();
    this.camera.isControlEnabled = false;
    // World
    this.world.viewPointer.activate();
  }

  loseFocusCurrentModel() {
    // Camera
    this.camera.loseFocusCurrentModel();
    this.camera.isControlEnabled = true;
    // World
    this.world.viewPointer.deactivate();
  }

  switchModel(strModelName, jumpDuration) {
    this.camera.moveToModel(strModelName, jumpDuration);
  }
}
