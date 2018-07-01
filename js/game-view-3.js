import AbstractView from './abstract-view.js';

export default class GameViewThird extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }
  render() {
    return `
  <div class="game">
      <p class="game__task">${this.question.title}</p>
      <form class="game__content  game__content--triple">
      ${this.question.imagesPathArray.map((it, index) => `
          <div class="game__option">
            <img src="${it.url}" data-name="image${index + 1}" alt="Option 1" width="${it.width}" height="${it.height}">
          </div>`).join(``)}
      </form>
   </div>`;
  }
  onAnswer() {}
  bind() {
    const showScreenTrigger = this.element.querySelector(`.game__content`);
    showScreenTrigger.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`game__option`)) {
        let answerKey = evt.target.querySelector(`img`).getAttribute(`data-name`);
        let answerValue = `paint`;
        this.checkAnswer(answerKey, answerValue);
      }
    });
  }
  checkAnswer(answerKey, answerValue) {
    let isCorrectAnswers = !!this.question.answers[answerKey][answerValue];
    this.onAnswer(isCorrectAnswers);
  }
}
