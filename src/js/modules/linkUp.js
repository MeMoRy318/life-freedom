import {delay} from './delay';

const linkUp = (elementSelector) => {
  const element = document.querySelector(elementSelector);
  const scrollThreshold = 0.6;
  const delayTime = 300;

  const handleScroll = () => {
    const scrollbarHeight = document.documentElement.clientHeight;
    const positionScrollbar = document.documentElement.scrollTop;
    const clientHeight = document.body.clientHeight;
    const scrollSum = scrollbarHeight + positionScrollbar;

    if (clientHeight * scrollThreshold < scrollSum) {
      element.style.opacity = '1';
    } else {
      element.style.opacity = '0';
    }
  };

  const delayedHandleScroll = delay(handleScroll, delayTime);
  window.addEventListener('scroll', delayedHandleScroll);
};

export {linkUp};
