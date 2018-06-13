import {greetingData} from './data.js';
import {renderScreen, changeScreen} from './util.js';
import rulesScreenElement from './rules-module.js';

const greetingScreenMarkup = (state) => `
  <div class="greeting central--blur">
    <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
    <h1 class="greeting__asterisk">*</h1>
    <div class="greeting__challenge">
      <h3>${state.title}</h3>
      <p>${state.rules}</p>
    </div>
    <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
  </div>`;
const greetingScreenElement = renderScreen(greetingScreenMarkup(greetingData));
const showScreenTrigger = greetingScreenElement.querySelector(`.greeting__continue`);
showScreenTrigger.addEventListener(`click`, () => {
  changeScreen(rulesScreenElement);
});

export default greetingScreenElement;
