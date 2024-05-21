const burgerMenu = (triggerSelector, menuSelector, activeClass) => {
  const trigger = document.querySelector(triggerSelector);
  const menu = document.querySelector(menuSelector);

  const toggleMenu = () => {
    menu.classList.toggle(activeClass);
  };

  trigger.addEventListener('click', toggleMenu);

};

export { burgerMenu };
