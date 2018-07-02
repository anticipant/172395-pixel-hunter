import adaptServerData from './data-adapter.js';

const ServerUrl = {
  QUESTIONS: `https://es.dump.academy/pixel-hunter/questions`,
  STATS: `https://es.dump.academy/pixel-hunter/stats`,
};
const DEFAULT_NAME = `Pistolet`;
const APP_ID = 172395;
const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${ServerUrl.QUESTIONS}`).then(checkStatus).then(toJSON).then(adaptServerData);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${ServerUrl.STATS}/${APP_ID}-${name}`).then(checkStatus).then(toJSON);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    data = Object.assign({name}, data);
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${ServerUrl.STATS}/${APP_ID}-${name}`, requestSettings).then(checkStatus);
  }
}
