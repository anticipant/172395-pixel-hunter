import changeScreen from './util.js';
import StatsModuleView from './stats-module-view.js';
import {getUserResult} from './get-user-score.js';

const showStatisticScreen = (answers, lives) => {
  const userResult = getUserResult(answers, lives);
  const statsModuleView = new StatsModuleView(answers, lives, userResult);
  changeScreen(statsModuleView.element);
};

export default showStatisticScreen;
