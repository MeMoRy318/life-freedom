import { debounce } from './debounce';

const slider = (sliderListSelector, dotsSelector, activeClass) => {
  const sliderList = document.querySelector(sliderListSelector);
  const parentElement = sliderList.parentElement;
  const sliderItems = sliderList.querySelectorAll('div');
  const dots = document.querySelectorAll(dotsSelector);
  
  let translatePx = 0;
  let sliderWidth = 0;
  let slideIndex = 0;
  let timerId;
  let touchStartX = 0;
  let touchEndX = 0;
  
  const reStyle = () => {
    const { height, width } = window.getComputedStyle(parentElement);
  
    sliderItems.forEach(item => {
      item.style.height = height;
      item.style.width = width;
    });
  
    sliderWidth = parseInt(width) * sliderItems.length;
    sliderList.style.width = `${sliderWidth}px`;
    translatePx = 0;
  };
  
  const changeActiveDots = (index = 0) => {
    dots.forEach((item, i) => {
      item.classList.toggle(activeClass, index === i);
    });
  };
  
  const changeTranslatePx = () => {
    const { width } = window.getComputedStyle(parentElement);
    const parentWidth = parseInt(width);
  
    if (translatePx + parentWidth >= sliderWidth) {
      translatePx = 0;
      slideIndex = 0;
    } else {
      translatePx += parentWidth;
      slideIndex += 1;
    }
  
    sliderList.style.transform = `translateX(-${translatePx}px)`;
  };
  
  const setDotsDataIndex = () => {
    const { width } = window.getComputedStyle(parentElement);
    const parentWidth = parseInt(width);
    dots.forEach((dot, index) => {
      dot.setAttribute('data-index', index);
      dot.setAttribute('data-translate', parentWidth * index);
    });
  };
  
  function activeSlider () {
    timerId =  setInterval(() => {
      changeTranslatePx();
      changeActiveDots(slideIndex);
    }, 3000);
  }

  const stopSlider = () =>{
    if(timerId){
      clearInterval(timerId);
    }
  };

  const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      changeTranslatePx();
      changeActiveDots(slideIndex);
    } else if (touchEndX - touchStartX > 50) {
      if (slideIndex > 0) {
        slideIndex -= 1;
        translatePx -= parentElement.clientWidth;
        sliderList.style.transform = `translateX(-${translatePx}px)`;
        changeActiveDots(slideIndex);
      }
    }
  };

  reStyle();
  setDotsDataIndex();
  changeActiveDots(slideIndex);
  activeSlider();
  
  const debouncedReStyle = debounce(reStyle, 100);
  window.addEventListener('resize', debouncedReStyle);
  
  dots[0].parentElement.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.tagName === 'LI') {
      dots.forEach((item, index) => {
        if (item === target) {
          const { width } = window.getComputedStyle(parentElement);
          const parentWidth = parseInt(width);
          changeActiveDots(index);
          translatePx = parentWidth * index;
          slideIndex = index;
          sliderList.style.transform = `translateX(-${translatePx}px)`;
        }
      });
    }
  });
  
  dots[0].parentElement.addEventListener('mouseover',stopSlider);
  dots[0].parentElement.addEventListener('mouseout',activeSlider);

  sliderList.parentElement.addEventListener('touchstart',stopSlider);
  sliderList.parentElement.addEventListener('touchend',activeSlider);
  
  sliderList.addEventListener('touchstart', handleTouchStart);
  sliderList.addEventListener('touchmove', handleTouchMove);
  sliderList.addEventListener('touchend', handleTouchEnd);

  window.addEventListener('orientationchange', () => {
    stopSlider();
    reStyle();
    activeSlider();
  });
};

export { slider };
