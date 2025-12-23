const navbar = document.getElementById('navbar');
const chatToggle = document.getElementById('chat-toggle');
const chatPanel = document.getElementById('chat-panel');
const chatClose = document.getElementById('chat-close');
const currentYear = document.getElementById('current-year');

const updateNavbar = () => {
  if (!navbar) return;
  if (window.scrollY > 20) {
    navbar.classList.add('navbar-scrolled');
    navbar.classList.remove('py-8');
  } else {
    navbar.classList.remove('navbar-scrolled');
    navbar.classList.add('py-8');
  }
};

const toggleChat = (isOpen) => {
  if (!chatPanel) return;
  chatPanel.classList.toggle('hidden', !isOpen);
};

window.addEventListener('scroll', updateNavbar);
window.addEventListener('load', updateNavbar);

if (chatToggle) {
  chatToggle.addEventListener('click', () => {
    const isHidden = chatPanel?.classList.contains('hidden');
    toggleChat(isHidden);
  });
}

if (chatClose) {
  chatClose.addEventListener('click', () => toggleChat(false));
}

if (currentYear) {
  currentYear.textContent = new Date().getFullYear().toString();
}

const setupCarousel = (root, intervalMs = 5000) => {
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
  const dots = Array.from(root.querySelectorAll('[data-carousel-dot]'));
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');

  if (!slides.length) return;
  let index = 0;
  let timer;

  const show = (i) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
      slide.classList.toggle('hidden', idx !== index);
    });
    dots.forEach((dot, idx) => {
      dot.classList.toggle('bg-kora-cyan', idx === index);
      dot.classList.toggle('bg-slate-600', idx !== index);
    });
  };

  const next = (delta = 1) => {
    show(index + delta);
  };

  const start = () => {
    timer = setInterval(() => next(1), intervalMs);
  };

  const reset = () => {
    if (timer) clearInterval(timer);
    start();
  };

  prevBtn?.addEventListener('click', () => {
    next(-1);
    reset();
  });
  nextBtn?.addEventListener('click', () => {
    next(1);
    reset();
  });
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      show(idx);
      reset();
    });
  });

  root.addEventListener('mouseenter', () => timer && clearInterval(timer));
  root.addEventListener('mouseleave', reset);

  show(0);
  start();
};

setupCarousel(document.getElementById('work-carousel'));
