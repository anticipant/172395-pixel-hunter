export const Limit = {
  LIVES: 3,
  TIME: 30,
  FAST_TIME: 10,
  SLOW_TIME: 20,
};
export const Answer = {
  RIGHT: 100,
  FAST_BONUS: 50,
  SLOW_FINE: 50,
};
export const getUserResult = (answers, lives) => {


  const LIVE_BONUS = 50;
  let score = 0;

  if (typeof lives !== `number`) {
    throw new Error(`Wrong type Expect number type`);
  }
  if (lives < 0 || lives > Limit.LIVES) {
    throw new Error(`lives should be greater than 0 less than 3`);
  }
  score = score + lives * LIVE_BONUS;
  if (Array.isArray(answers) !== true) {
    throw new Error(`answers must be an array`);
  }

  if (answers.length < 10 || lives === 0) {
    return -1;
  }
  let positiveArrayAnswers = answers.filter((round) => {
    if (typeof round.answer !== `boolean`) {
      throw new Error(`answer key must be a boolean`);
    }
    if (typeof round.time !== `number`) {
      throw new Error(`time key must be a number`);
    }
    if (round.time > Limit.TIME || round.time <= 0) {
      throw new Error(`Number must be greater than 0 less than 30`);
    }

    return round.answer;
  });
  positiveArrayAnswers.forEach((index) => {
    if (index.time < Limit.FAST_TIME) {
      score = score + Answer.RIGHT + Answer.FAST_BONUS;
    } else if (Limit.TIME >= index.time && index.time >= Limit.SLOW_TIME) {
      score = score + Answer.RIGHT - Answer.SLOW_FINE;
    } else {
      score = score + Answer.RIGHT;
    }
  });

  return score;
};

