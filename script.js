const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setMenu(open) {
  menuButton.classList.toggle('active', open);
  navLinks.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  document.body.classList.toggle('menu-open', open);
}

menuButton.addEventListener('click', () => {
  setMenu(!navLinks.classList.contains('open'));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 980) setMenu(false);
});

function updateNavigation() {
  header.classList.toggle('scrolled', window.scrollY > 24);

  if (document.body.classList.contains('side-quest-page')) {
    navItems.forEach((item) => {
      const isActive = item.getAttribute('href') === 'side-quest.html';
      item.classList.toggle('active', isActive);
      if (isActive) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });
    return;
  }

  const position = window.scrollY + 180;
  let current = 'home';

  sections.forEach((section) => {
    if (position >= section.offsetTop) current = section.id;
  });

  navItems.forEach((item) => {
    const isActive = item.getAttribute('href') === `#${current}`;
    item.classList.toggle('active', isActive);
    if (isActive) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
}

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach((element) => {
  const delay = element.dataset.delay;
  if (delay) element.style.setProperty('--delay', `${delay}ms`);
});

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, revealObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });

  revealElements.forEach((element) => observer.observe(element));
}

document.getElementById('year').textContent = new Date().getFullYear();
