(function () {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  const overlay = document.getElementById('nav-overlay');
  const body = document.body;
  const STORAGE_KEY = 'proedition-lang';
  const THEME_KEY = 'proedition-theme';

  function closeMenu() {
    nav.classList.remove('is-open');
    body.classList.remove('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
  }

  function openMenu() {
    nav.classList.add('is-open');
    body.classList.add('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    if (overlay) overlay.setAttribute('aria-hidden', 'false');
  }

  var TITLE_EN = 'PROEDITION – Python Backend, APIs & Integrations for Business | Paweł Florczak';
  var TITLE_PL = 'PROEDITION – Systemy backendowe, API i integracje dla biznesu | Paweł Florczak';

  function setLang(lang) {
    var isPl = lang === 'pl';
    body.classList.remove('lang-en', 'lang-pl');
    body.classList.add(isPl ? 'lang-pl' : 'lang-en');
    document.documentElement.setAttribute('lang', isPl ? 'pl' : 'en');
    document.title = isPl ? TITLE_PL : TITLE_EN;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  }

  var saved = '';
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (saved === 'pl' || saved === 'en') {
    setLang(saved);
  } else {
    setLang('en');
  }

  document.body.addEventListener('click', function (e) {
    var btn = e.target && e.target.closest && e.target.closest('.lang-switch__btn');
    if (btn && (btn.getAttribute('data-lang') === 'en' || btn.getAttribute('data-lang') === 'pl')) {
      e.preventDefault();
      setLang(btn.getAttribute('data-lang'));
    }
  });

  function setTheme(theme) {
    const isLight = theme === 'light';
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(isLight ? 'theme-light' : 'theme-dark');
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    var metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', isLight ? '#f0f0f5' : '#0a0a0f');
    document.querySelectorAll('.theme-switch__btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-theme') === theme;
      btn.setAttribute('aria-pressed', isActive);
    });
  }

  var savedTheme = '';
  try { savedTheme = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);

  document.querySelectorAll('.theme-switch__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(btn.getAttribute('data-theme'));
    });
  });

  if (burger && nav) {
    burger.addEventListener('click', function () {
      const isOpen = nav.classList.contains('is-open');
      if (isOpen) closeMenu();
      else openMenu();
    });
    document.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }
  }

  (function() {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    if (sections.length === 0) return;
    let isScrolling = false;
    let scrollTimeout = null;
    const SCROLL_THRESHOLD = 50;
    const SCROLL_DEBOUNCE = 100;

    function getCurrentSection() {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const scrollBottom = scrollY + viewportHeight;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionBottom = sectionTop + rect.height;
        if (scrollY >= sectionTop - viewportHeight * 0.3 && scrollY < sectionBottom - viewportHeight * 0.3) {
          return { section: section, index: i, top: sectionTop, bottom: sectionBottom };
        }
      }
      return null;
    }

    function canScrollDown(current) {
      if (!current) return false;
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - viewportHeight;
      const currentScrollBottom = scrollY + viewportHeight;
      const sectionScrollBottom = current.bottom;
      return currentScrollBottom < sectionScrollBottom - SCROLL_THRESHOLD && scrollY < maxScroll;
    }

    function canScrollUp(current) {
      if (!current) return false;
      const scrollY = window.scrollY || window.pageYOffset;
      const sectionScrollTop = current.top;
      return scrollY > sectionScrollTop + SCROLL_THRESHOLD;
    }

    function scrollToSection(index, behavior) {
      if (index < 0 || index >= sections.length) return;
      const section = sections[index];
      const rect = section.getBoundingClientRect();
      const headerHeight = document.querySelector('.header-wrap')?.offsetHeight || 0;
      const targetY = rect.top + window.scrollY - headerHeight;
      isScrolling = true;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: behavior || 'smooth'
      });
      setTimeout(function() {
        isScrolling = false;
      }, 500);
    }

    function handleWheel(e) {
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(function() {
        const current = getCurrentSection();
        if (!current) return;
        const deltaY = e.deltaY;
        if (deltaY > 0) {
          if (!canScrollDown(current)) {
            e.preventDefault();
            scrollToSection(current.index + 1, 'smooth');
          }
        } else if (deltaY < 0) {
          if (!canScrollUp(current)) {
            e.preventDefault();
            scrollToSection(current.index - 1, 'smooth');
          }
        }
      }, SCROLL_DEBOUNCE);
    }

    let wheelHandler = null;
    function initSnapScroll() {
      if (wheelHandler) {
        window.removeEventListener('wheel', wheelHandler, { passive: false });
      }
      wheelHandler = handleWheel;
      window.addEventListener('wheel', wheelHandler, { passive: false });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSnapScroll);
    } else {
      initSnapScroll();
    }
  })();
})();
