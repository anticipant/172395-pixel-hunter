import {changeScreen} from './util.js';
import StatsModuleView from './stats-module-view.js';

const Bonus = {
  FAST: 50,
  SLOW: -50,
  RIGHT: 100,
  LIVE: 50
};
const showStatisticScreen = (answers, lives, gameResult) => {
  const statsModuleView = new StatsModuleView(answers, gameResult, Bonus, lives);
  changeScreen(statsModuleView.element);
};

export default showStatisticScreen;
