export function initSlider() {
  const sliders = document.querySelectorAll('.range-field input[type="range"]');

  sliders.forEach((slider) => {
    const wrapper = slider.closest('.range-field');
    const output = wrapper?.querySelector('.range-value');

    const syncValue = () => {
      if (!output) {
        return;
      }

      const numericValue = Number(slider.value);
      const isCurrency = slider.closest('.range-field')?.dataset.currency === 'true';

      if (isCurrency) {
        output.textContent = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(numericValue);
        return;
      }

      if (slider.id === 'loanTerm') {
        output.textContent = `${numericValue} months`;
        return;
      }

      output.textContent = `${numericValue}+`;
    };

    syncValue();
    slider.addEventListener('input', syncValue);
  });
}
