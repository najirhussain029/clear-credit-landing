// One open item per accordion group; uses aria-expanded for accessibility.
export function initAccordion() {
  document.querySelectorAll('[data-accordion]').forEach((group) => {
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('.acc-btn');
      if (!btn) return;
      const wasOpen = btn.getAttribute('aria-expanded') === 'true';
      group.querySelectorAll('.acc-item').forEach((item) => setItem(item, false));
      if (!wasOpen) setItem(btn.closest('.acc-item'), true);
    });
  });
}

function setItem(item, open) {
  item.classList.toggle('open', open);
  item.querySelector('.acc-btn').setAttribute('aria-expanded', open);
  item.querySelector('.acc-panel').hidden = !open;
}
