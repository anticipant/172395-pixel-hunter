import {assert} from 'chai';
import {getUserResult, userGameInformation} from '../get-user-score.js';

describe(`first step in testing`, () => {

  it(`should return game over`, () => {
    assert.equal(-1, getUserResult([], 2));
    assert.equal(-1, getUserResult([{}, {}], 2));
    assert.equal(-1, getUserResult(userGameInformation, 0));
  });
  it(`should not allow set not an array for answers`, () => {
    assert.throws(() => getUserResult({}, 2), /answers must be an array/);
    assert.throws(() => getUserResult(1, 2), /answers must be an array/);
    assert.throws(() => getUserResult(``, 2), /answers must be an array/);
    assert.throws(() => getUserResult(true, 2), /answers must be an array/);
    assert.throws(() => getUserResult(NaN, 2), /answers must be an array/);
  });
  it(`should not allow set non number value for lives`, () => {
    assert.throws(() => getUserResult(userGameInformation, `123`), /Wrong type Expect number type/);
    assert.throws(() => getUserResult(userGameInformation, ``), /Wrong type Expect number type/);
    assert.throws(() => getUserResult(userGameInformation, []), /Wrong type Expect number type/);
    assert.throws(() => getUserResult(userGameInformation, {}), /Wrong type Expect number type/);
    assert.throws(() => getUserResult(userGameInformation, null), /Wrong type Expect number type/);
    // assert.throws(() => getUserResult([], NaN), /Wrong type Expect number type/);
    assert.throws(() => getUserResult(userGameInformation, false), /Wrong type Expect number type/);
  });
  it(`should not allow set not an array for answers`, () => {
    assert.throws(() => getUserResult([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2), /Wrong type Expect answers index type/);
  });
  it(`lives should not be negative value`, () => {
    assert.throws(() => getUserResult(userGameInformation, -1), /lives should be greater than 0 less than 4/);
    assert.throws(() => getUserResult(userGameInformation, 34), /lives should be greater than 0 less than 4/);
    assert.throws(() => getUserResult(userGameInformation, 5), /lives should be greater than 0 less than 4/);
    assert.throws(() => getUserResult(userGameInformation, -99), /lives should be greater than 0 less than 4/);
  });
  it(`should not allow set not an boolean for answers.answer`, () => {
    assert.throws(() => getUserResult([
      {
        answer: ``,
        time: 2
      },
      {
        answer: true,
        time: 12
      },
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 11
      },
      {
        answer: true,
        time: 16
      },
      {
        answer: true,
        time: 24
      },
      {
        answer: true,
        time: 26
      },
      {
        answer: true,
        time: 13
      },
      {
        answer: true,
        time: 5
      },
      {
        answer: true,
        time: 1
      },
    ], 2), /Wrong type Expect answer key type/);
  });
  it(`should not allow set not an number for answers.time`, () => {
    assert.throws(() => getUserResult([
      {
        answer: true,
        time: ``
      },
      {
        answer: true,
        time: 12
      },
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 11
      },
      {
        answer: true,
        time: 16
      },
      {
        answer: true,
        time: 24
      },
      {
        answer: true,
        time: 26
      },
      {
        answer: true,
        time: 13
      },
      {
        answer: true,
        time: 5
      },
      {
        answer: true,
        time: 1
      },
    ], 2), /Wrong type Expect time key type/);
  });
  it(`should not allow set incorrect value for answers.time`, () => {
    assert.throws(() => getUserResult([
      {
        answer: true,
        time: 10
      },
      {
        answer: true,
        time: 0
      },
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 11
      },
      {
        answer: true,
        time: 16
      },
      {
        answer: true,
        time: 24
      },
      {
        answer: true,
        time: 26
      },
      {
        answer: true,
        time: 13
      },
      {
        answer: true,
        time: 5
      },
      {
        answer: true,
        time: 1
      },
    ], 2), /Number must be greater than 0 less than 30/);
    assert.throws(() => getUserResult([
      {
        answer: true,
        time: 31
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 11
      },
      {
        answer: true,
        time: 16
      },
      {
        answer: true,
        time: 24
      },
      {
        answer: true,
        time: 26
      },
      {
        answer: true,
        time: 13
      },
      {
        answer: true,
        time: 5
      },
      {
        answer: true,
        time: 1
      },
    ], 2), /Number must be greater than 0 less than 30/);
    assert.throws(() => getUserResult([
      {
        answer: true,
        time: 35
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 11
      },
      {
        answer: true,
        time: 16
      },
      {
        answer: true,
        time: 24
      },
      {
        answer: true,
        time: 26
      },
      {
        answer: true,
        time: 13
      },
      {
        answer: true,
        time: 5
      },
      {
        answer: true,
        time: 1
      },
    ], 2), /Number must be greater than 0 less than 30/);
    assert.throws(() => getUserResult([
      {
        answer: true,
        time: -1
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 11
      },
      {
        answer: true,
        time: 16
      },
      {
        answer: true,
        time: 24
      },
      {
        answer: true,
        time: 26
      },
      {
        answer: true,
        time: 13
      },
      {
        answer: true,
        time: 5
      },
      {
        answer: true,
        time: 1
      },
    ], 2), /Number must be greater than 0 less than 30/);
  });
  it(`should return correct score`, () => {
    assert.equal(getUserResult([
      {
        answer: true,
        time: 11
      },
      {
        answer: true,
        time: 11
      },
      {
        answer: true,
        time: 12
      },
      {
        answer: true,
        time: 13
      },
      {
        answer: true,
        time: 14
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 16
      },
      {
        answer: true,
        time: 17
      },
      {
        answer: true,
        time: 18
      },
      {
        answer: true,
        time: 19
      },
    ], 0), -1);
    assert.equal(getUserResult([
      {
        answer: true,
        time: 10
      },
      {
        answer: true,
        time: 11
      },
      {
        answer: true,
        time: 9
      },
      {
        answer: true,
        time: 13
      },
      {
        answer: true,
        time: 14
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 16
      },
      {
        answer: true,
        time: 17
      },
      {
        answer: true,
        time: 18
      },
      {
        answer: true,
        time: 19
      },
    ], 1), 1100);
    assert.equal(getUserResult([
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 2
      },
      {
        answer: true,
        time: 9
      },
      {
        answer: true,
        time: 13
      },
      {
        answer: true,
        time: 14
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 16
      },
      {
        answer: true,
        time: 17
      },
      {
        answer: true,
        time: 18
      },
      {
        answer: true,
        time: 6
      },
    ], 2), 1300);
    assert.equal(getUserResult([
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 1
      },
      {
        answer: true,
        time: 1
      },
    ], 3), 1650);
    assert.equal(getUserResult([
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 24
      },
      {
        answer: true,
        time: 20
      },
      {
        answer: true,
        time: 29
      },
      {
        answer: true,
        time: 23
      },
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 22
      },
      {
        answer: true,
        time: 22
      },
    ], 4), 700);
    assert.equal(getUserResult([
      {
        answer: false,
        time: 22
      },
      {
        answer: false,
        time: 22
      },
      {
        answer: false,
        time: 22
      },
      {
        answer: false,
        time: 24
      },
      {
        answer: false,
        time: 20
      },
      {
        answer: false,
        time: 29
      },
      {
        answer: false,
        time: 23
      },
      {
        answer: false,
        time: 22
      },
      {
        answer: false,
        time: 22
      },
      {
        answer: false,
        time: 22
      },
    ], 4), 200);
  });
});
