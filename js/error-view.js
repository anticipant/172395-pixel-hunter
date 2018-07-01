import AbstractView from './abstract-view.js';

export default class ErrorVIew extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }
  render() {
    return `<section class="modal-error modal-error__wrap">
    <div class="modal-error__inner">
      <h2 class="modal-error__title">Произошла ошибка!</h2>
      <p class="modal-error__text">${this.error.message}</p>
    </div>
  </section>`;
  }
  bind() {}
  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = document.createElement(`section`);
    this._element.classList.add(`modal-error`);
    this._element.classList.add(`modal-error__wrap`);
    this._element.innerHTML = this.render().trim();
    this.bind();
    return this._element;
  }
}
