document.addEventListener('DOMContentLoaded', function () {
      var els = document.querySelectorAll('.reveal');
      if (!('IntersectionObserver' in window)) { els.forEach(function(e){e.classList.add('is-visible');}); return; }
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('is-visible'); obs.unobserve(entry.target); } });
      },{threshold:.1,rootMargin:'0px 0px -50px 0px'});
      els.forEach(function(el){ obs.observe(el); });
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
