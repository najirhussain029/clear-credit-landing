export function initCalculator() {
  const amountInput = document.querySelector('#loanAmount');
  const termInput = document.querySelector('#loanTerm');
  const scoreInput = document.querySelector('#creditScore');
  const paymentOutput = document.querySelector('#monthlyPayment');
  const summaryOutput = document.querySelector('#loanSummary');

  if (!amountInput || !termInput || !scoreInput || !paymentOutput || !summaryOutput) {
    return;
  }

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const getApr = (score) => {
    if (score >= 760) return 5.99;
    if (score >= 700) return 6.42;
    if (score >= 660) return 8.1;
    if (score >= 620) return 10.7;
    return 13.4;
  };

  const updateCalculator = () => {
    const principal = Number(amountInput.value);
    const months = Number(termInput.value);
    const score = Number(scoreInput.value);
    const apr = getApr(score);
    const monthlyRate = apr / 100 / 12;

    let payment = principal * monthlyRate;

    if (monthlyRate === 0) {
      payment = principal / months;
    } else {
      const discountFactor = 1 - Math.pow(1 + monthlyRate, -months);
      payment = (principal * monthlyRate) / discountFactor;
    }

    paymentOutput.textContent = formatCurrency(payment);
    summaryOutput.textContent = `${formatCurrency(principal)} over ${months} months at ${apr.toFixed(2)}% APR`;
  };

  [amountInput, termInput, scoreInput].forEach((input) => {
    input.addEventListener('input', updateCalculator);
  });

  updateCalculator();
}
