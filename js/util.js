export const renderScreen = (template) => {
  const wrapper = document.createElement(`main`);
  wrapper.classList.add(`central`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const changeScreen = (element) => {
  const mainElement = document.querySelector(`body`);
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};
