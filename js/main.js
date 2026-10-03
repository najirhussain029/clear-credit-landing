import { initAccordion } from './accordion.js';
import { initSlider } from './slider.js';
import { initCalculator } from './calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initSlider();
  initCalculator();
  initNav();
  initTheme();
});

function initNav() {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
}

function initTheme() {
  const btn = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    btn.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    btn.setAttribute('title', `Switch to ${nextTheme} mode`);
  };

  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  btn.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    localStorage.setItem('theme', theme);
  });
}
