import * as THREE from 'three';

export const textPositions = {
  right: 'right',
  left: 'left',
};

const MODELS = {
  mazdaCar: {
    position: new THREE.Vector3(-200, 3.5, 120),
    camera: {
      position: new THREE.Vector3(-190, 1.75, 128),
      lookAt: new THREE.Vector3(-190, 1.75, 120),
    },
    scale: 2,
    rotation: Math.PI * 0.15,
    text: {
      position: textPositions.right,
      content: `1. The Mazda RX-7 is a front/mid-engine, rear-wheel-drive, rotary engine-powered sports car that was manufactured and marketed by Mazda from 1978 to 2002 across three generations, all of which made use of a compact, lightweight Wankel rotary engine.`,
    },
  },
  droneModel: {
    position: new THREE.Vector3(0, 0.3, 0.3),
    camera: {
      position: new THREE.Vector3(1, 0.01, 0.95),
      lookAt: new THREE.Vector3(0, 0.05, 0),
    },
    scale: 0.0075,
    rotation: Math.PI * 0.3,
    text: {
      position: textPositions.right,
      content: `2. The Dronebuster® is a compact, light-weight, cost-effective CUAS tool that can defeat COTS drone threats. The system readily converts from an integrated, fixed site jammer into a man-portable jammer for dismounted troops, security teams and first responders to use during fluid, ambiguous, fast-paced encounters.`,
    },
  },
  heliBall: {
    position: new THREE.Vector3(240, 1, -130),
    camera: {
      position: new THREE.Vector3(242.5, 1.25, -132.5),
      lookAt: new THREE.Vector3(240, 1, -125),
    },
    scale: 10,
    rotation: 0,
    text: {
      position: textPositions.left,
      content: `3. This Heli Ball all is easy to operate and fly. It is assembled and ready to lift off! Amazing, exciting and advanced infrared control toy!`,
    },
  },
};

export default MODELS;

export const modelNames = Object.keys(MODELS);
