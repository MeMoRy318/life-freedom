import {burgerMenu} from './modules/burgerMenu';
import { form } from './modules/form';
import { mask } from './modules/mask'; 
import {smoothScrolling} from './modules/smoothScrolling';
import {linkUp} from './modules/linkUp';
import { slider } from './modules/slider';

window.addEventListener('DOMContentLoaded',()=>{
  burgerMenu('.burger img','.burger-menu','burger-menu_open');

  form('form[name="helpForm"]');
  mask('[name="phone"]','+38 (___) ___ __ __');

  smoothScrolling(0.5);

  linkUp('.pageup');

  slider('.slider__img','.dots li','active');
});