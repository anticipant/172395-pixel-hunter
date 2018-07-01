import GameModel from './game-model.js';
import StatsModuleView from './stats-module-view.js';
import GameScreen from './show-game.js';
import IntroView from './intro-view.js';
import GreetingView from './greeting-view.js';
import RulesView from './rules-view.js';


import changeScreen from './util.js';

export default class Router {
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
    const gameScreen = new GameScreen(new GameModel());
    gameScreen.showGame(isFirstGame);
  }
  static showStats(answers, lives, userResult) {
    const statsModuleView = new StatsModuleView(answers, lives, userResult);
    changeScreen(statsModuleView.element);
  }
}
