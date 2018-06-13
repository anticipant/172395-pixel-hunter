import {rulesData} from './data.js';
import {renderScreen, changeScreen} from './util.js';
import showFirstGame from './game-1-module.js';

function checkInputValue(targetInput) {
  return targetInput.value.length;
}
const rulesScreenMarkup = (state) => `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>
  <div class="rules">
    <h1 class="rules__title">${state.title}</h1>
    <p class="rules__description">${state.description}</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="${state.placeholder}">
      <button class="rules__button  continue" type="submit" disabled>${state.submitText}</button>
    </form>
  </div>`;
const rulesScreenElement = renderScreen(rulesScreenMarkup(rulesData));
const rulesInput = rulesScreenElement.querySelector(`.rules__input`);
rulesInput.addEventListener(`keyup`, (evt) => {
  showScreenTrigger.disabled = !(checkInputValue(evt.target) > 0);
});
const showScreenTrigger = rulesScreenElement.querySelector(`.rules__button`);
showScreenTrigger.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  showFirstGame();
});

export default rulesScreenElement;
