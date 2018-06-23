import pasteFooter from './footer.js';

export const renderScreen = (template) => {
  const wrapper = document.createElement(`main`);
  wrapper.classList.add(`central`);
  wrapper.innerHTML = template.trim();
  pasteFooter(wrapper);
  return wrapper;
};
export const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;
  return container;
};

export const changeScreen = (element) => {
  const mainElement = document.querySelector(`body`);
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
