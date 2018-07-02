import AbstractView from './abstract-view.js';
import Router from './router.js';

const Bonus = {
  FAST: 50,
  SLOW: -50,
  RIGHT: 100,
  LIVE: 50
};
export default class StatsModuleView extends AbstractView {
  constructor(data) {
    super();
    this.data = data.reverse();
  }
  getTitle(stats, index) {
    if (index === 0) {
      return stats.result < 0 ? `<h1>Поражение!</h1>` : `<h1>Победа!</h1>`;
    }
    return ``;
  }
  userResultMarkup(stats, index) {
    const fastAnswers = stats.answers.filter((answer) => {
      return answer.statsResult === `fast`;
    }).length;
    const slowAnswers = stats.answers.filter((answer) => {
      return answer.statsResult === `slow`;
    }).length;
    const correctAnswers = stats.answers.filter((answer) => {
      return answer.statsResult === `correct` || answer.statsResult === `fast` || answer.statsResult === `slow`;
    }).length;

    if (stats.result < 0) {
      return `
${this.getTitle(stats, index)}
<table class="result__table"><tr>
        <td class="result__number">${index + 1}</td>
        <td>
          <ul class="stats">
            ${stats.answers.map((it) => `<li class="stats__result stats__result&#45;&#45;${it.statsResult}"></li>`).join(``)}
            ${new Array(10 - stats.answers.length)
        .fill(`<li class="stats__result stats__result&#45;&#45;unknown"></li>`).join(``)}
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr></table>`;
    }
    return `
${this.getTitle(stats, index)}
<table class="result__table"><tr>
        <td class="result__number">${index + 1}.</td>
        <td colspan="2">
          <ul class="stats">
            ${stats.answers.map((it) => `<li class="stats__result stats__result&#45;&#45;${it.statsResult}"></li>`).join(``)}
            ${new Array(10 - stats.answers.length)
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
      <tr ${Bonus.LIVE === 0 ? `style="display: none;"` : ``}>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${stats.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;${Bonus.LIVE}</td>
        <td class="result__total">
          ${Bonus.LIVE * stats.lives}
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
        <td colspan="5" class="result__total  result__total--final">${stats.result}</td>
      </tr></table>`;
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

${this.data.map((stats, index) => {
    return `${this.userResultMarkup(stats, index).trim()}`;
  }).join(``)}
  </div>`;
  }
  bind() {
    const buttonBackElement = this.element.querySelector(`button.back`);
    buttonBackElement.addEventListener(`click`, () => {
      Router.showGreeting();
    });
  }
}
