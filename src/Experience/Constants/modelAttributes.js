import * as THREE from 'three';

const textPositions = {
  right: 'right',
  left: 'left',
};

const POSITIONS = {
  droneModel: {
    position: new THREE.Vector3(0, 0, 0.3),
    camera: new THREE.Vector3(0.65, 0.1, 0.5),
    scale: 0.005,
    rotation: Math.PI * 0.3,
    text: {
      position: textPositions.right,
      content: `1. The Dronebuster® is a compact, light-weight, cost-effective CUAS tool that can defeat COTS drone threats. The system readily converts from an integrated, fixed site jammer into a man-portable jammer for dismounted troops, security teams and first responders to use during fluid, ambiguous, fast-paced encounters.`,
    },
  },
  mazdaCar: {
    position: new THREE.Vector3(-20, 0, 12),
    camera: new THREE.Vector3(-22, 1, 15),
    scale: 0.005,
    rotation: Math.PI * 0.3,
    text: {
      position: textPositions.right,
      content: `2. The Dronebuster® is a compact, light-weight, cost-effective CUAS tool that can defeat COTS drone threats. The system readily converts from an integrated, fixed site jammer into a man-portable jammer for dismounted troops, security teams and first responders to use during fluid, ambiguous, fast-paced encounters.`,
    },
  },
};

export default POSITIONS;
