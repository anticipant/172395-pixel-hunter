import Footer from './footer-view.js';

const footer = new Footer();
export const changeScreen = (element) => {
  const mainElement = document.querySelector(`.central`);
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
  mainElement.insertAdjacentElement(`beforeend`, footer.element);
};
export default changeScreen;
