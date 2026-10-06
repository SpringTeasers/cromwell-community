/* ==========================================================================
   Cromwell Community Site — site.js
   Vanilla JS. No dependencies, no build step.
   Responsibilities:
     1. Mobile navigation drawer (focus trap, Esc, scrim, scroll lock)
     2. Footer accordions below 600px
     3. Sticky-header hairline on scroll (mobile)
   Progressive enhancement: with JS disabled the drawer markup is hidden
   below 900px but every page remains reachable from the footer's full
   page list, which is always in the DOM.
   ========================================================================== */
(function () {
  'use strict';

  var DESKTOP = 900;

  /* ----------------------------------------------------------------------
     1. Mobile nav drawer
     ---------------------------------------------------------------------- */
  var toggle   = document.querySelector('.nav-toggle');
  var drawer   = document.getElementById('nav-drawer');
  var scrim    = document.querySelector('.scrim');
  var closeBtn = document.querySelector('.nav-drawer__close');
  var main     = document.getElementById('main');

  var lastFocused = null;
  var FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

  function isOpen() {
    return document.body.classList.contains('nav-open');
  }

  function openDrawer() {
    if (!drawer) return;
    lastFocused = document.activeElement;
    document.body.classList.add('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    if (main) main.setAttribute('inert', '');
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer(returnFocus) {
    if (!drawer) return;
    document.body.classList.remove('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (main) main.removeAttribute('inert');
    if (returnFocus !== false) {
      var target = (lastFocused && document.contains(lastFocused)) ? lastFocused : toggle;
      if (target) target.focus();
    }
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (isOpen()) { closeDrawer(); } else { openDrawer(); }
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', function () { closeDrawer(); });
  }
  if (scrim) {
    scrim.addEventListener('click', function () { closeDrawer(); });
  }

  // Close when a drawer link is activated.
  if (drawer) {
    drawer.addEventListener('click', function (event) {
      var link = event.target.closest('a[href]');
      if (link) {
        closeDrawer(false);
        lastFocused = null;
      }
    });
  }

  // Esc closes; Tab is trapped inside the drawer.
  document.addEventListener('keydown', function (event) {
    if (!isOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
      return;
    }

    if (event.key !== 'Tab' || !drawer) return;

    var items = Array.prototype.filter.call(
      drawer.querySelectorAll(FOCUSABLE),
      function (el) { return el.offsetParent !== null || el === closeBtn; }
    );
    if (!items.length) return;

    var first = items[0];
    var last  = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  // Auto-close above the desktop breakpoint.
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      if (window.innerWidth >= DESKTOP && isOpen()) closeDrawer(false);
    }, 120);
  });

  /* ----------------------------------------------------------------------
     2. Footer accordions (below 600px only)
     ---------------------------------------------------------------------- */
  var footerButtons = document.querySelectorAll('.footer-accordion__btn');

  function syncFooterAccordions() {
    var isNarrow = window.matchMedia('(max-width: 599px)').matches;

    Array.prototype.forEach.call(footerButtons, function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (!panel) return;

      if (isNarrow) {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        panel.hidden = !expanded;
      } else {
        // Desktop: panels are always visible, buttons removed from the tab order.
        panel.hidden = false;
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  Array.prototype.forEach.call(footerButtons, function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) panel.hidden = expanded;
    });
  });

  /* ----------------------------------------------------------------------
     3. Sticky header hairline
     ---------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) { header.classList.add('is-stuck'); }
    else { header.classList.remove('is-stuck'); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ----------------------------------------------------------------------
     Init
     ---------------------------------------------------------------------- */
  function init() {
    syncFooterAccordions();
    // Ensure collapsed state is reflected before first paint of interaction.
    if (window.matchMedia('(max-width: 599px)').matches) {
      Array.prototype.forEach.call(footerButtons, function (btn) {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        if (panel) panel.hidden = !expanded;
      });
    }
    onScroll();
  }

  var footerResizeTimer = null;
  window.addEventListener('resize', function () {
    if (footerResizeTimer) window.clearTimeout(footerResizeTimer);
    footerResizeTimer = window.setTimeout(syncFooterAccordions, 120);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
