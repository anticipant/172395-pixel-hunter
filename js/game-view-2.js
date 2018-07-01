import AbstractView from './abstract-view.js';

export default class GameViewSecond extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }
  render() {
    return `
  <div class="game">
    <p class="game__task">${this.question.title}</p>
    <form class="game__content  game__content--wide">
    ${this.question.imagesPathArray.map((it, index) => `
      <div class="game__option">
        <img src="${it.url}" alt="Option ${index + 1}" width="${it.width}" height="${it.height}">
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
  checkAnswer(answerKey, answerValue) {
    let isCorrectAnswers = !!this.question.answers[answerKey][answerValue];
    this.onAnswer(isCorrectAnswers);
  }
}
