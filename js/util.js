export const renderScreen = (template) => {
  const wrapper = document.createElement(`main`);
  wrapper.classList.add(`central`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};
const mainElement = document.querySelector(`body`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
