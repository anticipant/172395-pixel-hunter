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
    type: `two-of-two`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    imagesPathArray: [
      {
        url: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 458,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 468,
        height: 458,
      }
    ],
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
    type: `two-of-two`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    imagesPathArray: [
      {
        url: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 458,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 468,
        height: 458,
      }
    ],
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
    type: `two-of-two`,
    title: `Угадайте для каждого изображения фото или рисунок?`,
    imagesPathArray: [
      {
        url: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 468,
        height: 458,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 468,
        height: 458,
      }
    ],
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
    type: `tinder-like`,
    title: `Угадай, фото или рисунок?`,
    imagesPathArray: [
      {
        url: `http://i.imgur.com/DKR1HtB.jpg`,
        width: 705,
        height: 455,
      }
    ],
    answers: {
      question1: {
        'photo': UserAnswer.CORRECT,
        'paint': UserAnswer.WRONG
      },
    }
  },
  {
    type: `tinder-like`,
    title: `Угадай, фото или рисунок?`,
    imagesPathArray: [
      {
        url: `http://i.imgur.com/DKR1HtB.jpg`,
        width: 705,
        height: 455,
      }
    ],
    answers: {
      question1: {
        'photo': UserAnswer.WRONG,
        'paint': UserAnswer.CORRECT
      },
    }
  },
  {
    type: `tinder-like`,
    title: `Угадай, фото или рисунок?`,
    imagesPathArray: [
      {
        url: `http://i.imgur.com/DKR1HtB.jpg`,
        width: 705,
        height: 455,
      }
    ],
    answers: {
      question1: {
        'photo': UserAnswer.CORRECT,
        'paint': UserAnswer.WRONG
      },
    }
  },
  {
    type: `tinder-like`,
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
    type: `one-of-three`,
    title: `Найдите рисунок среди изображений`,
    imagesPathArray: [
      {
        url: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 304,
        height: 455,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 304,
        height: 455,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 304,
        height: 455,
      }
    ],
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
    type: `one-of-three`,
    title: `Найдите рисунок среди изображений`,
    imagesPathArray: [
      {
        url: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 304,
        height: 455,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 304,
        height: 455,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 304,
        height: 455,
      }
    ],
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
    type: `one-of-three`,
    title: `Найдите рисунок среди изображений`,
    imagesPathArray: [
      {
        url: `https://k42.kn3.net/D2F0370D6.jpg`,
        width: 304,
        height: 455,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 304,
        height: 455,
      },
      {
        url: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 304,
        height: 455,
      }
    ],
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
const boom = [
  {
    "type": "two-of-two",
    "question": "Угадайте для каждого изображения фото или рисунок?",
    "answers": [
      {
        "image": {
          "url": "http://placehold.it/468x458",
          "width": 468,
          "height": 458
        },
        "type": "photo"
      },
      {
        "image": {
          "url": "http://placehold.it/468x458",
          "width": 468,
          "height": 458
        },
        "type": "painting"
      }
    ]
  },
  {
    "type": "tinder-like",
    "question": "Угадай, фото или рисунок?",
    "answers": [
      {
        "image": {
          "url": "http://placehold.it/705x455",
          "width": 705,
          "height": 455
        },
        "type": "photo"
      }
    ]
  },
  {
    "type": "one-of-three",
    "question": "Найдите рисунок среди изображений",
    "answers": [
      {
        "image": {
          "url": "http://placehold.it/304x455",
          "width": 304,
          "height": 455
        },
        "type": "photo"
      },
      {
        "image": {
          "url": "http://placehold.it/304x455",
          "width": 304,
          "height": 455
        },
        "type": "painting"
      },
      {
        "image": {
          "url": "http://placehold.it/304x455",
          "width": 304,
          "height": 455
        },
        "type": "photo"
      }
    ]
  },
  {
    "type": "one-of-three",
    "question": "Найдите фото среди изображений",
    "answers": [
      {
        "image": {
          "url": "http://placehold.it/304x455",
          "width": 304,
          "height": 455
        },
        "type": "painting"
      },
      {
        "image": {
          "url": "http://placehold.it/304x455",
          "width": 304,
          "height": 455
        },
        "type": "painting"
      },
      {
        "image": {
          "url": "http://placehold.it/304x455",
          "width": 304,
          "height": 455
        },
        "type": "photo"
      }
    ]
  }
];
