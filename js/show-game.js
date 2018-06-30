import Router from './router.js';
import RestartModalView from './restart-modal-view.js';
import LevelView from './level-view.js';
import StatsLevelView from './stats-level-view.js';
import HeaderLevelView from './header-level-view.js';
import Footer from './footer-view.js';

const ONE_SECOND = 1000;
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
  updateGameBody() {
    const gameBody = new LevelView(this.model.currentActualQuestion);
    gameBody.onAnswer = (isCorrectAnswers) => {
      this.checkAnswer(isCorrectAnswers);
    };
    this.level.element.replaceWith(gameBody.element);
    this.level = gameBody;
  }
  getGameBody() {
    const footer = new Footer();
    const mainElement = document.querySelector(`.central`);
    this.level = new LevelView(this.model.currentActualQuestion);
    this.level.onAnswer = (isCorrectAnswers) => {
      this.checkAnswer(isCorrectAnswers);
    };
    mainElement.innerHTML = ``;
    mainElement.appendChild(this.level.element);
    mainElement.insertAdjacentElement(`beforeend`, footer.element);
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
        this.removeListener();
        Router.showStats(this.model.answers, this.model.lives, this.model.userResult);
      }
    }
    this.resetTimer();
    if (this.model.lives) {
      if (this.model.isStillQuestion()) {
        this.showNextRound();
      } else {
        this.removeListener();
        Router.showStats(this.model.answers, this.model.lives, this.model.userResult);
      }
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
  showNextRound() {
    this.refreshData();
    this.updateGameBody();
    this.updateHeader();
    this.startTimer();
  }
  showGame(isFirstGame) {
    this.refreshData(isFirstGame);
    this.getGameBody();
    this.getHeader();
    this.getStats();
    this.startTimer();
  }
}
