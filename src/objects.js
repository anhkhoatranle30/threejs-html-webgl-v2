import * as THREE from 'three';

// Object1
const object1 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1),
  new THREE.MeshBasicMaterial({
    color: 0x123345,
  })
);
object1.position.set(-1, 0, -2);
// Object2
const object2 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1),
  new THREE.MeshBasicMaterial({
    color: 0xf2451f,
  })
);
object2.position.set(-20, 0, 12);
// Object3
const object3 = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1),
  new THREE.MeshBasicMaterial({
    color: 0x5f2f62,
  })
);
object3.position.set(24, 0, 13);

export const objectAndViewManager = [
  {
    object: object1,
    cameraPosition: new THREE.Vector3(0, 1, 0),
  },
  {
    object: object2,
    cameraPosition: new THREE.Vector3(-22, 1, 15),
  },
  {
    object: object3,
    cameraPosition: new THREE.Vector3(22, 1, 15.5),
  },
];
