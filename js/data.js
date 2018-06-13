export const introData = {
  footnote: ` Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.`,
};
export const greetingData = {
  title: `Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!`,
  rules: `Правила игры просты.<br>
        Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
        Задача кажется тривиальной, но не думай, что все так просто.<br>
        Фотореализм обманчив и коварен.<br>
        Помни, главное — смотреть очень внимательно.`,
};
export const rulesData = {
  title: ``,
  description: `Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?`,
  placeholder: `Ваше Имя`,
  submitText: `Go!`,
};

export const headerState = {
  lives: 3,
};
export const firstGame = {
  taskTitle: `Угадайте для каждого изображения фото или рисунок?`,
  questions: {
    'level-1': {
      imagesPathArray: [`https://k42.kn3.net/CF42609C8.jpg`, `http://i.imgur.com/1KegWPz.jpg`],
      answers: {
        'question1': `photo`,
        'question2': `paint`,
      }
    },
    'level-2': {
      imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`],
      answers: {
        'question1': `paint`,
        'question2': `photo`,
      }
    },
    'level-3': {
      imagesPathArray: [`http://i.imgur.com/DKR1HtB.jpg`, `https://k32.kn3.net/5C7060EC5.jpg`],
      answers: {
        'question1': `photo`,
        'question2': `paint`,
      }
    },
  }
};

export const secondGame = {
  taskTitle: `Угадай, фото или рисунок?`,
  questions: {
    'level-1': {
      imagesPathArray: `http://i.imgur.com/DKR1HtB.jpg`,
      answers: {
        'question1': `photo`,
      }
    },
    'level-2': {
      imagesPathArray: `https://k32.kn3.net/5C7060EC5.jpg`,
      answers: {
        'question1': `paint`,
      }
    },
  }
};

export const thirdGame = {
  taskTitle: `Найдите рисунок среди изображений`,
  questions: {
    'level-1': {
      imagesPathArray: [`https://k42.kn3.net/CF42609C8.jpg`, `http://i.imgur.com/1KegWPz.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`],
      answers: {
        'image1': `photo`,
        'image2': `photo`,
        'image3': `paint`,
      }
    },
    'level-2': {
      imagesPathArray: [`https://k42.kn3.net/D2F0370D6.jpg`, `https://i.imgur.com/DiHM5Zb.jpg`, `https://k42.kn3.net/CF42609C8.jpg`],
      answers: {
        'image1': `photo`,
        'image2': `photo`,
        'image3': `paint`,
      }
    },
  }
};
