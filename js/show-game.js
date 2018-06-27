import {games, headerState} from './data.js';
import showStatisticScreen from './stats-module.js';
import {Limit} from './get-user-score.js';
import LevelView from './level-view.js';
import changeScreen from './util.js';
import StatsLevelView from './stats-level-view.js';
import LevelLevelView from './header-level-view.js';

let responseLimit;
let gamesArray;
let currentGame;
let countOfImage;
let gameState;
let roundKeys;
let actualRoundKey;
let gameAnswers = [];

function getCurrentGame(arrayOfGames) {
  currentGame = arrayOfGames.shift();
}
function setActualRoundKey() {
  actualRoundKey = roundKeys.shift();
}
function showNextRound() {
  setActualRoundKey();
  const gameBlock = document.querySelector(`.game`);
  gameBlock.replaceWith(showLevel(currentGame, actualRoundKey, countOfImage));
}
function updateNumberOfLives() {
  const header = document.querySelector(`.header`);
  header.replaceWith(showHeader(gameState));
}
function updateStats(answerResult, timeResult) {
  let result;

  if (answerResult) {
    if (timeResult < Limit.FAST_TIME) {
      result = `fast`;
    } else if (Limit.TIME >= timeResult && timeResult >= Limit.SLOW_TIME) {
      result = `slow`;
    } else {
      result = `correct`;
    }
  } else {
    result = `wrong`;
  }
  gameAnswers.push({answer: answerResult, time: timeResult, statsResult: result});
  const stats = document.querySelector(`div.stats`);
  stats.replaceWith(showStats(gameAnswers));
}
function refreshData(isFirstGame, statsArray, lives) {
  if (isFirstGame) {
    gamesArray = games.slice();
    gameState = Object.assign({}, headerState);
    gameAnswers = [];
  } else {
    gameState = Object.assign({}, lives);
    gameAnswers = statsArray;
  }
  getCurrentGame(gamesArray);
  responseLimit = currentGame[`response-limit`];
  roundKeys = [];
  for (let key in currentGame.questions) {
    if (key) {
      roundKeys.push(key);
    }
  }
  setActualRoundKey();
  countOfImage = currentGame.questions[actualRoundKey].imagesPathArray.length;
}
function isFinished(lives) {
  if (!lives) {
    showStatisticScreen(gameAnswers, gameState.lives);
  }
}
function reduceLive(livesState) {
  livesState.lives = livesState.lives - 1;
  updateNumberOfLives();
  isFinished(livesState.lives);
}
function checkAnswer(isCorrect) {
  if (isCorrect) {
    updateStats(true, 15);
  } else {
    updateStats(false, 14);
    reduceLive(gameState);
  }
  if (gameState.lives) {
    if (roundKeys.length) {
      showNextRound();
    } else {
      if (gamesArray.length === 0) {
        showStatisticScreen(gameAnswers, gameState.lives);
      } else {
        showGame(false, gameAnswers, gameState);
      }
    }
  }
}
const showHeader = (state) => {
  const levelLevelView = new LevelLevelView(state);
  return levelLevelView.element;
};
const showLevel = (state, level, countOfQuestion) => {
  const levelView = new LevelView(state, level, countOfQuestion);
  levelView.onAnswer = (isCorrectAnswers) => {
    checkAnswer(isCorrectAnswers);
  };
  return levelView.element;
};
const showStats = (answers) => {
  const statsLevelView = new StatsLevelView(answers);
  return statsLevelView.element;
};
const showGame = (isFirstGame, statsArray, lives) => {
  refreshData(isFirstGame, statsArray, lives);
  changeScreen(showLevel(currentGame, actualRoundKey, countOfImage));
  const container = document.querySelector(`.central`);
  const footer = document.querySelector(`.footer`);
  container.insertAdjacentElement(`afterbegin`, showHeader(gameState));
  footer.insertAdjacentElement(`beforeBegin`, showStats(gameAnswers));
};

export default showGame;
