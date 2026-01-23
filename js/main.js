/**
 * Main Application Script
 * Initializes all components, handles navigation, and language switching
 */

// ============================================================================
// NAVBAR SCROLL BEHAVIOR
// ============================================================================

const initNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const updateNavbar = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('py-6', 'lg:py-6');
            navbar.classList.add('py-2', 'lg:py-3');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.remove('py-2', 'lg:py-3');
            navbar.classList.add('py-4', 'lg:py-6');
        }
    };

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
};

// ============================================================================
// MOBILE MENU
// ============================================================================

const initMobileMenu = () => {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isHidden = menu.classList.contains('hidden');
        menu.classList.toggle('hidden', !isHidden);
        document.body.classList.toggle('overflow-hidden', isHidden);

        // Update icon
        const icon = toggle.querySelector('svg');
        if (icon) {
            if (isHidden) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            }
        }
    });

    // Close menu on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    });
};

// ============================================================================
// MOBILE BOTTOM NAV DRAWERS
// ============================================================================

const initDrawers = () => {
    const backdrop = document.getElementById('drawer-backdrop');
    const triggers = document.querySelectorAll('[data-drawer-trigger]');

    if (!backdrop) return;

    let activeDrawer = null;

    const openDrawer = (drawerId) => {
        const drawer = document.getElementById(`drawer-${drawerId}`);
        if (!drawer) return;

        // Close any open drawer first
        if (activeDrawer && activeDrawer !== drawer) {
            closeDrawer(activeDrawer);
        }

        backdrop.classList.remove('hidden');
        setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
        drawer.classList.remove('translate-y-full');
        activeDrawer = drawer;
    };

    const closeDrawer = (drawer) => {
        if (!drawer) drawer = activeDrawer;
        if (!drawer) return;

        backdrop.classList.add('opacity-0');
        drawer.classList.add('translate-y-full');
        setTimeout(() => backdrop.classList.add('hidden'), 300);
        activeDrawer = null;
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const drawerId = trigger.dataset.drawerTrigger;
            const drawer = document.getElementById(`drawer-${drawerId}`);

            if (activeDrawer === drawer) {
                closeDrawer();
            } else {
                openDrawer(drawerId);
            }
        });
    });

    // Close on backdrop click
    backdrop.addEventListener('click', () => closeDrawer());

    // Close on drawer link click
    document.querySelectorAll('[id^="drawer-"] a').forEach(link => {
        link.addEventListener('click', () => closeDrawer());
    });
};

// ============================================================================
// LANGUAGE SWITCHING
// ============================================================================

const supportedLangs = ['en', 'tr'];
const langStorageKey = 'kora_lang';

const getStoredLang = () => {
    const stored = localStorage.getItem(langStorageKey);
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

const applyTranslations = async (lang) => {
    // Try loading from YAML content files first
    if (typeof contentLoader !== 'undefined') {
        try {
            contentLoader.setLang(lang);
            const common = await contentLoader.loadContent('common');
            if (common) {
                document.querySelectorAll('[data-i18n]').forEach((el) => {
                    const key = el.dataset.i18n;
                    const attr = el.dataset.i18nAttr;
                    const value = contentLoader.getNestedValue(common, key);
                    if (value === undefined) return;

                    const localizedValue = contentLoader.getLocalizedValue(value);
                    if (!localizedValue) return;

                    if (attr) {
                        el.setAttribute(attr, localizedValue);
                    } else {
                        el.innerHTML = localizedValue;
                    }
                });
                return;
            }
        } catch (e) {
            console.warn('Failed to load YAML translations, falling back to JSON', e);
        }
    }

    // Fallback to JSON translations
    try {
        const response = await fetch(`/locales/${lang}.json`, { cache: 'no-cache' });
        if (!response.ok) throw new Error(`Missing locale: ${lang}`);
        const translations = await response.json();

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
    } catch (error) {
        console.error(`Failed to load translations for language "${lang}"`, error);
    }
};

const setLanguage = async (lang) => {
    if (!supportedLangs.includes(lang)) return;
    localStorage.setItem(langStorageKey, lang);
    document.documentElement.lang = lang;
    setActiveLangFlag(lang);
    await applyTranslations(lang);
};

const initLanguage = async () => {
    const lang = getStoredLang();
    await setLanguage(lang);
};

const initLangMenu = () => {
    const langToggle = document.getElementById('lang-toggle');
    const langMenu = document.getElementById('lang-menu');

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

    document.addEventListener('click', (event) => {
        if (!langMenu.contains(event.target) && !langToggle.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    langMenu.querySelectorAll('[data-lang-option]').forEach((option) => {
        option.addEventListener('click', async () => {
            const lang = option.dataset.langOption;
            await setLanguage(lang);
            closeMenu();
        });
    });
};

// ============================================================================
// CAROUSEL
// ============================================================================

const initCarousel = (root, intervalMs = 5000) => {
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

    const next = (delta = 1) => show(index + delta);

    const start = () => {
        timer = setInterval(() => next(1), intervalMs);
    };

    const reset = () => {
        if (timer) clearInterval(timer);
        start();
    };

    prevBtn?.addEventListener('click', () => { next(-1); reset(); });
    nextBtn?.addEventListener('click', () => { next(1); reset(); });
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => { show(idx); reset(); });
    });

    root.addEventListener('mouseenter', () => timer && clearInterval(timer));
    root.addEventListener('mouseleave', reset);

    show(0);
    start();
};

// ============================================================================
// ACTIVE NAV HIGHLIGHTING
// ============================================================================

const highlightActiveNav = () => {
    const currentPath = window.location.pathname;

    document.querySelectorAll('[data-nav-item]').forEach(item => {
        const href = item.getAttribute('href');
        if (!href) return;

        const isActive = currentPath === href ||
            currentPath.startsWith(href) && href !== '/';

        item.classList.toggle('text-kora-cyan', isActive);
        item.classList.toggle('text-slate-400', !isActive);
    });
};

// ============================================================================
// COMPONENT LOADING
// ============================================================================

const loadComponents = async () => {
    if (typeof componentLoader === 'undefined') return;

    // Load navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        await componentLoader.injectComponent('navbar', navbarPlaceholder);
    }

    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        await componentLoader.injectComponent('footer', footerPlaceholder);
    }

    // Load mobile nav
    const mobileNavPlaceholder = document.getElementById('mobile-nav-placeholder');
    if (mobileNavPlaceholder) {
        await componentLoader.injectComponent('mobile-nav', mobileNavPlaceholder);
    }
};

// ============================================================================
// INITIALIZATION
// ============================================================================

const init = async () => {
    // Load components first
    await loadComponents();

    // Initialize all features
    initNavbarScroll();
    initMobileMenu();
    initDrawers();
    initLangMenu();
    highlightActiveNav();

    // Initialize carousels
    initCarousel(document.getElementById('work-carousel'));
    initCarousel(document.getElementById('hero-carousel'));

    // Load language/translations last
    await initLanguage();

    // Dispatch ready event
    document.dispatchEvent(new CustomEvent('app-ready'));
};

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for use in other scripts
window.KoraApp = {
    setLanguage,
    initCarousel,
    highlightActiveNav
};
