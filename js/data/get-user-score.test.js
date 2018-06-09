import {assert} from 'chai';
import {getUserResult} from '../get-user-score.js';
const pseudoAnswers = (obj, counter) => {
  const answers = [];
  for (let i = 0; i < counter; i++) {
    answers.push(Object.assign({}, obj));
  }
  return answers;
};
describe(`user score`, () => {
  describe(`should return  game over`, () => {
    it(`when there are no lives left `, () => {
      const lives = 0;
      const answers = pseudoAnswers({answer: true, time: 2}, 10);
      assert.equal(getUserResult(answers, lives), -1);
    });
    it(`when answers are less than 10 `, () => {
      const lives = 2;
      const answers = pseudoAnswers({answer: true, time: 2}, 9);
      assert.equal(getUserResult(answers, lives), -1);
    });
  });
  describe(`should return correct score`, () => {
    it(`when user has 10 right answers and 3 lives`, () => {
      const lives = 3;
      let answers = pseudoAnswers({answer: true, time: 15}, 10);
      assert.equal(getUserResult(answers, lives), 1150);
    });
    it(`when user has 3 fast answers and 2 lives`, () => {
      const lives = 2;
      let answers = pseudoAnswers({answer: true, time: 15}, 7)
        .concat({answer: true, time: 1})
        .concat({answer: true, time: 2})
        .concat({answer: true, time: 3});
      assert.equal(getUserResult(answers, lives), 1250);
    });
    it(`when user has 3 fast answers, 1 slow answer and 1 lives`, () => {
      const lives = 1;
      let answers = pseudoAnswers({answer: true, time: 15}, 6)
        .concat({answer: true, time: 1})
        .concat({answer: true, time: 2})
        .concat({answer: true, time: 3})
        .concat({answer: true, time: 23});
      assert.equal(getUserResult(answers, lives), 1150);
    });
  });
});
describe(`should not allow set invalid value`, () => {
  it(`should not allow set not an array for answers`, () => {
    const lives = 3;
    let answers = ``;
    assert.throws(() => getUserResult(answers, lives), /answers must be an array/);
  });
  it(`not allow set not number value for lives`, () => {
    const lives = `123`;
    const answers = pseudoAnswers({answer: true, time: 14}, 10);
    assert.throws(() => getUserResult(answers, lives), /Wrong type Expect number type/);
  });
  it(`lives should not be negative value`, () => {
    const lives = -1;
    const answers = pseudoAnswers({answer: true, time: 14}, 10);
    assert.throws(() => getUserResult(answers, lives), /lives should be greater than 0 less than 4/);
  });
  it(`not allow set not an boolean for answers.answer`, () => {
    const lives = 2;
    const answers = pseudoAnswers({answer: true, time: 14}, 9).concat({answer: null, time: 22});
    assert.throws(() => getUserResult(answers, lives), /Wrong type Expect answer key type/);
  });
  it(`not allow set not an number for answers.time`, () => {
    const lives = 2;
    const answers = pseudoAnswers({answer: true, time: 14}, 9).concat({answer: true, time: false});
    assert.throws(() => getUserResult(answers, lives), /Wrong type Expect time key type/);
  });
  it(`not allow set incorrect value for answers.time`, () => {
    const lives = 1;
    const answers = pseudoAnswers({answer: true, time: 14}, 9).concat({answer: true, time: 31});
    assert.throws(() => getUserResult(answers, lives), /Number must be greater than 0 less than 30/);
  });
});
