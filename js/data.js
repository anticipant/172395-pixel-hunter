export const headerState = {
  lives: 3,
};

export const games = [
  {
    'response-limit': 2,
    'taskTitle': `Угадайте для каждого изображения фото или рисунок?`,
    'buttonsValue': [`photo`, `paint`],
    'buttonsName': [`Фото`, `Рисунок`],
    'questions': {
      'level-1': {
        imagesPathArray: [`https://k42.kn3.net/CF42609C8.jpg`, `http://i.imgur.com/1KegWPz.jpg`],
        answers: {
          'question0': `photo`,
          'question1': `paint`,
        }
      },
      'level-2': {
        imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`],
        answers: {
          'question0': `paint`,
          'question1': `photo`,
        }
      },
      'level-3': {
        imagesPathArray: [`http://i.imgur.com/DKR1HtB.jpg`, `https://k32.kn3.net/5C7060EC5.jpg`],
        answers: {
          'question0': `photo`,
          'question1': `paint`,
        }
      },
    }
  },
  {
    'response-limit': 1,
    'taskTitle': `Угадай, фото или рисунок?`,
    'buttonsValue': [`photo`, `paint`],
    'buttonsName': [`Фото`, `Рисунок`],
    'questions': {
      'level-1': {
        imagesPathArray: [`http://i.imgur.com/DKR1HtB.jpg`],
        answers: {
          'question0': `photo`,
        }
      },
      'level-2': {
        imagesPathArray: [`https://k32.kn3.net/5C7060EC5.jpg`],
        answers: {
          'question0': `paint`,
        }
      },
      'level-3': {
        imagesPathArray: [`http://i.imgur.com/DKR1HtB.jpg`],
        answers: {
          'question0': `photo`,
        }
      },
      'level-4': {
        imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`],
        answers: {
          'question0': `paint`,
        }
      },
    }
  },
  {
    'response-limit': 1,
    'taskTitle': `Найдите рисунок среди изображений`,
    'questions': {
      'level-1': {
        imagesPathArray: [`https://k42.kn3.net/CF42609C8.jpg`, `http://i.imgur.com/1KegWPz.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`],
        answers: {
          'image0': `photo`,
          'image1': `photo`,
          'image2': `paint`,
        }
      },
      'level-2': {
        imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`, `https://k42.kn3.net/CF42609C8.jpg`],
        answers: {
          'image0': `photo`,
          'image1': `photo`,
          'image2': `paint`,
        }
      },
      'level-3': {
        imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`, `https://k42.kn3.net/CF42609C8.jpg`],
        answers: {
          'image0': `photo`,
          'image1': `photo`,
          'image2': `paint`,
        }
      },
    }
  }
];
