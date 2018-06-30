import {questions, headerState} from './data.js';
import {Limit} from './get-user-score.js';
import {getUserResult} from './get-user-score.js';

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
  get lives() {
    return this._state.lives;
  }
  get time() {
    return this._state.time;
  }
  get currentActualQuestion() {
    return this._actualQuestion;
  }
  get answers() {
    return this._answers;
  }
  get userResult() {
    return getUserResult(this._answers, this._state.lives);
  }
  set currentAnswer(answerResult) {
    this._currentAnswer = answerResult;
  }
  restart() {
    this._questions = questions.slice();
    this._state = Object.assign({}, headerState);
    this._answers = [];
  }
  getAnswers() {
    this._answers.push(setAnswers(this._currentAnswer, this._state.time));
  }
  reduceLive() {
    this._state = reduceLive(this._state);
  }
  getActualQuestion() {
    this._actualQuestion = this._questions.shift()
  }
  isStillQuestion() {
    return this._questions.length > 0;
  }
  resetTimer() {
    this._state = resetTimer(this._state);
  }
  tick() {
    this._state = tick(this._state);
  }
}
