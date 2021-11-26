import './style.css';
import Experience from './Experience/Experience';
import MODELS, {
  textPositions,
  modelNames,
} from './Experience/Constants/modelAttributes';
import gsap from 'gsap';

let currentObject = 0;
const jumpDuration = 3;
const experience = new Experience(document.querySelector('canvas.webgl'));
const enterModelButton = `<button id="enter-model-btn">Enter</button>`;
/**
 * Sound effects
 */
const wooshAudio = new Audio('/audio/whoosh.wav');
/**
 * Text
 */
const domTextElement = {
  [`${textPositions.left}`]: document.querySelector('.left.text'),
  [`${textPositions.right}`]: document.querySelector('.right.text'),
};

const hideAllTextDomElement = () => {
  for (const key in domTextElement) {
    domTextElement[key].style.opacity = 0;
  }
};

const fillTextContent = () => {
  const currentTextContent = MODELS[modelNames[currentObject]].text.content;
  const currentTextPosition = MODELS[modelNames[currentObject]].text.position;

  const currentElement = domTextElement[currentTextPosition];
  currentElement.style.opacity = 1;
  currentElement.innerHTML = currentTextContent + enterModelButton;
};
/**
 * Next & Previous buttons
 */
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

const triggerDisabledButton = () => {
  prevBtn.style.display = 'inline-block';
  nextBtn.style.display = 'inline-block';
  // prevBtn
  prevBtn.disabled = currentObject === 0;
  // nextBtn
  nextBtn.disabled = currentObject === Object.keys(MODELS).length - 1;
};

const hideAllButton = () => {
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';
};

const switchModel = () => {
  experience.switchModel(Object.keys(MODELS)[currentObject], jumpDuration);
};

const onSwitchModelButtonClick = () => {
  // Sound
  wooshAudio.currentTime = 0;
  wooshAudio.play();
  // Text
  hideAllTextDomElement();
  // Buttons
  hideAllButton();
  // Experience
  switchModel();
  // After the switch has completed
  setTimeout(() => {
    // Text
    fillTextContent();
    // Buttons
    triggerDisabledButton();
  }, jumpDuration * 1000);
};

prevBtn.onclick = () => {
  currentObject--;
  onSwitchModelButtonClick();
};
nextBtn.onclick = () => {
  currentObject++;
  onSwitchModelButtonClick();
};

/**
 * When screen starts
 */
hideAllButton();
prevBtn.disabled = true;
hideAllTextDomElement();
/**
 * Experience's resources progress event
 */
const loadingContentElement = document.querySelector('#loading-content');
experience.resources.on('progress', () => {
  const loadingRatio = Math.round(
    (experience.resources.loaded * 100) / experience.resources.toLoad
  );
  loadingContentElement.innerHTML = loadingRatio + '%';
  if (loadingRatio === 100) {
    setTimeout(() => {
      loadingContentElement.style.display = 'none';
    }, 1000);
  }
});
/**
 * When all resouces are ready
 */
experience.resources.on('ready', () => {
  prevBtn.style.display = 'inline-block';
  nextBtn.style.display = 'inline-block';

  fillTextContent();
});

// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import * as dat from 'lil-gui';
// import { gsap } from 'gsap';
// import { objectAndViewManager } from './objects';
// import { text, textPositions } from './text';

// //#region Three.js
// /**
//  * Base
//  */
// // Debug
// // const gui = new dat.GUI({ width: 340 });

// // Canvas
// const canvas = document.querySelector('canvas.webgl');

// // Scene
// const scene = new THREE.Scene();

// /**
//  * Water
//  */
// // Geometry
// const waterGeometry = new THREE.PlaneGeometry(200, 200, 128, 128);

// // Material
// const waterMaterial = new THREE.MeshBasicMaterial();

// // Mesh
// const water = new THREE.Mesh(waterGeometry, waterMaterial);
// water.rotation.x = -Math.PI * 0.5;
// // scene.add(water);

// /**
//  * Grid helper
//  */
// const gridHelper = new THREE.GridHelper(200, 200);
// scene.add(gridHelper);

// /**
//  * Axes helper
//  */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// /**
//  * Objects
//  */
// let currentObject = 0;
// // Add all objects to the scene
// // objectAndViewManager.forEach((objectAndView) =>
// //   scene.add(objectAndView.object)
// // );
// let previousObject = objectAndViewManager[0].object;
// scene.add(previousObject);

// /**
//  * Sizes
//  */
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// window.addEventListener('resize', () => {
//   // Update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.copy(objectAndViewManager[0].cameraPosition);
// scene.add(camera);

// // // Controls
// // const controls = new OrbitControls(camera, canvas);
// // controls.enableDamping = true;

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// const mouseNormalizedPosition = {
//   x: 0,
//   y: 0,
// };
// /**
//  * Animate
//  */
// const clock = new THREE.Clock();

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   // // Update controls
//   // controls.update();

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();
// //#endregion

// //#region DOM
// /**
//  * Text
//  */
// const domTextElement = {
//   [`${textPositions.left}`]: document.querySelector('.left.text'),
//   [`${textPositions.right}`]: document.querySelector('.right.text'),
// };

// const hideAllTextDomElement = () => {
//   for (const key in domTextElement) {
//     domTextElement[key].style.opacity = 0;
//   }
// };

// const fillTextContent = () => {
//   const currentTextContent = text[currentObject].content;
//   const currentTextPosition = text[currentObject].position;

//   const currentElement = domTextElement[currentTextPosition];
//   currentElement.style.opacity = 1;
//   currentElement.innerHTML = currentTextContent;
// };
// /**
//  * Resources
//  */
// const wooshAudio = new Audio('/audio/woosh.mp3');
// /**
//  * Next & Previous buttons
//  */
// const prevBtn = document.querySelector('#prev-btn');
// const nextBtn = document.querySelector('#next-btn');

// const triggerDisabledButton = () => {
//   // prevBtn
//   prevBtn.disabled = currentObject === 0;
//   // nextBtn
//   nextBtn.disabled = currentObject === objectAndViewManager.length - 1;
// };

// const moveCameraToDestination = ({ duration }) => {
//   // Remove the object and replace
//   scene.remove(previousObject);

//   const currentPosition = camera.position.clone();
//   const destination =
//     objectAndViewManager[currentObject].cameraPosition.clone();
//   gsap
//     .to(camera.position, {
//       duration,
//       x: `+= ${destination.x - currentPosition.x}`,
//       y: 0.5,
//       z: `+= ${destination.z - currentPosition.z}`,
//     })
//     .then(() => {
//       // Show object
//       const nextObject = objectAndViewManager[currentObject].object;
//       scene.add(nextObject);
//       previousObject = nextObject;
//       // Log camera position
//       console.log(camera.position);
//     });
// };

// const jumpToAnotherObject = () => {
//   const jumpDuration = 2;
//   // Buttons
//   triggerDisabledButton();
//   // Camera
//   moveCameraToDestination({
//     duration: jumpDuration,
//   });
//   // Sound
//   wooshAudio.currentTime = 0;
//   wooshAudio.play();
//   // setTimeout(() => {
//   //   wooshAudio.pause();
//   //   wooshAudio.currentTime = 0;
//   // }, jumpDuration * 1000 + 100);
//   // text
//   hideAllTextDomElement();
//   setTimeout(() => {
//     fillTextContent();
//   }, jumpDuration * 1000);
// };

// prevBtn.onclick = () => {
//   currentObject--;
//   jumpToAnotherObject();
// };
// nextBtn.onclick = () => {
//   currentObject++;
//   jumpToAnotherObject();
// };
// /**
//  * Mouse movement (paralax)
//  */
// window.addEventListener('mousemove', (e) => {
//   mouseNormalizedPosition.x = (e.clientX / window.innerWidth - 0.5) * 2;
//   mouseNormalizedPosition.y = (e.clientY / window.innerWidth - 0.5) * 2;

//   const currentObjectPosition =
//     objectAndViewManager[currentObject].cameraPosition.clone();

//   // camera.position.x = currentObjectPosition.x + mouseNormalizedPosition.x;
//   // camera.position.y = currentObjectPosition.y + mouseNormalizedPosition.y;

//   const duration = 2;
//   gsap
//     .to(camera.position, {
//       duration,
//       x: currentObjectPosition.x - mouseNormalizedPosition.x,
//       y: currentObjectPosition.y + mouseNormalizedPosition.y,
//     })
//     .then(() => {
//       // console.log(camera.position);
//     });
// });
// /**
//  * Startup
//  */
// prevBtn.disabled = true;
// fillTextContent();
// //#endregion
