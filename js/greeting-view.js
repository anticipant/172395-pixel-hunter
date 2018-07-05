import AbstractView from './abstract-view.js';
import Router from './router.js';

export default class GreetingView extends AbstractView {
  constructor() {
    super();
  }
  render() {
    return `
<div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
  <h1 class="greeting__asterisk">*</h1>
  <div class="greeting__challenge">
    <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
    <p>Правила игры просты.<br>
      Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
      Задача кажется тривиальной, но не думай, что все так просто.<br>
      Фотореализм обманчив и коварен.<br>
      Помни, главное — смотреть очень внимательно.</p>
  </div>
<div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>`;
  }
  bind() {
    const triggerElement = this.element.querySelector(`.greeting__continue`);
    triggerElement.addEventListener(`click`, () => {
      Router.showRules();
    });
  }
  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = document.createElement(`div`);
    this._element.classList.add(`greeting`);
    this._element.classList.add(`central--blur`);
    this._element.innerHTML = this.render().trim();
    this.bind();
    return this._element;
  }
}
