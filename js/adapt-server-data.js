const UserAnswer = {
  CORRECT: 1,
  WRONG: 0,
};
const preprocessAnswers = (answers) => {
  let obj = {};
  answers.forEach((it, index) => {
    obj[`image${index}`] = {
      'photo': it.type === `photo` ? UserAnswer.CORRECT : UserAnswer.WRONG,
      'painting': it.type === `painting` ? UserAnswer.CORRECT : UserAnswer.WRONG,
    };
  });
  return obj;
};
const getImagePathArray = (level) => {
  return level.answers.map((it) => {
    return {
      url: it.image.url,
      width: it.image.width,
      height: it.image.height,
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
