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
  }
  onAnswer() {}
  bind() {
    const showScreenTrigger = this.element.querySelector(`.game__content`);
    showScreenTrigger.addEventListener(`change`, (evt) => {
      let answerKey = evt.target.getAttribute(`name`);
      let answerValue = evt.target.value;
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
    let minNumberAnswers = 2;
    let countOfAnswers = this.checkCountOfAnswers(answerKey, answerValue);
    if (countOfAnswers === minNumberAnswers) {
      isCorrectAnswers = this.userAnswers.every((it) => {
        return this.question.answers[it.answerKey][it.answerValue];
      });
      this.onAnswer(isCorrectAnswers);
    }
  }
}
