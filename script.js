/* Mahir Tajuar Akash — Portfolio interactivity */

(() => {
    const navbar  = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const navSocial = document.querySelector('.nav-social');
    const toggle  = document.getElementById('navToggle');
    const backBtn = document.getElementById('backToTop');
    const themeBtn = document.getElementById('themeToggle');
    const toggleIcon = toggle ? toggle.querySelector('i') : null;
    const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;

    /* ---- Theme (dark mode) toggle ---- */
    const THEME_KEY = 'mta-theme';
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark'
                ? 'fa-solid fa-sun'
                : 'fa-solid fa-moon';
        }
        if (themeBtn) {
            themeBtn.setAttribute('aria-label',
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    };

    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(THEME_KEY, next);
        });
    }

    /* ---- Mobile nav toggle ---- */
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            if (navSocial) navSocial.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            if (toggleIcon) {
                toggleIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        /* Close menu when any nav link is clicked (anchor scroll) */
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    if (navSocial) navSocial.classList.remove('open');
                    if (toggleIcon) toggleIcon.className = 'fa-solid fa-bars';
                }
            });
        });
    }

    /* ---- Back-to-top button ---- */
    if (backBtn) {
        const onScroll = () => {
            if (window.scrollY > 300) {
                backBtn.classList.add('visible');
            } else {
                backBtn.classList.remove('visible');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
