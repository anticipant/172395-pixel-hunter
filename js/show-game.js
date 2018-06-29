import Router from './router.js';
import LevelView from './level-view.js';
import StatsLevelView from './stats-level-view.js';
import HeaderLevelView from './header-level-view.js';
import Footer from './footer-view.js';

const ONE_SECOND = 1000;
export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderLevelView(this.model.state);
    this.stats = new StatsLevelView(this.model.answers);
    this._interval = null;
    this.addListener();
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
    const gameBody = new LevelView(this.model.currentGame, this.model.actualRoundKey);
    gameBody.onAnswer = (isCorrectAnswers) => {
      this.checkAnswer(isCorrectAnswers);
    };
    this.level.element.replaceWith(gameBody.element);
    this.level = gameBody;
  }
  getGameBody() {
    const footer = new Footer();
    const mainElement = document.querySelector(`.central`);
    this.level = new LevelView(this.model.currentGame, this.model.actualRoundKey);
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
    if (isCorrect) {
      this.updateStats();
    } else {
      this.model.reduceLive();
      this.updateHeader();
      this.updateStats();
      if (!this.model.lives) {
        Router.showStats(this.model.answers, this.model.lives, this.model.userResult);
      }
    }
    this.resetTimer();
    if (this.model.lives) {
      if (this.model.isAvailableRound()) {
        this.showNextRound();
      } else {
        if (this.model.games.length === 0) {
          Router.showStats(this.model.answers, this.model.lives, this.model.userResult);
        } else {
          this.showGame(false);
        }
      }
    }
  }
  refreshData(isFirstGame) {
    if (isFirstGame) {
      this.model.restart();
    }
    this.model.getGame();
    this.model.getRoundKeys();
    this.model.getActualRoundKey();
  }
  addListener() {
    document.addEventListener(`click`, (evt) => {
      let target = evt.target;
      let buttonBack = target.closest(`button.back`);

      if (buttonBack) {
        this.stopTimer();
        Router.showGreeting();
      }
    });
  }
  showNextRound() {
    this.model.getActualRoundKey();
    this.updateGameBody();
    this.updateHeader();
    this.startTimer();
  }
  showGame(isFirstGame) {
    this.refreshData(isFirstGame);
    if (isFirstGame) {
      this.updateHeader();
      this.updateStats();
    }
    this.getGameBody();
    this.getHeader();
    this.getStats();
    this.startTimer();
  }
}
