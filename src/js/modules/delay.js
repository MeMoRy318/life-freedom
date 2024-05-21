const delay = (callbackFunction, delayTime) => {
  let timerId;
  
  return (...args) => {
    if (!callbackFunction || !delayTime) {
      throw new Error('Callback function and delay time are required.');
    }
  
    if (timerId) {
      clearTimeout(timerId);
    }
  
    timerId = setTimeout(() => callbackFunction(...args), delayTime);
  };
};
  
export {delay};