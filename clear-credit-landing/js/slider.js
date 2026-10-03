const LENDERS = ['Upstart', 'SoFi', 'Zable', 'Best Egg', 'Discover', 'LendingClub'];

export function initSlider() {
  renderLenders(document.getElementById('lenderTrack'));
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const track = slider.querySelector('.track');
    const step = () => track.firstElementChild.offsetWidth + 24;
    slider.querySelector('[data-prev]').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    slider.querySelector('[data-next]').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  });
}

function renderLenders(track) {
  track.innerHTML = LENDERS.map((name, i) => `
    <article class="lender">
      <h3>${name}</h3>
      <a href="#compare">View Details</a>
      <dl>
        <div><dt>Rates from (APR)</dt><dd>6.40-35.99%</dd></div>
        <div><dt>Loan term</dt><dd>3-5 Years</dd></div>
        <div><dt>Loan amount</dt><dd>Up to $50,000</dd></div>
      </dl>
      <a class="btn ${i === 0 ? 'btn-dark' : 'btn-outline'}" href="#calculator">Find My Rate</a>
    </article>`).join('');
}
