export function initAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');

    if (!button) {
      return;
    }

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach((faqItem) => {
        faqItem.classList.remove('open');
        const faqButton = faqItem.querySelector('.faq-question');

        if (faqButton) {
          faqButton.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
