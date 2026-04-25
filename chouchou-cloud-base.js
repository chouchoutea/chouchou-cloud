// ─── Reveal Animation ───────────────────────────────────────────────────────
// Observes elements with class "reveal" and adds "is-visible" when scrolled into view
document.addEventListener('DOMContentLoaded', function () {
  var els = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('is-visible'); });
  } else {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }
});


// ─── CSS Loader ─────────────────────────────────────────────────────────────
// Dynamically loads page-specific CSS based on the current route
// Runs immediately without waiting for DOM (stylesheet injection is safe early)
(function () {
  var pathname = window.location.pathname;
  var CSS_BASE = 'https://chouchoutea.github.io/chouchou-cloud/';

  var cssMap = [
    // { name: 'homepage', match: function (p) { return p === '/'; },              file: 'chouchou-cloud-home.css'  },
    {   name: 'order',    match: function (p) { return p.includes('/s/order'); }, file: 'chouchou-cloud-order.css' }
  ];

  cssMap.forEach(function (route) {
    if (route.match(pathname)) {
      var link     = document.createElement('link');
      link.rel     = 'stylesheet';
      link.type    = 'text/css';
      link.href    = CSS_BASE + route.file;
      link.onload  = function () { console.log('✅ [ChouchouCloud] Loaded CSS: ' + route.file); };
      link.onerror = function () { console.warn('❌ [ChouchouCloud] Failed CSS: ' + route.file); };
      document.head.appendChild(link);
    }
  });
})();


// ─── Route Checker ──────────────────────────────────────────────────────────
// Returns an object describing which page the user is currently on
function checkCurrentRoute() {
  var pathname = window.location.pathname;
  return {
    isHomepage : pathname === '/',
    isOrderPage: pathname.includes('/s/order'),
    currentPath: pathname
  };
}
// ─── Fulfillment Banner Visibility ──────────────────────────────────────────
// Square Online is a SPA — pages change without full reload.
// We listen to URL changes via popstate and pushState override,
// then wait for the element to appear (retry every 500ms, timeout 10s).

(function () {

  // ─── Core logic: check route and apply class to banner element ────────────
  function applyFulfillmentVisibility() {
    var route    = checkCurrentRoute();
    var selector = '.site-wide-fulfillment__inline';
    var elapsed  = 0;
    var interval = 500;   // retry every 500ms
    var maxWait  = 10000; // give up after 10s

    // Reset previous classes before applying new ones
    var existing = document.querySelector(selector);
    if (existing) {
      existing.classList.remove('d-none', 'd-flex');
    }

    var timer = setInterval(function () {
      var el = document.querySelector(selector);
      elapsed += interval;

      if (el) {
        clearInterval(timer);
        el.classList.remove('d-none', 'd-flex'); // clean slate

        if (route.isHomepage) {
          console.log('✅ Homepage — adding d-none');
          el.classList.add('d-none');

        } else if (route.isOrderPage) {
          console.log('✅ Order page — adding d-flex');
          el.classList.add('d-flex');

        } else {
          console.log('❌ Unknown page: ' + route.currentPath + ' — adding d-none');
          el.classList.add('d-none');
        }

      } else if (elapsed >= maxWait) {
        clearInterval(timer);
        console.warn('⏱ Timeout: "' + selector + '" not found after 10s');
      }

    }, interval);
  }


  // ─── Intercept pushState (SPA navigation) ────────────────────────────────
  // Square uses history.pushState to navigate — override it to detect changes
  var _originalPushState = history.pushState;
  history.pushState = function () {
    _originalPushState.apply(history, arguments);
    console.log('🔀 pushState detected:', window.location.pathname);
    applyFulfillmentVisibility();
  };


  // ─── Listen to popstate (back/forward browser buttons) ───────────────────
  window.addEventListener('popstate', function () {
    console.log('🔀 popstate detected:', window.location.pathname);
    applyFulfillmentVisibility();
  });


  // ─── Run once on initial page load ───────────────────────────────────────
  window.addEventListener('load', function () {
    console.log('🚀 Initial load:', window.location.pathname);
    applyFulfillmentVisibility();
  });

})();
