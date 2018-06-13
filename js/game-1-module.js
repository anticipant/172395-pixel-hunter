import {firstGame, headerState} from './data.js';
import statsScreenElement from './stats-module.js';
import {renderScreen, changeScreen, getElementFromTemplate} from './util.js';
import showSecondGame from './game-2-module.js';

const RESPONSE_LIMIT = 2;
const Limit = {
  LIVES: 3,
  TIME: 30,
  FAST_TIME: 10,
  SLOW_TIME: 20,
};
let gameState;
let roundKeys;
let actualRoundKey;
let numberOfResponses = [];
let gameAswers = [];

function setActualRoundKey() {
  actualRoundKey = roundKeys.shift();
}
function showNextRound() {
  numberOfResponses = [];
  setActualRoundKey();
  const gameBlock = document.querySelector(`.game`);
  const newGameBlock = getElementFromTemplate(gameOneScreenMarkup(firstGame, actualRoundKey));
  gameBlock.replaceWith(newGameBlock);
  hangListener();
}
function checkCountOfAnswers(clickedInput) {
  let clickedAnswer = clickedInput.getAttribute(`name`);

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
  gameAswers.push({answer: answerResult, time: timeResult, statsResult: result});
  const stats = document.querySelector(`div.stats`);
  const newStats = getElementFromTemplate(statsMarkup(gameAswers));
  stats.replaceWith(newStats);
}
function refreshData() {
  gameState = Object.assign({}, headerState);
  numberOfResponses = [];
  roundKeys = [];
  gameAswers = [];
  for (let key in firstGame.questions) {
    roundKeys.push(key);
  }
}
function isFinished(lives) {
  if (!lives) {
    console.log(`GAME OVER`);
    changeScreen(statsScreenElement);
  }
}
function hangListener() {
  const showScreenTrigger = document.querySelector(`.game__content`);
  showScreenTrigger.addEventListener(`change`, (evt) => {
    checkAnswer(evt.target);
  });
}
function reduceLive(livesState) {
  livesState.lives = livesState.lives - 1;
  updateNumberOfLives();
  isFinished(livesState.lives);
}
function checkAnswer(clickedInput) {
  let questionName = clickedInput.getAttribute(`name`);
  let questionValue = clickedInput.value;

  if (firstGame.questions[actualRoundKey].answers[questionName] === questionValue) {
    console.log(`Right ANSWER`);
    updateStats(true, 15);
  } else {
    console.log(`FAIL`);
    updateStats(false, 14);
    reduceLive(gameState);
  }

  if (checkCountOfAnswers(clickedInput) === RESPONSE_LIMIT && gameState.live) {
    console.log(`next ROUND`);
    if (roundKeys.length) {
      showNextRound();
    } else {
      showSecondGame(gameAswers, gameState);
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
const gameOneScreenMarkup = (state, level) => `
  <div class="game">
    <p class="game__task">${state.taskTitle}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${state.questions[level].imagesPathArray[0]}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${state.questions[level].imagesPathArray[1]}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  </div>`;
const statsMarkup = (answers) => `
  <div class="stats">
    <ul class="stats">
    ${answers.map((it) => `<li class="stats__result stats__result&#45;&#45;${it.statsResult}"></li>`).join(``)}
    ${new Array(10 - answers.length)
  .fill(`<li class="stats__result stats__result&#45;&#45;unknown"></li>`).join(``)}
    </ul>
  </div>`;
const showFirstGame = () => {

  refreshData();
  setActualRoundKey();
  const gameOneScreenElement = renderScreen(gameOneScreenMarkup(firstGame, actualRoundKey));
  changeScreen(gameOneScreenElement);
  const container = document.querySelector(`.central`);
  const gameContainer = container.querySelector(`.game`);
  container.insertAdjacentElement(`afterbegin`, getElementFromTemplate(headerMarkup(gameState)));
  gameContainer.insertAdjacentElement(`afterend`, getElementFromTemplate(statsMarkup(gameAswers)));

  hangListener();
};

export default showFirstGame;
