import FooterView from './footer-view.js';

const footer = new FooterView();
const changeScreen = (element) => {
  const mainElement = document.querySelector(`.central`);
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
  mainElement.insertAdjacentElement(`beforeend`, footer.element);
};
export default changeScreen;
