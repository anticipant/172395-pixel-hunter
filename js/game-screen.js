import Router from './router.js';
import RestartModalView from './restart-modal-view.js';
import GameViewFirst from './game-view-first.js';
import GameViewSecond from './game-view-second.js';
import GameViewThird from './game-view-third.js';
import StatsLevelView from './stats-level-view.js';
import HeaderLevelView from './header-level-view.js';
import FooterView from './footer-view.js';

const ONE_SECOND = 1000;
const BLINK_TIME = 5;
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
      this.removeListener();
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
    this.onButtonBackClick = (evt) => {
      const target = evt.target;
      const buttonBack = target.closest(`button.back`);

      if (buttonBack) {
        const containerElement = document.querySelector(`.central`);
        containerElement.insertAdjacentElement(`beforeBegin`, setThis.element);
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
      if (this.model.time === BLINK_TIME) {
        this.setBlinkMode(true);
      }
      if (this.model.time === 0) {
        this.checkAnswer(false);
      } else {
        this.startTimer();
      }
    }, ONE_SECOND);
  }
  updateStats() {
    const stats = new StatsLevelView(this.model.answers);
    this.stats.element.replaceWith(stats.element);
    this.stats = stats;
  }
  getStats() {
    const footerElement = document.querySelector(`.footer`);
    footerElement.insertAdjacentElement(`beforeBegin`, this.stats.element);
  }
  updateHeader() {
    const header = new HeaderLevelView(this.model.state);
    this.header.element.replaceWith(header.element);
    this.header = header;
  }
  getHeader() {
    const containerElement = document.querySelector(`.central`);
    containerElement.insertAdjacentElement(`afterbegin`, this.header.element);
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
    const gameBody = this.getGameModeView(this.model.currentActualQuestion.type);
    gameBody.onAnswer = (isCorrectAnswers) => {
      this.checkAnswer(isCorrectAnswers);
    };
    this.level.element.replaceWith(gameBody.element);
    this.level = gameBody;
  }
  getGameBody() {
    const footer = new FooterView();
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
    Router.showStats(this.model);
  }
  setBlinkMode(mode) {
    document.querySelector(`.central`).classList.toggle(`blink`, mode);
  }
  checkAnswer(isCorrect) {
    this.stopTimer();
    this.setBlinkMode(false);
    this.model.currentAnswer = isCorrect;
    this.model.updateAnswersData();
    this.updateStats();
    if (!isCorrect) {
      this.model.reduceLive();
      if (this.model.lives >= 0) {
        this.updateHeader();
      }
    }
    this.resetTimer();
    if (this.model.isStillQuestion() && this.model.lives >= 0) {
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
