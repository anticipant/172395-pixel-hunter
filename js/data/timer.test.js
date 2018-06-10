import {assert} from 'chai';
import createTimer from '../timer.js';

describe(`timer testing`, () => {

  it(`should not be a number argument`, () => {
    assert.throws(() => createTimer(`Boom`), /Wrong type Expect number type/);
  });
  it(`should be integer number argument`, () => {
    assert.throws(() => createTimer(1.99), /Time should be integer/);
  });
  it(`should not be negative number argument`, () => {
    assert.throws(() => createTimer(-2), /Wrong time Expect more then 0/);
    assert.throws(() => createTimer(1).tick().tick(), /Wrong time Expect more then 0/);
  });

  it(`should be an object`, () => {
    assert.isObject(createTimer(2));
  });

  it(`should has time property`, () => {
    assert.exists(createTimer(2).time);
  });

  it(`should has tick function`, () => {
    assert.isFunction(createTimer(2).tick);
  });
});
