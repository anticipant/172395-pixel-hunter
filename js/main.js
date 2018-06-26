import changeScreen from './util.js';
import showGame from './show-game.js';
import IntroView from './intro-view.js';
import GreetingView from './greeting-view.js';
import RulesView from './rules-view.js';

const intro = new IntroView();
changeScreen(intro.element);
intro.onClick = () => (changeScreen(greeting.element));
const greeting = new GreetingView();
greeting.onClick = () => (changeScreen(rules.element));
const rules = new RulesView();
rules.onClick = () => (showGame(true));

document.addEventListener(`click`, (evt) => {
  let target = evt.target;
  let buttonBack = target.closest(`button.back`);

  if (buttonBack) {
    changeScreen(greeting.element);
  }
});
