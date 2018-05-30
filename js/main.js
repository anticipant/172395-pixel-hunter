'use strict';

const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const arrows = document.createElement(`div`);
document.querySelector(`body`).appendChild(arrows).innerHTML = `<div class="arrows__wrap">` +
  `<style>` +
  `.arrows__wrap {` +
  `position: absolute;` +
  `top: 95px;` +
  `left: 50%;` +
  `margin-left: -56px;` +
  `}` +
  `.arrows__btn {` +
  `background: none;` +
  `border: 2px solid black;` +
  `padding: 5px 20px;` +
  `}` +
  `</style>` +
  `<button class="arrows__btn"><-</button>` +
  `<button class="arrows__btn">-></button>` +
  `</div>`;
const mainCentral = document.querySelector(`main.central`);
const selectSlide = (element) => {
  mainCentral.innerHTML = ``;
  mainCentral.appendChild(element.cloneNode(true));
};
const screens = [];
document.querySelectorAll(`template`).forEach((ind)=>{
  screens.push(ind.content);
});
let current = 0;
const select = (index) => {
  index = index < 0 ? screens.length - 1 : index;
  index = index >= screens.length ? 0 : index;
  current = index;
  selectSlide(screens[current]);
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      select(current + 1);
      break;
    case LEFT_ARROW:
      select(current - 1);
      break;
  }
});
document.querySelector(`.arrows__btn`).addEventListener(`click`, () => {
  select(current - 1);
});
document.querySelector(`.arrows__btn + .arrows__btn`).addEventListener(`click`, () => {
  select(current + 1);
});

select(1);
