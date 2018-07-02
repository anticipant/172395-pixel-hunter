import AbstractView from './abstract-view.js';

export default class GameViewSecond extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }
  render() {
    return `
  <div class="game">
    <p class="game__task">${this.question.question}</p>
    <form class="game__content  game__content--wide">
    ${this.question.imagesPathArray.map((it, index) => `
      <div class="game__option">
        <img src="${it.url}" alt="Option ${index}" width="${it.width}" height="${it.height}">
        <label class="game__answer  game__answer--photo">
          <input name="image${index}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="image${index}" type="radio" value="painting">
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
      const answerKey = evt.target.getAttribute(`name`);
      const answerValue = evt.target.value;
      this.checkAnswer(answerKey, answerValue);
    });
  }
  checkAnswer(answerKey, answerValue) {
    const isCorrectAnswers = !!this.question.answers[answerKey][answerValue];
    this.onAnswer(isCorrectAnswers);
  }
}
