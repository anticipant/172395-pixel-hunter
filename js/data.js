export const headerState = {
  lives: 3,
  time: 0,
};
const UserAnswer = {
  CORRECT: 1,
  WRONG: 0,
};
export const questions = [
  {
        title: `Угадайте для каждого изображения фото или рисунок?`,
        imagesPathArray: [`https://k42.kn3.net/CF42609C8.jpg`, `http://i.imgur.com/1KegWPz.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.CORRECT,
            'paint': UserAnswer.WRONG
          },
          question2: {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.CORRECT
          }
        },

      },
  {
        title: `Угадайте для каждого изображения фото или рисунок?`,
        imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.CORRECT
          },
          question2: {
            'photo': UserAnswer.CORRECT,
            'paint': UserAnswer.WRONG
          }
        }
      },
  {
        title: `Угадайте для каждого изображения фото или рисунок?`,
        imagesPathArray: [`http://i.imgur.com/DKR1HtB.jpg`, `https://k32.kn3.net/5C7060EC5.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.CORRECT,
            'paint': UserAnswer.WRONG
          },
          question2: {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.CORRECT
          }
        }
      },
  {
        title: `Угадай, фото или рисунок?`,
        imagesPathArray: [`http://i.imgur.com/DKR1HtB.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.CORRECT,
            'paint': UserAnswer.WRONG
          },
        }
      },
  {
        title: `Угадай, фото или рисунок?`,
        imagesPathArray: [`https://k32.kn3.net/5C7060EC5.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.CORRECT
          },
        }
      },
  {
        title: `Угадай, фото или рисунок?`,
        imagesPathArray: [`http://i.imgur.com/DKR1HtB.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.CORRECT,
            'paint': UserAnswer.WRONG
          },
        }
      },
  {
        title: `Угадай, фото или рисунок?`,
        imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.CORRECT
          },
        }
      },
  {
        title: `Найдите рисунок среди изображений`,
        imagesPathArray: [`https://k42.kn3.net/CF42609C8.jpg`, `http://i.imgur.com/1KegWPz.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`],
        answers: {
          'image1': {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.WRONG
          },
          'image2': {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.WRONG
          },
          'image3': {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.CORRECT
          },
        }
      },
  {
        title: `Найдите рисунок среди изображений`,
        imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`, `https://k42.kn3.net/CF42609C8.jpg`],
        answers: {
          'image1': {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.WRONG
          },
          'image2': {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.WRONG
          },
          'image3': {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.CORRECT
          },
        }
      },
  {
        title: `Найдите рисунок среди изображений`,
        imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`, `https://k42.kn3.net/CF42609C8.jpg`],
        answers: {
          'image1': {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.WRONG
          },
          'image2': {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.WRONG
          },
          'image3': {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.CORRECT
          },
        }
      },
];
