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
const getUserResult = (answers, lives) => {
  const LIVE_BONUS = 50;
  let score = 0;
  score = score + lives * LIVE_BONUS;

  if (answers.length < 10 || lives < 0) {
    return -1;
  }
  const positiveArrayAnswers = answers.filter((it) => {
    return it.answer;
  });
  positiveArrayAnswers.forEach((it) => {
    const time = Limit.TIME - it.time;
    if (time < Limit.FAST_TIME) {
      score = score + Answer.RIGHT + Answer.FAST_BONUS;
    } else if (Limit.TIME >= time && time >= Limit.SLOW_TIME) {
      score = score + Answer.RIGHT - Answer.SLOW_FINE;
    } else {
      score = score + Answer.RIGHT;
    }
  });

  return score;
};

export default getUserResult;
