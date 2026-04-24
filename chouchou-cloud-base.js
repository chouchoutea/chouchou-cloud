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

  const cssMap = {
    //'/': 'chouchou-cloud-home.css',       // homepage CSS (if you have one)
    '/s/order': 'chouchou-cloud-order.css' // order page CSS
  };

  for (const [route, file] of Object.entries(cssMap)) {
    const matches = route === '/' 
      ? pathname === '/' 
      : pathname.includes(route);

    if (matches) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CSS_BASE + file;
      document.head.appendChild(link);
      console.log(`✅ Loaded CSS: ${file}`);
      break;
    }
  }
})();
