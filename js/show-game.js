import GameModel from './game-model.js';
import showStatisticScreen from './stats-module.js';
import LevelView from './level-view.js';
import changeScreen from './util.js';
import StatsLevelView from './stats-level-view.js';
import LevelLevelView from './header-level-view.js';

const gameModel = new GameModel();
const ONE_SECOND = 1000;
let timer;
export const tick = (state) => {
  const time = state.time + 1;
  return Object.assign({}, state, {
    time
  });
};
export const resetTimer = (state) => {
  return Object.assign({}, state, {
    time: 0,
  });
};
export const stopTimer = () => {
  clearTimeout(timer);
};
const startTimer = () => {
  timer = setTimeout(() => {
    gameModel.tick();
    updateHeader();
    startTimer();
  }, ONE_SECOND);
};

function showNextRound() {
  gameModel.getActualRoundKey();
  const gameBlock = document.querySelector(`.game`);
  gameBlock.replaceWith(showLevel(gameModel.currentGame, gameModel.actualRoundKey));
  updateHeader();
  startTimer();
}
function updateHeader() {
  const header = document.querySelector(`.header`);
  header.replaceWith(showHeader(gameModel.state));
}
function updateStats() {
  const stats = document.querySelector(`div.stats`);
  stats.replaceWith(showStats(gameModel.answers));
}
function refreshData(isFirstGame) {
  if (isFirstGame) {
    gameModel.restart();
  }
  gameModel.getGame();
  gameModel.getRoundKeys();
  gameModel.getActualRoundKey();
}
function checkAnswer(isCorrect) {
  stopTimer();
  gameModel.currentAnswer = isCorrect;
  gameModel.getAnswers();
  if (isCorrect) {
    updateStats();
  } else {
    gameModel.reduceLive();
    updateHeader();
    updateStats();
    if (!gameModel.lives) {
      showStatisticScreen(gameModel.answers, gameModel.lives);
    }
  }
  gameModel.resetTimer();
  if (gameModel.lives) {
    if (gameModel.isAvailableRound()) {
      showNextRound();
    } else {
      if (gameModel.games.length === 0) {
        showStatisticScreen(gameModel.answers, gameModel.lives);
      } else {
        showGame(false);
      }
    }
  }
}
const showHeader = (state) => {
  return new LevelLevelView(state).element;
};
const showLevel = (state, level) => {
  const levelView = new LevelView(state, level);
  levelView.onAnswer = (isCorrectAnswers) => {
    checkAnswer(isCorrectAnswers);
  };
  return levelView.element;
};
const showStats = (answers) => {
  const statsLevelView = new StatsLevelView(answers);
  return statsLevelView.element;
};
const showGame = (isFirstGame) => {
  refreshData(isFirstGame);
  changeScreen(showLevel(gameModel.currentGame, gameModel.actualRoundKey));
  const container = document.querySelector(`.central`);
  const footer = document.querySelector(`.footer`);
  container.insertAdjacentElement(`afterbegin`, showHeader(gameModel.state));
  footer.insertAdjacentElement(`beforeBegin`, showStats(gameModel.answers));
  startTimer();
};

export default showGame;
