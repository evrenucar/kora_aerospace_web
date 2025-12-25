const navbar = document.getElementById('navbar');
const chatToggle = document.getElementById('chat-toggle');
const chatPanel = document.getElementById('chat-panel');
const chatClose = document.getElementById('chat-close');
const currentYear = document.getElementById('current-year');
const langToggle = document.getElementById('lang-toggle');
const langMenu = document.getElementById('lang-menu');

const supportedLangs = ['en', 'tr', 'nl'];
const langStorageKey = 'kora_lang';

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

const getStoredLang = () => {
  const stored = window.localStorage.getItem(langStorageKey);
  if (stored && supportedLangs.includes(stored)) return stored;
  return 'en';
};

const setActiveLangFlag = (lang) => {
  document.querySelectorAll('[data-lang-flag]').forEach((flag) => {
    flag.classList.toggle('hidden', flag.dataset.langFlag !== lang);
  });

  document.querySelectorAll('[data-lang-option]').forEach((option) => {
    option.classList.toggle('hidden', option.dataset.langOption === lang);
  });
};

const applyTranslations = (translations) => {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const attr = el.dataset.i18nAttr;
    const value = translations[key];
    if (value === undefined || value === '') return;
    if (attr) {
      el.setAttribute(attr, value);
    } else {
      el.innerHTML = value;
    }
  });
};

const getInlineTranslations = (lang) => {
  return window.KORA_LOCALES?.[lang] ?? null;
};

const loadTranslations = async (lang) => {
  const inline = getInlineTranslations(lang);
  if (inline) return inline;

  const response = await fetch(`locales/${lang}.json`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Missing locale: ${lang}`);
  }
  return response.json();
};

const setLanguage = async (lang) => {
  if (!supportedLangs.includes(lang)) return;
  window.localStorage.setItem(langStorageKey, lang);
  document.documentElement.lang = lang;
  setActiveLangFlag(lang);

  try {
    const translations = await loadTranslations(lang);
    applyTranslations(translations);
  } catch (error) {
    if (lang !== 'en') {
      try {
        const translations = await loadTranslations('en');
        applyTranslations(translations);
      } catch {
        return;
      }
    }
  }
};

const initLanguage = async () => {
  const lang = getStoredLang();
  await setLanguage(lang);
};

const setupLangMenu = () => {
  if (!langToggle || !langMenu) return;

  const openMenu = () => {
    langMenu.classList.remove('hidden');
    langToggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    langMenu.classList.add('hidden');
    langToggle.setAttribute('aria-expanded', 'false');
  };

  langToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    if (langMenu.classList.contains('hidden')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  langMenu.addEventListener('click', closeMenu);

  document.addEventListener('click', (event) => {
    if (langMenu.contains(event.target) || langToggle.contains(event.target)) {
      return;
    }
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  langMenu.querySelectorAll('[data-lang-option]').forEach((option) => {
    option.addEventListener('click', async () => {
      const lang = option.dataset.langOption;
      await setLanguage(lang);
      closeMenu();
    });
  });
};

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
setupLangMenu();
initLanguage();
