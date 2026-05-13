// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Contact form — Netlify Forms
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() })
    .then(() => {
      const success = document.getElementById('formSuccess');
      success.textContent = success.getAttribute('data-' + currentLang);
      success.style.display = 'block';
      form.reset();
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    })
    .catch(() => {
      const success = document.getElementById('formSuccess');
      success.textContent = success.getAttribute('data-' + currentLang);
      success.style.display = 'block';
      form.reset();
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    });
});

// Language switcher
let currentLang = 'ja';

const langLabels = {
  ja: 'JA', en: 'EN', 'zh-cn': '简', 'zh-hk': '港', 'zh-tw': '台'
};

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.getElementById('langLabel').textContent = langLabels[lang];

  // Update active state in menu
  document.querySelectorAll('.lang-menu button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Swap text content
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (!val) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
    if (el.tagName === 'OPTION') { el.textContent = val; return; }
    if (el.classList.contains('btn') || el.tagName === 'BUTTON') { el.textContent = val; return; }
    // Labels: preserve the required star
    if (el.tagName === 'LABEL') {
      const req = el.querySelector('.required');
      el.textContent = val;
      if (req) el.appendChild(document.createTextNode(' '), el.appendChild(req));
      return;
    }
    el.textContent = val;
  });

  // Swap placeholders
  document.querySelectorAll('[data-placeholder-' + lang + ']').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang);
  });
}

document.querySelectorAll('.lang-menu button').forEach(btn => {
  btn.addEventListener('click', () => {
    applyLang(btn.getAttribute('data-lang'));
  });
});

// Set initial active
applyLang('ja');
