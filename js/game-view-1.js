import AbstractView from './abstract-view.js';

export default class GameViewFirst extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
    this.numberOfResponses = [];
    this.userAnswers = [];
  }
  render() {
    return `
  <div class="game">
    <p class="game__task">${this.question.question}</p>
    <form class="game__content">
    ${this.question.imagesPathArray.map((it, index) => `
        <div class="game__option">
        <img src="${it.url}" alt="Option ${index}" width="${it.width}" height="${it.height}">
        <label class="game__answer game__answer--photo">
          <input name="image${index}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="image${index}" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>`).join(``)}
    </form>
  </div>`;
  }
  onAnswer() {}
  bind() {
    const formElement = this.element.querySelector(`.game__content`);
    formElement.addEventListener(`change`, (evt) => {
      const answerKey = evt.target.getAttribute(`name`);
      const answerValue = evt.target.value;
      this.checkAnswer(answerKey, answerValue);
    });

  }
  checkCountOfAnswers(clickedAnswerKey, clickedAnswerValue) {
    if (this.numberOfResponses.indexOf(clickedAnswerKey) < 0) {
      this.userAnswers.push({
        answerKey: clickedAnswerKey,
        answerValue: clickedAnswerValue,
      });
      this.numberOfResponses.push(clickedAnswerKey);
    } else {
      this.userAnswers = [{
        answerKey: clickedAnswerKey,
        answerValue: clickedAnswerValue,
      }];
    }
    return this.numberOfResponses.length;
  }
  checkAnswer(answerKey, answerValue) {
    const minNumberAnswers = 2;
    const countOfAnswers = this.checkCountOfAnswers(answerKey, answerValue);
    if (countOfAnswers === minNumberAnswers) {
      const isCorrectAnswers = this.userAnswers.every((it) => {
        return this.question.answers[it.answerKey][it.answerValue];
      });
      this.onAnswer(isCorrectAnswers);
    }
  }
}
