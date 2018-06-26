import AbstractView from './abstract-view.js';

export default class StatsLevelView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }
  render() {
    return `<div class="stats">
    <ul class="stats">
    ${this.answers.map((it) => `<li class="stats__result stats__result&#45;&#45;${it.statsResult}"></li>`).join(``)}
    ${new Array(10 - this.answers.length)
      .fill(`<li class="stats__result stats__result&#45;&#45;unknown"></li>`).join(``)}
    </ul>
  </div>`;
  }
  get element() {
    super.element();
  }
}
