(function () {
  function initBackToTop() {
    const topButton = document.querySelector('.back-to-top');
    if (!topButton) return;
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initCopyrightYear() {
    const currentYear = String(new Date().getFullYear());
    document.querySelectorAll('[data-current-year]').forEach(function (element) {
      element.textContent = currentYear;
    });
  }

  function initCompactLayout() {
    const COMPACT_MAX_WIDTH = 1600;

    function applyCompactLayout() {
      const compact = window.innerWidth <= COMPACT_MAX_WIDTH;
      document.documentElement.classList.toggle('lp-compact-layout', compact);
      if (document.body) document.body.classList.toggle('lp-compact-layout', compact);
      if (compact) {
        document.documentElement.scrollLeft = 0;
        document.body.scrollLeft = 0;
        if (window.scrollX !== 0) window.scrollTo(0, window.scrollY);
      }
    }

    let resizeTimer = null;
    function scheduleApply() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(applyCompactLayout, 60);
    }

    window.addEventListener('resize', scheduleApply);
    window.addEventListener('orientationchange', scheduleApply);
    window.addEventListener('load', applyCompactLayout);
    applyCompactLayout();
  }

  function initMobileDrawer() {
    const button = document.querySelector('.mobile-profile-toggle');
    const drawer = document.querySelector('#mobile-profile-drawer');
    const drawerInner = document.querySelector('#mobile-profile-drawer-inner');
    const backdrop = document.querySelector('.mobile-profile-backdrop');
    const sourceCard = document.querySelector('.site-sidebar .sidebar-card') || document.querySelector('.sidebar-card');

    if (!button || !drawer || !drawerInner || !sourceCard) return;

    drawerInner.innerHTML = '';
    const clone = sourceCard.cloneNode(true);
    clone.classList.add('mobile-sidebar-card');
    drawerInner.appendChild(clone);

    function setOpen(open) {
      document.body.classList.toggle('mobile-profile-open', open);
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    button.addEventListener('click', function () {
      setOpen(!document.body.classList.contains('mobile-profile-open'));
    });

    if (backdrop) backdrop.addEventListener('click', function () { setOpen(false); });

    drawer.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1320) setOpen(false);
    });
  }

  function initPublicationFilter() {
    const input = document.getElementById('publication-filter');
    if (!input) return;

    const sections = Array.from(document.querySelectorAll('.lp-publications-page .publication-list'));
    const items = Array.from(document.querySelectorAll('.lp-publications-page article.publication-item, .lp-publications-page .publication-item'));
    if (!items.length) return;

    function setHidden(element, hidden) {
      if (!element) return;
      element.hidden = hidden;
      element.classList.toggle('lp-filter-hidden', hidden);
      element.classList.toggle('lp-filter-empty', hidden);
    }

    function filterPublications() {
      const query = input.value.trim().toLowerCase();
      let firstVisibleSection = null;

      sections.forEach(function (section) {
        section.classList.remove('lp-first-visible-section');

        const sectionItems = Array.from(section.querySelectorAll('article.publication-item, .publication-item'));
        const yearRow = section.querySelector('.publication-year-row');
        let hasVisibleItem = false;

        sectionItems.forEach(function (item) {
          const text = item.textContent.toLowerCase();
          const matches = !query || text.includes(query);
          setHidden(item, !matches);
          if (matches) hasVisibleItem = true;
        });

        setHidden(yearRow, !hasVisibleItem);
        section.hidden = !hasVisibleItem;
        section.classList.toggle('lp-filter-empty', !hasVisibleItem);

        if (hasVisibleItem && !firstVisibleSection) {
          firstVisibleSection = section;
        }
      });

      if (firstVisibleSection) {
        firstVisibleSection.classList.add('lp-first-visible-section');
      }
    }

    input.addEventListener('input', filterPublications);
    filterPublications();
  }

  function init() {
    initCopyrightYear();
    initBackToTop();
    initCompactLayout();
    initMobileDrawer();
    initPublicationFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
