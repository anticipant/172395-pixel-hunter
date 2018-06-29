import {games, headerState} from './data.js';
import {Limit} from './get-user-score.js';
import {getUserResult} from './get-user-score.js';

const getActualRoundKey = (roundKeys) => {
  return roundKeys.shift();
};
const getRoundKeys = (currentGame) => {
  return currentGame[`roundKeys`].slice();
};
const reduceLive = (state) => {
  const lives = state.lives - 1;
  return Object.assign({}, state, {
    lives
  });
};
const setAnswers = (answerResult, timeResult) => {
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
  return {answer: answerResult, time: timeResult, statsResult: result};

};
const tick = (state) => {
  const time = state.time + 1;
  return Object.assign({}, state, {
    time
  });
};
const resetTimer = (state) => {
  return Object.assign({}, state, {
    time: 0,
  });
};

export default class GameModel {
  constructor() {
    this.restart();
  }
  get state() {
    return this._state;
  }
  get games() {
    return this._games;
  }
  get lives() {
    return this._state.lives;
  }
  get time() {
    return this._state.time;
  }
  get currentGame() {
    return this._currentGame;
  }
  get actualRoundKey() {
    return this._actualRoundKey;
  }
  get answers() {
    return this._answers;
  }
  get userResult() {
    return getUserResult(this._answers, this._state.lives);
  }
  getAnswers() {
    this._answers.push(setAnswers(this._currentAnswer, this._state.time));
  }
  set currentAnswer(answerResult) {
    this._currentAnswer = answerResult;
  }
  restart() {
    this._games = games.slice();
    this._state = Object.assign({}, headerState);
    this._answers = [];
  }
  reduceLive() {
    this._state = reduceLive(this._state);
  }
  isAvailableRound() {
    return this._roundKeys.length > 0;
  }
  getRoundKeys() {
    this._roundKeys = getRoundKeys(this._currentGame);
  }
  getActualRoundKey() {
    this._actualRoundKey = getActualRoundKey(this._roundKeys);
  }
  resetTimer() {
    this._state = resetTimer(this._state);
  }
  tick() {
    this._state = tick(this._state);
  }
  getGame() {
    this._currentGame = this._games.shift();
  }
}
