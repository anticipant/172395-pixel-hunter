const UserAnswer = {
  CORRECT: 1,
  WRONG: 0,
};
const preprocessAnswers = (answers) => {
  let obj = {};
  answers.forEach((answersInner, ind) => {
    obj[`image${ind}`] = {
      'photo': answersInner.type === `photo` ? UserAnswer.CORRECT : UserAnswer.WRONG,
      'painting': answersInner.type === `painting` ? UserAnswer.CORRECT : UserAnswer.WRONG,
    };
  });
  return obj;
};
const getImagePathArray = (level) => {
  return level.answers.map((answersInner) => {
    return {
      url: answersInner.image.url,
      width: answersInner.image.width,
      height: answersInner.image.height,
    };
  });
};
const adaptServerData = (data) => {
  for (const level of Object.values(data)) {
    level.imagesPathArray = getImagePathArray(level);
    level.answers = preprocessAnswers(level.answers);
  }
  return data;
};
export default adaptServerData;
