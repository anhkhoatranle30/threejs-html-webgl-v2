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
    position: new THREE.Vector3(-20, 4, 12),
    camera: new THREE.Vector3(-16, 1.75, 23),
    scale: 2,
    rotation: 0,
    text: {
      position: textPositions.right,
      content: `2. The Mazda RX-7 is a front/mid-engine, rear-wheel-drive, rotary engine-powered sports car that was manufactured and marketed by Mazda from 1978 to 2002 across three generations, all of which made use of a compact, lightweight Wankel rotary engine.`,
    },
  },
  heliBall: {
    position: new THREE.Vector3(24, 1, 13),
    camera: new THREE.Vector3(26, 1, 15),
    scale: 10,
    rotation: 0,
    text: {
      position: textPositions.left,
      content: `3. The Mazda RX-7 is a front/mid-engine, rear-wheel-drive, rotary engine-powered sports car that was manufactured and marketed by Mazda from 1978 to 2002 across three generations, all of which made use of a compact, lightweight Wankel rotary engine.`,
    },
  },
};

export default POSITIONS;
