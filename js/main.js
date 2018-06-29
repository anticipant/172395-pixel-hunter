import Router from './router.js';

Router.showIntro();
document.addEventListener(`click`, (evt) => {
  let target = evt.target;
  let buttonBack = target.closest(`button.back`);

  if (buttonBack) {
    Router.showGreeting();
  }
});
