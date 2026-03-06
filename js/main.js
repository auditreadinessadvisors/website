/* ============================================
   AUDIT READINESS ADVISORS — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollReveal();
    initFAQAccordion();
    initSmoothScroll();
    initNavScroll();
    initLanguageToggle();
});

/* --- Mobile Navigation --- */
function initMobileNav() {
    const toggle = document.querySelector('.nav__toggle');
    const links = document.querySelector('.nav__links');
    if (!toggle || !links) return;

    function resetToggle() {
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        toggle.classList.toggle('active');
        const isOpen = links.classList.contains('open');

        toggle.setAttribute('aria-expanded', isOpen);

        if (isOpen) {
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            resetToggle();
        }
    });

    // Close menu on link click
    links.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            resetToggle();
        });
    });
}

/* --- Scroll Reveal Animations --- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* --- FAQ Accordion --- */
function initFAQAccordion() {
    const items = document.querySelectorAll('.faq__item');
    if (!items.length) return;

    items.forEach(item => {
        const question = item.querySelector('.faq__question');
        if (!question) return;

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            items.forEach(i => {
                i.classList.remove('active');
                const btn = i.querySelector('.faq__question');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            // Open clicked item if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* --- Nav background on scroll (throttled with rAF) --- */
function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    nav.style.background = 'rgba(7, 15, 30, 0.98)';
                } else {
                    nav.style.background = 'rgba(11, 29, 58, 0.95)';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* --- Language Toggle (event-listener based, no inline onclick) --- */

// Bidirectional path map — one source of truth
const PATH_MAP = {
    '/about.html': '/es/nosotros.html',
    '/contact.html': '/es/contacto.html',
    '/faq.html': '/es/preguntas-frecuentes.html',
    '/assessment.html': '/es/evaluacion.html',
    '/services/audit-readiness.html': '/es/servicios/preparacion-auditoria.html',
    '/services/financial-diagnostics.html': '/es/servicios/diagnostico-financiero.html',
    '/services/gaap-ifrs-advisory.html': '/es/servicios/asesoria-gaap-ifrs-niif.html',
    '/services/internal-controls.html': '/es/servicios/controles-internos.html'
};

// Build reverse map (ES → EN)
const PATH_MAP_REVERSE = Object.fromEntries(
    Object.entries(PATH_MAP).map(([en, es]) => [es, en])
);

function initLanguageToggle() {
    document.querySelectorAll('.nav__lang').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetLang = btn.dataset.lang || btn.textContent.trim().toLowerCase();
            switchLanguage(targetLang);
        });
    });
}

function switchLanguage(targetLang) {
    const currentPath = window.location.pathname;
    let newPath;

    if (targetLang === 'es') {
        if (currentPath.includes('/es/')) return;
        if (currentPath.endsWith('/') || currentPath.endsWith('/index.html')) {
            newPath = currentPath.replace(/\/?(?:index\.html)?$/, '') + '/es/index.html';
        } else {
            for (const [en, es] of Object.entries(PATH_MAP)) {
                if (currentPath.endsWith(en)) {
                    newPath = currentPath.replace(en, es);
                    break;
                }
            }
            if (!newPath) newPath = currentPath.replace(/\/([^/]+)$/, '/es/$1');
        }
    } else {
        if (!currentPath.includes('/es/')) return;
        if (currentPath.endsWith('/es/') || currentPath.endsWith('/es/index.html')) {
            newPath = currentPath.replace(/\/es\/?(?:index\.html)?$/, '/index.html');
        } else {
            for (const [es, en] of Object.entries(PATH_MAP_REVERSE)) {
                if (currentPath.endsWith(es)) {
                    newPath = currentPath.replace(es, en);
                    break;
                }
            }
            if (!newPath) newPath = currentPath.replace('/es/', '/');
        }
    }

    if (newPath) {
        window.location.href = newPath;
    }
}
