import * as THREE from 'three';

const POSITIONS = {
  droneModel: {
    object: new THREE.Vector3(-1, 0, -2),
    camera: new THREE.Vector3(0, 1, 0),
  },
  object2: {
    object: new THREE.Vector3(-20, 0, 12),
    camera: new THREE.Vector3(-22, 1, 15),
  },
  object3: {
    object: new THREE.Vector3(24, 0, 13),
    camera: new THREE.Vector3(22, 1, 15.5),
  },
};

export default POSITIONS;
