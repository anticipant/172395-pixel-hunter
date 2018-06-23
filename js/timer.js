const createTimer = (time) => {
  if (typeof time !== `number`) {
    throw new Error(`Wrong type Expect number type`);
  }
  if (!Number.isInteger(time)) {
    throw new Error(`Time should be integer`);
  }
  if (time < 0) {
    throw new Error(`Wrong time Expect more then 0`);
  }

  return {
    time,
    tick() {
      return createTimer(time - 1);
    }
  };
};
export default createTimer;
