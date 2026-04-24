document.addEventListener('DOMContentLoaded', function () {
      var els = document.querySelectorAll('.reveal');
      if (!('IntersectionObserver' in window)) { els.forEach(function(e){e.classList.add('is-visible');}); return; }
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('is-visible'); obs.unobserve(entry.target); } });
      },{threshold:.1,rootMargin:'0px 0px -50px 0px'});
      els.forEach(function(el){ obs.observe(el); });

      
// URL Route Checker
// Checks if current page is homepage (/) or order page (contains /s/order)

function checkCurrentRoute() {
  const pathname = window.location.pathname;
  
  const isHomepage = pathname === '/';
  const isOrderPage = pathname.includes('/s/order');

  return {
    isHomepage,
    isOrderPage,
    currentPath: pathname
  };
}

// Usage
const route = checkCurrentRoute();

if (route.isHomepage) {
  console.log('✅ You are on the Homepage (/)');
  document.querySelector('.site-wide-fulfillment__inline').classList.add('d-none');
} else if (route.isOrderPage) {     
  document.querySelector('.site-wide-fulfillment__inline').classList.add('d-flex');
  console.log('✅ You are on an Order page (/s/order...)');
} else {
  console.log(`❌ Unknown page: ${route.currentPath}`);
  document.querySelector('.site-wide-fulfillment__inline').classList.add('d-none');
}
    });



(function () {
  const pathname = window.location.pathname;
  const CSS_BASE = 'https://chouchoutea.github.io/chouchou-cloud/';

  const cssMap = [
    // {
    //   name: 'homepage',
    //   match: function (p) { return p === '/'; },
    //   file: 'chouchou-cloud-home.css'
    // },
    {
      name: 'order',
      match: function (p) { return p.includes('/s/order'); },
      file: 'chouchou-cloud-order.css'
    }
  ];

  cssMap.forEach(function (route) {
    if (route.match(pathname)) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = CSS_BASE + route.file;
      link.onload = function () {
        console.log('✅ [ChouchouCloud] Loaded CSS for ' + route.name + ': ' + route.file);
      };
      link.onerror = function () {
        console.warn('❌ [ChouchouCloud] Failed to load CSS: ' + route.file);
      };
      document.head.appendChild(link);
    }
  });
})();
