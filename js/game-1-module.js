import {games, headerState} from './data.js';
import showStatisticScreen from './stats-module.js';
import LevelView from './level-view.js'
import {changeScreen, renderScreen} from './util.js';

let responseLimit;
const Limit = {
  LIVES: 3,
  TIME: 30,
  FAST_TIME: 10,
  SLOW_TIME: 20,
};
const GameMode = {
  SINGLE: 1,
  DOUBLE: 2,
  TRIPLE: 3
};
let gamesArray;
let currentGame;
let countOfImage;
let gameState;
let roundKeys;
let actualRoundKey;
let numberOfResponses = [];
let gameAnswers = [];
let countOfAnswers = 0;
let userAnswers = [];

function getCurrentGame(arrayOfGames) {
  currentGame = arrayOfGames.shift();
}
function setActualRoundKey() {
  actualRoundKey = roundKeys.shift();
}
function showNextRound() {
  numberOfResponses = [];
  userAnswers = [];
  setActualRoundKey();
  const gameBlock = document.querySelector(`.game`);
  gameBlock.replaceWith(showLevel(currentGame, actualRoundKey, countOfImage, GameMode));
}
function checkCountOfAnswers(clickedAnswerKey, clickedAnswerValue) {
  if (numberOfResponses.indexOf(clickedAnswerKey) < 0) {
    userAnswers.push({
      answerKey: clickedAnswerKey,
      answerValue: clickedAnswerValue,
    });
    numberOfResponses.push(clickedAnswerKey);
  }
  return numberOfResponses.length;
}
function updateNumberOfLives() {
  const header = document.querySelector(`.header`);
  const newHeader = renderScreen(headerMarkup(gameState));
  header.replaceWith(newHeader);
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
  const newStats = renderScreen(statsMarkup(gameAnswers));
  stats.replaceWith(newStats);
}
function refreshData(isFirstGame, statsArray, lives) {
  if (isFirstGame) {
    gamesArray = games.slice(); // скопировал массив игр
    gameState = Object.assign({}, headerState);
    gameAnswers = [];
  } else {
    gameState = Object.assign({}, lives);
    gameAnswers = statsArray;
  }
  getCurrentGame(gamesArray); // помешаю в currentGame текущую игру из скопированного массива игр
  responseLimit = currentGame[`response-limit`];
  numberOfResponses = [];
  roundKeys = [];
  userAnswers = [];
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
function checkAnswer(answers) {
  let isCorrectAnswers = answers.every((it) => {
    return currentGame.questions[actualRoundKey].answers[it.answerKey][it.answerValue];
  });

  if (isCorrectAnswers) {
    updateStats(true, 15);
  } else {
    updateStats(false, 14);
    reduceLive(gameState);
  }
  if (countOfAnswers === responseLimit && gameState.lives) {
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
const headerMarkup = (state) => `
<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">NN</h1>
    <div class="game__lives">
    ${new Array(Limit.LIVES - state.lives)
  .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    ${new Array(state.lives)
  .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    </div>
  </header>`;
const showLevel = (state, level, countOfQuestion, GameMode) => {
  const levelView = new LevelView(state, level, countOfQuestion, GameMode);
  levelView.onAnswer = (answerKey, answerValue) => {
    countOfAnswers = checkCountOfAnswers(answerKey, answerValue);
    if (countOfAnswers === responseLimit) {
      checkAnswer(userAnswers);
    }
  };
  return levelView.element;
};
const statsMarkup = (answers) => `
  <div class="stats">
    <ul class="stats">
    ${answers.map((it) => `<li class="stats__result stats__result&#45;&#45;${it.statsResult}"></li>`).join(``)}
    ${new Array(10 - answers.length)
  .fill(`<li class="stats__result stats__result&#45;&#45;unknown"></li>`).join(``)}
    </ul>
  </div>`;
const showGame = (isFirstGame, statsArray, lives) => {

  refreshData(isFirstGame, statsArray, lives);
  changeScreen(showLevel(currentGame, actualRoundKey, countOfImage, GameMode));
  const container = document.querySelector(`.central`);

  container.insertAdjacentElement(`afterbegin`, renderScreen(headerMarkup(gameState)));
  container.insertAdjacentElement(`beforeend`, renderScreen(statsMarkup(gameAnswers)));
};

export default showGame;
