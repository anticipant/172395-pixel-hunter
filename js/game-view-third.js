import AbstractView from './abstract-view.js';

export default class GameViewThird extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }
  render() {
    return `
  <div class="game">
      <p class="game__task">${this.question.question}</p>
      <form class="game__content  game__content--triple">
      ${this.question.imagesPathArray.map((it, index) => `
          <div class="game__option">
            <img src="${it.url}" data-name="image${index}" alt="Option 1" width="${it.width}" height="${it.height}">
          </div>`).join(``)}
      </form>
   </div>`;
  }
  onAnswer() {}
  bind() {
    const {image0, image1, image2} = this.question.answers;
    const answers = [image0, image1, image2];
    const answerValue = answers.filter((it) => it[`photo`] === 1).length === 1 ? `photo` : `painting`;
    const formElement = this.element.querySelector(`.game__content`);
    formElement.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`game__option`)) {
        const answerKey = evt.target.querySelector(`img`).getAttribute(`data-name`);
        this.checkAnswer(answerKey, answerValue);
      }
    });
  }
  checkAnswer(answerKey, answerValue) {
    const isCorrectAnswers = !!this.question.answers[answerKey][answerValue];
    this.onAnswer(isCorrectAnswers);
  }
}
