const getUserResult = (answers, lives) => {
  const LIVES_LIMIT = 3;
  const LIVE_BONUS = 50;
  const TIME_LIMIT = 30;
  const FAST_TIME_LIMIT = 10;
  const SLOW_TIME_LIMIT = 20;
  const RIGHT_ANSWER = 100;
  const FAST_ANSWER_BONUS = 50;
  const SLOW_ANSWER_FINE = 50;
  let score = 0;

  if (typeof lives !== `number`) {
    throw new Error(`Wrong type Expect number type`);
  }
  if (lives < 0 || lives > LIVES_LIMIT) {
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
    if (round.time > TIME_LIMIT || round.time <= 0) {
      throw new Error(`Number must be greater than 0 less than 30`);
    }

    return round.answer;
  });
  positiveArrayAnswers.forEach((index) => {
    if (index.time < FAST_TIME_LIMIT) {
      score = score + RIGHT_ANSWER + FAST_ANSWER_BONUS;
    } else if (TIME_LIMIT >= index.time && index.time >= SLOW_TIME_LIMIT) {
      score = score + RIGHT_ANSWER - SLOW_ANSWER_FINE;
    } else {
      score = score + RIGHT_ANSWER;
    }
  });

  return score;
};

export default getUserResult;
