import MODELS, {
  modelNames,
  textPositions,
} from './Experience/Constants/modelAttributes';
import Experience from './Experience/Experience';
import './style.css';

let currentObject = 0;
const jumpDuration = 3;
//#region Select DOM elements
const experience = new Experience(document.querySelector('canvas.webgl'));
// Buttons
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const enterModelButton = document.querySelector('#enter-model-btn');
// Text
const domTextElement = {
  [`${textPositions.left}`]: document.querySelector('.left.text'),
  [`${textPositions.right}`]: document.querySelector('.right.text'),
};
// Forms
const leftForm = document.querySelector('.left.form');
const rightForm = document.querySelector('.right.form');
//#endregion

//#region DOM elements functionalities
//#region Enter/Exit model button
enterModelButton.addEventListener('click', () => {
  const currentButtonContent = enterModelButton.innerHTML;
  const possibleContent = {
    enter: 'Enter',
    exit: 'Exit',
  };

  if (currentButtonContent === possibleContent.enter) {
    // Camera
    experience.camera.focusCurrentModel();
    // Forms
    showAllForms();
    // Text
    hideAllTextDomElement();
    // Buttons
    hideAllButtons();
    // Enter model button
    enterModelButton.style.display = 'inline-block';
    enterModelButton.innerHTML = possibleContent.exit;
  } else {
    // Camera
    experience.camera.loseFocusCurrentModel();
    // Forms
    hideAllForms();
    // Text
    fillTextContent();
    // Buttons
    showAllButtons();
    // Enter model button
    enterModelButton.innerHTML = possibleContent.enter;
  }
});
//#endregion
//#region Sound effects
const wooshAudio = new Audio('/audio/whoosh.wav');
//#endregion
//#region Text
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
  currentElement.innerHTML = currentTextContent;
};
//#endregion
//#region Next & Previous buttons
const showAllButtons = () => {
  prevBtn.style.display = 'inline-block';
  nextBtn.style.display = 'inline-block';
  enterModelButton.style.display = 'inline-block';
};

const triggerDisabledButton = () => {
  showAllButtons();
  // prevBtn
  prevBtn.disabled = currentObject === 0;
  // nextBtn
  nextBtn.disabled = currentObject === Object.keys(MODELS).length - 1;
};

const hideAllButtons = () => {
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';
  enterModelButton.style.display = 'none';
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
  hideAllButtons();
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
//#endregion
//#region Forms
const showAllForms = () => {
  leftForm.style.display = 'block';
  rightForm.style.display = 'block';
};
const hideAllForms = () => {
  leftForm.style.display = 'none';
  rightForm.style.display = 'none';
};
//#endregion
//#endregion

//#region Start - Progress - Ready
/**
 * When screen starts
 */
hideAllButtons();
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
  showAllButtons();

  fillTextContent();
});
//#endregion
