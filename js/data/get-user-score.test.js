import {assert} from 'chai';
import getUserResult from '../get-user-result.js';
const getPseudoAnswers = (obj, counter) => {
  const answers = [];
  for (let i = 0; i < counter; i++) {
    answers.push(Object.assign({}, obj));
  }
  return answers;
};
describe(`user score`, () => {
  describe(`should return  game over`, () => {
    it(`when there are no lives left `, () => {
      const lives = -1;
      const answers = getPseudoAnswers({answer: true, time: 2}, 7)
        .concat({answer: false, time: 11})
        .concat({answer: false, time: 22})
        .concat({answer: false, time: 22});
      assert.equal(getUserResult(answers, lives), -1);
    });
    it(`when answers are less than 10 `, () => {
      const lives = 0;
      const answers = getPseudoAnswers({answer: true, time: 2}, 6)
        .concat({answer: false, time: 11})
        .concat({answer: false, time: 22})
        .concat({answer: false, time: 22});
      assert.equal(getUserResult(answers, lives), -1);
    });
  });
  describe(`should return correct score`, () => {
    it(`when user has 10 right answers and 3 lives`, () => {
      const lives = 3;
      const answers = getPseudoAnswers({answer: true, time: 15}, 10);
      assert.equal(getUserResult(answers, lives), 1150);
    });
    it(`when user has 3 fast answers and 2 lives`, () => {
      const lives = 2;
      const answers = getPseudoAnswers({answer: true, time: 15}, 6)
        .concat({answer: false, time: 29})
        .concat({answer: true, time: 29})
        .concat({answer: true, time: 29})
        .concat({answer: true, time: 27});
      assert.equal(getUserResult(answers, lives), 1150);
    });
    it(`when user has 3 fast answers, 1 slow answer and 1 lives`, () => {
      const lives = 1;
      const answers = getPseudoAnswers({answer: true, time: 15}, 4)
        .concat({answer: false, time: 29})
        .concat({answer: false, time: 29})
        .concat({answer: true, time: 29})
        .concat({answer: true, time: 29})
        .concat({answer: true, time: 29})
        .concat({answer: true, time: 2});
      assert.equal(getUserResult(answers, lives), 950);
    });
  });
});
describe(`should not allow set invalid value`, () => {
  it(`should not allow set not an array for answers`, () => {
    const answers = ``;
    assert.equal(Array.isArray(answers), false);
  });
  it(`should not allow set not an array for answers`, () => {
    const answers = getPseudoAnswers({answer: true, time: 14}, 9).concat({answer: false, time: 22});
    assert.equal(Array.isArray(answers), true);
  });
  it(`not allow set not an boolean for answers.answer`, () => {
    const answers = getPseudoAnswers({answer: true, time: 14}, 9).concat({answer: null, time: 22});
    assert.equal(answers.every((it) => {
      return typeof it.answer === `boolean`;
    }), false);
  });
  it(`not allow set not an boolean for answers.answer`, () => {
    const answers = getPseudoAnswers({answer: true, time: 14}, 9).concat({answer: false, time: 22});
    assert.equal(answers.every((it) => {
      return typeof it.answer === `boolean`;
    }), true);
  });
  it(`not allow set not an number for answers.time`, () => {
    const answers = getPseudoAnswers({answer: true, time: 14}, 9).concat({answer: true, time: false});
    assert.equal(answers.every((it) => {
      return typeof it.time === `number`;
    }), false);
  });
});
