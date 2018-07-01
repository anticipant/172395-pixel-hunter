import AbstractView from './abstract-view.js';
import Router from './router.js';

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }
  render() {
    return `<div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
     </div>`;
  }
  bind() {
    const showScreenTrigger = this.element.querySelector(`.intro__asterisk`);
    showScreenTrigger.addEventListener(`click`, () => {
      Router.showGreeting();
    });
  }
  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = document.createElement(`div`);
    this._element.classList.add(`central__content`);
    this._element.setAttribute(`id`, `main`);
    this._element.innerHTML = this.render().trim();
    this.bind();
    return this._element;
  }
}
