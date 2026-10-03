const $ = (id) => document.getElementById(id);
const money = (n) => '$' + Math.round(n).toLocaleString('en-US');

// Standard amortised loan formula: P*r / (1 - (1+r)^-n)
function loan(principal, apr, years) {
  const n = years * 12;
  const r = apr / 100 / 12;
  const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  return { monthly, interest: monthly * n - principal };
}

function update() {
  const amount = Math.max(0, +$('amount').value || 0);
  const rateOld = Math.max(0, +$('rateOld').value || 0);
  const rateNew = Math.max(0, +$('rateNew').value || 0);
  const termOld = +$('termOld').value;
  const termNew = +$('termNew').value;
  const o = loan(amount, rateOld, termOld);
  const n = loan(amount, rateNew, termNew);
  const saveInt = o.interest - n.interest;
  const saveMo = o.monthly - n.monthly;

  $('summary').innerHTML = `With an interest rate of <b>${rateNew.toFixed(2)}%</b> over <b>${termNew} Years</b>, you will pay <b>${money(n.monthly)}</b> per month and <b>${money(n.interest)}</b> in interest over the lifetime of your loan.`;
  $('saveInterest').textContent = `${money(Math.abs(saveInt))} ${saveInt >= 0 ? '↓' : '↑'}`;
  $('saveMonthly').textContent = `${money(Math.abs(saveMo))} ${saveMo >= 0 ? '↓' : '↑'}`;
  $('newInterest').textContent = money(n.interest);
  $('oldInterest').textContent = money(o.interest);
  $('newMonthly').textContent = money(n.monthly);
  $('oldMonthly').textContent = money(o.monthly);

  const maxI = Math.max(o.interest, n.interest, 1);
  const maxM = Math.max(o.monthly, n.monthly, 1);
  $('barNewInt').style.width = (n.interest / maxI) * 100 + '%';
  $('barOldInt').style.width = (o.interest / maxI) * 100 + '%';
  $('barNewMo').style.width = (n.monthly / maxM) * 100 + '%';
  $('barOldMo').style.width = (o.monthly / maxM) * 100 + '%';
  $('ringInterest').style.setProperty('--p', o.interest ? Math.max(0, saveInt / o.interest) * 100 : 0);
  $('ringMonthly').style.setProperty('--p', o.monthly ? Math.max(0, saveMo / o.monthly) * 100 : 0);
}

export function initCalculator() {
  const options = Array.from({ length: 7 }, (_, i) => `<option value="${i + 1}">${i + 1} Year${i ? 's' : ''}</option>`).join('');
  $('termOld').innerHTML = options;
  $('termNew').innerHTML = options;
  $('termOld').value = 2;
  $('termNew').value = 3;
  $('calcForm').addEventListener('input', update);
  $('calcForm').addEventListener('submit', (e) => e.preventDefault());
  $('amountForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = +$('heroAmount').value;
    if (v >= 600 && v <= 200000) $('amount').value = v;
    update();
    $('calculator').scrollIntoView({ behavior: 'smooth' });
  });
  update();
}
