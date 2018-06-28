export const headerState = {
  lives: 3,
  time: 0,
};
const UserAnswer = {
  CORRECT: 1,
  WRONG: 0,
};
export const games = [
  {
    'response-limit': 2,
    'taskTitle': `Угадайте для каждого изображения фото или рисунок?`,
    'buttonsValue': [`photo`, `paint`],
    'buttonsName': [`Фото`, `Рисунок`],
    'roundKeys': [`level-1`, `level-2`, `level-3`],
    'questions': {
      'level-1': {
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
      'level-2': {
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
      'level-3': {
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
    }
  },
  {
    'response-limit': 1,
    'taskTitle': `Угадай, фото или рисунок?`,
    'buttonsValue': [`photo`, `paint`],
    'buttonsName': [`Фото`, `Рисунок`],
    'roundKeys': [`level-1`, `level-2`, `level-3`, `level-4`],
    'questions': {
      'level-1': {
        imagesPathArray: [`http://i.imgur.com/DKR1HtB.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.CORRECT,
            'paint': UserAnswer.WRONG
          },
        }
      },
      'level-2': {
        imagesPathArray: [`https://k32.kn3.net/5C7060EC5.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.CORRECT
          },
        }
      },
      'level-3': {
        imagesPathArray: [`http://i.imgur.com/DKR1HtB.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.CORRECT,
            'paint': UserAnswer.WRONG
          },
        }
      },
      'level-4': {
        imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`],
        answers: {
          question1: {
            'photo': UserAnswer.WRONG,
            'paint': UserAnswer.CORRECT
          },
        }
      },
    }
  },
  {
    'response-limit': 1,
    'taskTitle': `Найдите рисунок среди изображений`,
    'roundKeys': [`level-1`, `level-2`, `level-3`],
    'questions': {
      'level-1': {
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
      'level-2': {
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
      'level-3': {
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
    }
  }
];
