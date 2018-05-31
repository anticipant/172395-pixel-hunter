'use strict';

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const ScreenOrder = {
  GREETING: 0,
  RULES: 1,
  GAME_1: 2,
  GAME_2: 3,
  GAME_3: 4,
  STATS: 5,
  MODAL_ERROR: 6,
  MODAL_CONFIRM: 7,
};
const arrows = document.createElement(`div`);
document.querySelector(`body`).appendChild(arrows).innerHTML = `<div class="arrows__wrap">
  <style>
  .arrows__wrap {
  position: absolute;
  top: 95px;
  left: 50%;
  margin-left: -56px;
  }
  .arrows__btn {
  background: none;
  border: 2px solid black;
  padding: 5px 20px;
  }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
  </div>`;
const mainCentral = document.querySelector(`main.central`);
const selectSlide = (element) => {
  mainCentral.innerHTML = ``;
  mainCentral.appendChild(element.cloneNode(true));
};
const screens = [];
document.querySelectorAll(`template`).forEach((ind)=>{
  screens.push(ind.content);
});
let orderNumberOfNextSlide = 0;
const checkAndShowFollowingSlide = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  orderNumberOfNextSlide = index;
  selectSlide(screens[orderNumberOfNextSlide]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      checkAndShowFollowingSlide(orderNumberOfNextSlide + 1);
      break;
    case LEFT_ARROW:
      checkAndShowFollowingSlide(orderNumberOfNextSlide - 1);
      break;
  }
});
document.querySelector(`.arrows__btn`).addEventListener(`click`, () => {
  checkAndShowFollowingSlide(orderNumberOfNextSlide - 1);
});
document.querySelector(`.arrows__btn + .arrows__btn`).addEventListener(`click`, () => {
  checkAndShowFollowingSlide(orderNumberOfNextSlide + 1);
});

checkAndShowFollowingSlide(ScreenOrder.RULES);
