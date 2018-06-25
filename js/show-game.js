import {games, headerState} from './data.js';
import showStatisticScreen from './stats-module.js';
import getUserResult from './get-user-score.js';
import LevelView from './level-view.js'
import {changeScreen} from './util.js';
import StatsLevelView from './stats-level-view.js';
import LevelLevelView from './header-level-view.js';

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
  header.replaceWith(showHeader(gameState, Limit));
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
  getCurrentGame(gamesArray);responseLimit = currentGame[`response-limit`];
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
    showStatisticScreen(gameAnswers, gameState.lives, getUserResult(gameAnswers, gameState.lives));
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
        showStatisticScreen(gameAnswers, gameState.lives, getUserResult(gameAnswers, gameState.lives));
      } else {
        showGame(false, gameAnswers, gameState);
      }
    }
  }
}
const showHeader = (state, limit) => {
  const levelLevelView =  new LevelLevelView(state, limit);
  return levelLevelView.element;
};
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
const showStats = (answers) => {
  const statsLevelView = new StatsLevelView(answers);
  return statsLevelView.element;
};
const showGame = (isFirstGame, statsArray, lives) => {
  refreshData(isFirstGame, statsArray, lives);
  changeScreen(showLevel(currentGame, actualRoundKey, countOfImage, GameMode));
  const container = document.querySelector(`.central`);
  const footer = document.querySelector(`.footer`);
  container.insertAdjacentElement(`afterbegin`, showHeader(gameState, Limit));
  footer.insertAdjacentElement(`beforeBegin`, showStats(gameAnswers));
};

export default showGame;
