import {introData} from './data.js';
import {renderScreen, changeScreen} from './util.js';
import greetingScreenElement from './greeting-module.js';

const introScreenMarkup = (state) =>
  `
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> ${state.footnote}</p>
    </div>
  </div>`;

const introScreenElement = renderScreen(introScreenMarkup(introData));
const showScreenTrigger = introScreenElement.querySelector(`.intro__asterisk`);
showScreenTrigger.addEventListener(`click`, () => {
  changeScreen(greetingScreenElement);
});

export default introScreenElement;
