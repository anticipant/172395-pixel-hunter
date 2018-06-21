import {games, headerState} from './data.js';
import showStatisticScreen from './stats-module.js';
import {renderScreen, changeScreen, getElementFromTemplate} from './util.js';

let responseLimit;
const Limit = {
  LIVES: 3,
  TIME: 30,
  FAST_TIME: 10,
  SLOW_TIME: 20,
};
let gamesArray;
let currentGame;
let countOfImage;
let gameState;
let roundKeys;
let actualRoundKey;
let numberOfResponses = [];
let gameAnswers = [];

function getCurrentGame(arrayOfGames) {
  currentGame = arrayOfGames.shift();
}
function setActualRoundKey() {
  actualRoundKey = roundKeys.shift();
}
function showNextRound() {
  numberOfResponses = [];
  setActualRoundKey();
  const gameBlock = document.querySelector(`.game`);
  const newGameBlock = getElementFromTemplate(screenMarkup(currentGame, actualRoundKey, countOfImage));
  gameBlock.replaceWith(newGameBlock);
  hangListener();
}
function checkCountOfAnswers(clickedInputButton) {
  let clickedAnswer = clickedInputButton.getAttribute(`name`);

  if (numberOfResponses.indexOf(clickedAnswer) < 0) {
    numberOfResponses.push(clickedAnswer);
  }
  return numberOfResponses.length;
}
function updateNumberOfLives() {
  const header = document.querySelector(`.header`);
  const newHeader = getElementFromTemplate(headerMarkup(gameState));
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
  const newStats = getElementFromTemplate(statsMarkup(gameAnswers));
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
  responseLimit = currentGame['response-limit'];
  numberOfResponses = [];
  roundKeys = [];
  for (let key in currentGame.questions) {
    roundKeys.push(key);
  }
  setActualRoundKey();
  countOfImage = currentGame.questions[actualRoundKey].imagesPathArray.length;
}
function isFinished(lives) {
  if (!lives) {
    showStatisticScreen(gameAnswers, gameState.lives);
  }
}
function hangListener() {
  const showScreenTrigger = document.querySelector(`.game__content`);
  if (countOfImage === 3) {
    showScreenTrigger.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`game__option`)) {
        checkAnswer(evt.target);
      }
    });
  } else {
    showScreenTrigger.addEventListener(`change`, (evt) => {
      checkAnswer(evt.target);
    });
  }
}
function reduceLive(livesState) {
  livesState.lives = livesState.lives - 1;
  updateNumberOfLives();
  isFinished(livesState.lives);
}
function checkAnswer(clickedInput) {
  let answerValue;
  let answerKey;
  if (countOfImage === 3) {
    answerKey = clickedInput.querySelector(`img`).getAttribute(`data-name`);
    answerValue = `paint`;
  } else {
    answerKey = clickedInput.getAttribute(`name`);
    answerValue = clickedInput.value;
  }
  if (currentGame.questions[actualRoundKey].answers[answerKey] === answerValue) {
    updateStats(true, 15);
  } else {
    updateStats(false, 14);
    reduceLive(gameState);
  }

  if (checkCountOfAnswers(clickedInput) === responseLimit && gameState.lives) {
    if (roundKeys.length) {
      showNextRound();
    } else {
      if (gamesArray.length === 0) {
        showStatisticScreen(gameAnswers, gameState.lives);
      } else {
        showFirstGame(false, gameAnswers, gameState);
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
    ${new Array(3 - state.lives)
  .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    ${new Array(state.lives)
  .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    </div>
  </header>`;
const screenMarkup = (state, level, countOfQuestion) => {
  if (countOfQuestion === 2) {
    return `
  <div class="game">
    <p class="game__task">${state.taskTitle}</p>
    <form class="game__content">
    ${state.questions[level].imagesPathArray.map((it, index) => `
        <div class="game__option">
        <img src="${it}" alt="Option ${index + 1}" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question${index + 1}" type="radio" value="${state.buttonsValue[0]}">
          <span>${state.buttonsName[0]}</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${index + 1}" type="radio" value="${state.buttonsValue[1]}">
          <span>${state.buttonsName[1]}</span>
        </label>
      </div>`).join(``)}
    </form>
  </div>`
  } else if (countOfQuestion === 1) {
    return `
  <div class="game">
    <p class="game__task">${state.taskTitle}</p>
    <form class="game__content  game__content--wide">
    ${state.questions[level].imagesPathArray.map((it, index) => `
      <div class="game__option">
        <img src="${state.questions[level].imagesPathArray}" alt="Option ${index + 1}" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question${index + 1}" type="radio" value="${state.buttonsValue[0]}">
          <span>${state.buttonsName[0]}</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question${index + 1}" type="radio" value="${state.buttonsValue[1]}">
          <span>${state.buttonsName[1]}</span>
        </label>
      </div>`).join(``)}
    </form>
  </div>`
  } else if (countOfQuestion === 3) {
    return `
  <div class="game">
      <p class="game__task">${state.taskTitle}</p>
      <form class="game__content  game__content--triple">
      ${state.questions[level].imagesPathArray.map((it, index) => `
          <div class="game__option">
            <img src="${it}" data-name="image${index + 1}" alt="Option 1" width="304" height="455">
          </div>`).join(``)}
      </form>
   </div>`
  }
};
const statsMarkup = (answers) => `
  <div class="stats">
    <ul class="stats">
    ${answers.map((it) => `<li class="stats__result stats__result&#45;&#45;${it.statsResult}"></li>`).join(``)}
    ${new Array(10 - answers.length)
  .fill(`<li class="stats__result stats__result&#45;&#45;unknown"></li>`).join(``)}
    </ul>
  </div>`;
const showFirstGame = (isFirstGame, statsArray, lives) => {

  refreshData(isFirstGame, statsArray, lives);
  const screenElement = renderScreen(screenMarkup(currentGame, actualRoundKey, countOfImage));
  changeScreen(screenElement);
  const container = document.querySelector(`.central`);
  const gameContainer = container.querySelector(`.game`);
  container.insertAdjacentElement(`afterbegin`, getElementFromTemplate(headerMarkup(gameState)));
  gameContainer.insertAdjacentElement(`afterend`, getElementFromTemplate(statsMarkup(gameAnswers)));

  hangListener();
};

export default showFirstGame;
