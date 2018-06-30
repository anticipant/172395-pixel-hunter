import AbstractView from './abstract-view.js';

const GameMode = {
  SINGLE: 1,
  DOUBLE: 2,
  TRIPLE: 3
};
const MinNumberAnswers = {
  ONE: 1,
  TWO: 2,
};

export default class LevelView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
    this.countOfQuestion = question.imagesPathArray.length;
    this.numberOfResponses = [];
    this.userAnswers = [];
  }
  render() {
    if (this.countOfQuestion === GameMode.DOUBLE) {
      return `
  <div class="game">
    <p class="game__task">${this.question.title}</p>
    <form class="game__content">
    ${this.question.imagesPathArray.map((it, index) => `
        <div class="game__option">
        <img src="${it}" alt="Option ${index + 1}" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question${index + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${index + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`).join(``)}
    </form>
  </div>`;
    } else if (this.countOfQuestion === GameMode.SINGLE) {
      return `
  <div class="game">
    <p class="game__task">${this.question.title}</p>
    <form class="game__content  game__content--wide">
    ${this.question.imagesPathArray.map((it, index) => `
      <div class="game__option">
        <img src="${this.question.imagesPathArray}" alt="Option ${index + 1}" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question${index + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question${index + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`).join(``)}
    </form>
  </div>`;
    } else if (this.countOfQuestion === GameMode.TRIPLE) {
      return `
  <div class="game">
      <p class="game__task">${this.question.title}</p>
      <form class="game__content  game__content--triple">
      ${this.question.imagesPathArray.map((it, index) => `
          <div class="game__option">
            <img src="${it}" data-name="image${index + 1}" alt="Option 1" width="304" height="455">
          </div>`).join(``)}
      </form>
   </div>`;
    }
    return null;
  }
  onAnswer() {}
  bind() {
    const showScreenTrigger = this.element.querySelector(`.game__content`);
    let answerValue;
    let answerKey;
    if (this.countOfQuestion === GameMode.TRIPLE) {
      showScreenTrigger.addEventListener(`click`, (evt) => {
        if (evt.target.classList.contains(`game__option`)) {
          answerKey = evt.target.querySelector(`img`).getAttribute(`data-name`);
          answerValue = `paint`;
          this.checkAnswer(answerKey, answerValue);
        }
      });
    } else {
      showScreenTrigger.addEventListener(`change`, (evt) => {
        answerKey = evt.target.getAttribute(`name`);
        answerValue = evt.target.value;
        this.checkAnswer(answerKey, answerValue);
      });
    }
  }
  checkCountOfAnswers(clickedAnswerKey, clickedAnswerValue) {
    if (this.numberOfResponses.indexOf(clickedAnswerKey) < 0) {
      this.userAnswers.push({
        answerKey: clickedAnswerKey,
        answerValue: clickedAnswerValue,
      });
      this.numberOfResponses.push(clickedAnswerKey);
    } else {
      // todo заменить этот костыль
      this.userAnswers = [{
        answerKey: clickedAnswerKey,
        answerValue: clickedAnswerValue,
      }];
    }
    return this.numberOfResponses.length;
  }
  checkAnswer(answerKey, answerValue) {
    let isCorrectAnswers;
    let responseLimit = this.countOfQuestion === GameMode.DOUBLE ? MinNumberAnswers.TWO : MinNumberAnswers.ONE;
    let countOfAnswers = this.checkCountOfAnswers(answerKey, answerValue);
    if (countOfAnswers === responseLimit) {
      isCorrectAnswers = this.userAnswers.every((it) => {
        return this.question.answers[it.answerKey][it.answerValue];
      });
      this.onAnswer(isCorrectAnswers);
      this.numberOfResponses = [];
      this.userAnswers = [];
    }
  }
}
