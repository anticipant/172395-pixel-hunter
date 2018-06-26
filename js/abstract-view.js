export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }
  get render() {
    throw new Error(`Template is required`);
  }
  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = document.createElement(`div`);
    this._element = this.render().trim();
    this.bind();
    return this._element;
  }
  bind(element) {}
}