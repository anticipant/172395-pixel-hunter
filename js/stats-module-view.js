import AbstractView from './abstract-view.js';
import Router from './router.js';

const Bonus = {
  FAST: 50,
  SLOW: -50,
  RIGHT: 100,
  LIVE: 50
};
export default class StatsModuleView extends AbstractView {
  constructor(answers, lives, result) {
    super();
    this.answers = answers;
    this.result = result;
    this.lives = lives;
  }
  userResultMarkup() {
    const fastAnswers = this.answers.filter((answer) => {
      return answer.statsResult === `fast`;
    }).length;
    const slowAnswers = this.answers.filter((answer) => {
      return answer.statsResult === `slow`;
    }).length;
    const correctAnswers = this.answers.filter((answer) => {
      return answer.statsResult === `correct` || answer.statsResult === `fast` || answer.statsResult === `slow`;
    }).length;
    if (this.result < 0) {
      return `<tr>
        <td class="result__number">1.</td>
        <td>
          <ul class="stats">
            ${this.answers.map((it) => `<li class="stats__result stats__result&#45;&#45;${it.statsResult}"></li>`).join(``)}
            ${new Array(10 - this.answers.length)
        .fill(`<li class="stats__result stats__result&#45;&#45;unknown"></li>`).join(``)}
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>`;
    }
    return `<tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            ${this.answers.map((it) => `<li class="stats__result stats__result&#45;&#45;${it.statsResult}"></li>`).join(``)}
            ${new Array(10 - this.answers.length)
      .fill(`<li class="stats__result stats__result&#45;&#45;unknown"></li>`).join(``)}
          </ul>
        </td>
        <td class="result__points">×&nbsp;${Bonus.RIGHT}</td>
        <td class="result__total">
          ${Bonus.RIGHT * correctAnswers}
        </td>
      </tr>
      <tr ${fastAnswers === 0 ? `style="display: none;"` : ``}>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;${Bonus.FAST}</td>
        <td class="result__total">
          ${Bonus.FAST * fastAnswers}
        </td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${Bonus.LIVE}</td>
        <td class="result__total">
          ${Bonus.LIVE * this.lives}
        </td>
      </tr>
      <tr ${slowAnswers === 0 ? `style="display: none;"` : ``}>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;${Bonus.SLOW}</td>
        <td class="result__total">
          ${Bonus.SLOW * slowAnswers}
        </td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this.result}</td>
      </tr>`;
  }
  render() {
    return `
<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>
  <div class="result">
    <h1>${this.result < 0 ? `Поражение!` : `Победа!`}</h1>
    <table class="result__table">
    ${this.userResultMarkup().trim()}
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
  </div>`;
  }
  bind() {
    const buttonBack = this.element.querySelector(`button.back`);
    buttonBack.addEventListener(`click`, () => {
      Router.showGreeting();
    });
  }
}
