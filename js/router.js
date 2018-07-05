import GameModel from './game-model.js';
import StatsModuleView from './stats-module-view.js';
import GameScreen from './game-screen.js';
import IntroView from './intro-view.js';
import GreetingView from './greeting-view.js';
import RulesView from './rules-view.js';
import ErrorView from './error-view.js';
import Loader from './loader.js';
import changeScreen from './change-screen.js';

let questData;
export default class Router {
  static loadData() {
    Loader.loadData().
    then((data) => {
      questData = data;
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
  static showGameScreen(isFirstGame, playerName) {
    const gameScreen = new GameScreen(new GameModel(questData, playerName));
    gameScreen.showGame(isFirstGame);
  }
  static showStats(model) {
    const resultObject = {
      answers: model.answers,
      lives: model.lives,
      result: model.userResult,
    };
    const playerName = model.playerName;
    Loader.saveResults(resultObject, playerName).
    then(() => Loader.loadResults(playerName)).
    then((data) => {
      const statsModuleView = new StatsModuleView(data);
      changeScreen(statsModuleView.element);
    }).
    catch(Router.showError);
  }
  static showError(err) {
    const errorScreen = new ErrorView(err);
    const containerElement = document.querySelector(`.central`);
    containerElement.insertAdjacentElement(`beforeBegin`, errorScreen.element);
  }
}
