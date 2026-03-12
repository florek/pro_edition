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
    const navLinks = Array.from(document.querySelectorAll('.nav__link'));
    if (sections.length === 0) return;
    let isScrolling = false;
    let lastWheelTime = 0;
    let wheelAccumulator = 0;
    const SCROLL_THRESHOLD = 100;
    const WHEEL_ACCUMULATOR_THRESHOLD = 30;
    const WHEEL_RESET_TIME = 150;

    function getCurrentSection() {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const headerHeight = document.querySelector('.header-wrap')?.offsetHeight || 0;
      const viewportTop = scrollY + headerHeight + 100;
      const viewportBottom = scrollY + viewportHeight;
      let bestMatch = null;
      let bestScore = -Infinity;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionBottom = sectionTop + rect.height;
        const sectionVisibleTop = Math.max(sectionTop, viewportTop);
        const sectionVisibleBottom = Math.min(sectionBottom, viewportBottom);
        const visibleHeight = Math.max(0, sectionVisibleBottom - sectionVisibleTop);
        const totalHeight = sectionBottom - sectionTop;
        if (visibleHeight > 0) {
          const visibilityRatio = visibleHeight / totalHeight;
          const centerDistance = Math.abs((sectionTop + sectionBottom) / 2 - (viewportTop + viewportBottom) / 2);
          const score = visibilityRatio * 1000 - centerDistance / 10;
          if (score > bestScore) {
            bestScore = score;
            bestMatch = { section: section, index: i, top: sectionTop, bottom: sectionBottom, height: totalHeight };
          }
        }
      }
      if (!bestMatch && sections.length > 0) {
        const firstSection = sections[0];
        const lastSection = sections[sections.length - 1];
        const firstRect = firstSection.getBoundingClientRect();
        const lastRect = lastSection.getBoundingClientRect();
        if (scrollY + viewportHeight * 0.5 < firstRect.top + scrollY) {
          bestMatch = { section: firstSection, index: 0, top: firstRect.top + scrollY, bottom: firstRect.bottom + scrollY, height: firstRect.height };
        } else if (scrollY + viewportHeight * 0.5 > lastRect.bottom + scrollY) {
          bestMatch = { section: lastSection, index: sections.length - 1, top: lastRect.top + scrollY, bottom: lastRect.bottom + scrollY, height: lastRect.height };
        }
      }
      return bestMatch;
    }

    function canScrollInDirection(current, direction) {
      if (!current) return true;
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - viewportHeight;
      const isNearTop = scrollY < 50;
      const isNearBottom = scrollY >= maxScroll - 50;
      if (direction > 0) {
        if (isNearBottom) return true;
        const scrollBottom = scrollY + viewportHeight;
        const sectionBottom = current.bottom;
        return scrollBottom < sectionBottom - SCROLL_THRESHOLD;
      } else {
        if (isNearTop) return true;
        if (isNearBottom) return true;
        if (scrollY <= 0) return false;
        const sectionTop = current.top;
        const headerHeight = document.querySelector('.header-wrap')?.offsetHeight || 0;
        const distanceFromSectionTop = scrollY - sectionTop;
        if (distanceFromSectionTop <= SCROLL_THRESHOLD) {
          return false;
        }
        return true;
      }
    }

    function scrollToSection(index, behavior) {
      if (index < 0 || index >= sections.length) return;
      const section = sections[index];
      if (section.id === 'hero') {
        isScrolling = true;
        window.scrollTo({
          top: 0,
          behavior: behavior || 'smooth'
        });
        if (behavior === 'smooth') {
          setTimeout(function() {
            isScrolling = false;
            updateActiveNavLink();
          }, 600);
        } else {
          isScrolling = false;
          updateActiveNavLink();
        }
        return;
      }
      const headerHeight = document.querySelector('.header-wrap')?.offsetHeight || 0;
      const title = section.querySelector('.section__title');
      let targetY;
      if (title) {
        const sectionRect = section.getBoundingClientRect();
        const titleRect = title.getBoundingClientRect();
        const titleOffsetFromSectionTop = titleRect.top - sectionRect.top;
        targetY = sectionRect.top + window.scrollY + titleOffsetFromSectionTop - headerHeight - 20;
      } else {
        const rect = section.getBoundingClientRect();
        targetY = rect.top + window.scrollY - headerHeight - 20;
      }
      isScrolling = true;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: behavior || 'smooth'
      });
      if (behavior === 'smooth') {
        setTimeout(function() {
          isScrolling = false;
          updateActiveNavLink();
        }, 600);
      } else {
        isScrolling = false;
        updateActiveNavLink();
      }
    }

    let lastActiveSectionId = null;
    let scrollUpdateTimeout = null;

    function updateActiveNavLink() {
      const current = getCurrentSection();
      if (!current) return;
      const sectionId = current.section.id;
      if (sectionId === lastActiveSectionId) return;
      lastActiveSectionId = sectionId;
      navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === '#' + sectionId) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }

    function handleWheel(e) {
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - viewportHeight;
      const isNearTop = scrollY < 50;
      const isNearBottom = scrollY >= maxScroll - 50;
      if (isNearTop && e.deltaY < 0) return;
      if (isNearBottom && e.deltaY > 0) return;
      const now = Date.now();
      if (now - lastWheelTime > WHEEL_RESET_TIME) {
        wheelAccumulator = 0;
      }
      lastWheelTime = now;
      wheelAccumulator += Math.abs(e.deltaY);
      if (wheelAccumulator < WHEEL_ACCUMULATOR_THRESHOLD) {
        return;
      }
      const current = getCurrentSection();
      if (!current) return;
      const deltaY = e.deltaY;
      if (deltaY > 0) {
        if (!canScrollInDirection(current, 1)) {
          if (current.index + 1 < sections.length) {
            e.preventDefault();
            wheelAccumulator = 0;
            scrollToSection(current.index + 1, 'smooth');
          }
        }
      } else if (deltaY < 0) {
        if (!canScrollInDirection(current, -1)) {
          if (current.index - 1 >= 0) {
            e.preventDefault();
            wheelAccumulator = 0;
            scrollToSection(current.index - 1, 'smooth');
          }
        }
      }
    }

    function handleScroll() {
      if (scrollUpdateTimeout) {
        clearTimeout(scrollUpdateTimeout);
      }
      scrollUpdateTimeout = setTimeout(function() {
        updateActiveNavLink();
      }, 10);
    }

    function handleNavLinkClick(e) {
      const link = e.target.closest('.nav__link');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const sectionId = href.substring(1);
      const sectionIndex = sections.findIndex(function(s) {
        return s.id === sectionId;
      });
      if (sectionIndex >= 0) {
        e.preventDefault();
        if (nav && nav.classList.contains('is-open')) {
          closeMenu();
        }
        scrollToSection(sectionIndex, 'smooth');
      }
    }

    let wheelHandler = null;
    let scrollHandler = null;
    function initSnapScroll() {
      if (wheelHandler) {
        window.removeEventListener('wheel', wheelHandler, { passive: false });
      }
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
      wheelHandler = handleWheel;
      scrollHandler = handleScroll;
      window.addEventListener('wheel', wheelHandler, { passive: false });
      window.addEventListener('scroll', scrollHandler, { passive: true });
      document.querySelectorAll('.nav__link').forEach(function(link) {
        link.addEventListener('click', handleNavLinkClick);
      });
      updateActiveNavLink();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSnapScroll);
    } else {
      initSnapScroll();
    }
  })();

  (function() {
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
      const heroChildren = heroContent.querySelectorAll('*');
      heroChildren.forEach(function(el, index) {
        el.classList.add('fade-in');
        setTimeout(function() {
          el.classList.add('is-visible');
        }, 100 + index * 100);
      });
    }
    const animatedElements = document.querySelectorAll('.section:not(.hero), .card, .value-block, .tech-block');
    if (animatedElements.length === 0) return;
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    animatedElements.forEach(function(el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  })();
})();
