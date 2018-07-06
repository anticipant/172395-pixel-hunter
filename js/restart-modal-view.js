import AbstractView from './abstract-view.js';

export default class RestartModalView extends AbstractView {
  constructor() {
    super();
  }
  render() {
    return `
    <form class="modal-confirm__inner">
      <button class="modal-confirm__close" type="button">Закрыть</button>
      <h2 class="modal-confirm__title">Подтверждение</h2>
      <p class="modal-confirm__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal-confirm__btn-wrap">
        <button class="modal-confirm__btn modal-confirm__btn--confirm">Ок</button>
        <button class="modal-confirm__btn modal-confirm__btn--cancel">Отмена</button>
      </div>
    </form>`;
  }
  onConfirm() {}
  hideModal(evt) {
    evt.preventDefault();
    this.element.remove();
  }
  bind() {
    const confirmModalElement = this.element.querySelector(`.modal-confirm__btn--confirm`);
    const closeModalElement = this.element.querySelector(`.modal-confirm__close`);
    const cancelModalElement = this.element.querySelector(`.modal-confirm__btn--cancel`);

    confirmModalElement.addEventListener(`click`, (evt) => {
      this.hideModal(evt);
      this.onConfirm();
    });
    cancelModalElement.addEventListener(`click`, (evt) => {
      this.hideModal(evt);
    });
    closeModalElement.addEventListener(`click`, (evt) => {
      this.hideModal(evt);
    });
  }
  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = document.createElement(`section`);
    this._element.classList.add(`modal-confirm`);
    this._element.classList.add(`modal-confirm__wrap`);
    this._element.innerHTML = this.render().trim();
    this.bind();
    return this._element;
  }
}
