import Router from './router.js';
import RestartModalView from './restart-modal-view.js';
import GameViewFirst from './game-view-1.js';
import GameViewSecond from './game-view-2.js';
import GameViewThird from './game-view-3.js';
import StatsLevelView from './stats-level-view.js';
import HeaderLevelView from './header-level-view.js';
import Footer from './footer-view.js';

const ONE_SECOND = 1000;
const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`,
};
export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.restartModal = new RestartModalView();
    this.restartModal.onConfirm = () => {
      this.stopTimer();
      Router.showGreeting();
    };
    this.getHandler(this.restartModal);
    this.header = new HeaderLevelView(this.model.state);
    this.stats = new StatsLevelView(this.model.answers);
    this._interval = null;
    this.addListener();
  }
  getHandler(setThis) {
    this.onButtonBackClick = function (evt) {
      let target = evt.target;
      let buttonBack = target.closest(`button.back`);

      if (buttonBack) {
        const container = document.querySelector(`.central`);
        container.insertAdjacentElement(`beforeBegin`, setThis.element);
      }
    };
  }
  stopTimer() {
    clearInterval(this._interval);
  }
  resetTimer() {
    this.model.resetTimer();
  }
  startTimer() {
    this._interval = setTimeout(() => {
      this.model.tick();
      this.updateHeader();
      this.startTimer();
    }, ONE_SECOND);
  }
  updateStats() {
    const stats = new StatsLevelView(this.model.answers);
    this.stats.element.replaceWith(stats.element);
    this.stats = stats;
  }
  getStats() {
    const footer = document.querySelector(`.footer`);
    footer.insertAdjacentElement(`beforeBegin`, this.stats.element);
  }
  updateHeader() {
    const header = new HeaderLevelView(this.model.state);
    this.header.element.replaceWith(header.element);
    this.header = header;
  }
  getHeader() {
    const container = document.querySelector(`.central`);
    container.insertAdjacentElement(`afterbegin`, this.header.element);
  }
  getGameModeView(countOfQuestions) {
    let result;
    switch (countOfQuestions) {
      case QuestionType.TWO_OF_TWO :
        result = new GameViewFirst(this.model.currentActualQuestion);
        break;
      case QuestionType.TINDER_LIKE :
        result = new GameViewSecond(this.model.currentActualQuestion);
        break;
      case QuestionType.ONE_OF_THREE :
        result = new GameViewThird(this.model.currentActualQuestion);
        break;
    }
    return result;
  }
  updateGameBody() {
    let gameBody = this.getGameModeView(this.model.currentActualQuestion.type);
    gameBody.onAnswer = (isCorrectAnswers) => {
      this.checkAnswer(isCorrectAnswers);
    };
    this.level.element.replaceWith(gameBody.element);
    this.level = gameBody;
  }
  getGameBody() {
    const footer = new Footer();
    const mainElement = document.querySelector(`.central`);
    this.level = this.getGameModeView(this.model.currentActualQuestion.type);
    this.level.onAnswer = (isCorrectAnswers) => {
      this.checkAnswer(isCorrectAnswers);
    };
    mainElement.innerHTML = ``;
    mainElement.appendChild(this.level.element);
    mainElement.insertAdjacentElement(`beforeend`, footer.element);
  }
  showStatsView() {
    this.removeListener();
    Router.showStats(this.model.answers, this.model.lives, this.model.userResult);
  }
  checkAnswer(isCorrect) {
    this.stopTimer();
    this.model.currentAnswer = isCorrect;
    this.model.getAnswers();

    this.updateStats();
    if (!isCorrect) {
      this.model.reduceLive();
      this.updateHeader();
      if (!this.model.lives) {
        this.showStatsView();
      }
    }
    this.resetTimer();
    if (this.model.isStillQuestion()) {
      this.showGame();
    } else {
      this.showStatsView();
    }
  }
  refreshData(isFirstGame) {
    if (isFirstGame) {
      this.model.restart();
    }
    this.model.getActualQuestion();
  }
  addListener() {
    document.addEventListener(`click`, this.onButtonBackClick);
  }
  removeListener() {
    document.removeEventListener(`click`, this.onButtonBackClick);
  }
  showGame(isFirstGame) {
    this.refreshData(isFirstGame);
    if (isFirstGame) {
      this.getGameBody();
      this.getHeader();
      this.getStats();
    } else {
      this.updateGameBody();
      this.updateHeader();
    }
    this.startTimer();
  }
}
