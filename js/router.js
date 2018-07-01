import GameModel from './game-model.js';
import StatsModuleView from './stats-module-view.js';
import GameScreen from './show-game.js';
import IntroView from './intro-view.js';
import GreetingView from './greeting-view.js';
import RulesView from './rules-view.js';
import ErrorView from './error-view.js';
import adaptServerData from './data-adapter.js';
import changeScreen from './util.js';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};
let questData;
export default class Router {
  static loadData() {
    window.fetch(`https://es.dump.academy/pixel-hunter/questions`).
    then(checkStatus).
    then((response) => response.json()).
    then((data) => {
      questData = adaptServerData(data);
    }).
    then(() => Router.showIntro()).
    catch(Router.showError);
  }
  static showIntro() {
    const intro = new IntroView();
    changeScreen(intro.element);
  }
  static showGreeting() {
    const greeting = new GreetingView();
    changeScreen(greeting.element);
  }
  static showRules() {
    const rules = new RulesView();
    changeScreen(rules.element);
  }
  static showGameScreen(isFirstGame) {
    const gameScreen = new GameScreen(new GameModel(questData));
    gameScreen.showGame(isFirstGame);
  }
  static showStats(answers, lives, userResult) {
    const statsModuleView = new StatsModuleView(answers, lives, userResult);
    changeScreen(statsModuleView.element);
  }
  static showError(err) {
    const errorScreen = new ErrorView(err);
    const container = document.querySelector(`.central`);
    container.insertAdjacentElement(`beforeBegin`, errorScreen.element);
  }
}
