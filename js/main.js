import { initAccordion } from './accordion.js';
import { initSlider } from './slider.js';
import { initCalculator } from './calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initSlider();
  initCalculator();
  initNav();
});

function initNav() {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
}
