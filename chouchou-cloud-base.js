document.addEventListener('DOMContentLoaded', function () {
      var els = document.querySelectorAll('.reveal');
      if (!('IntersectionObserver' in window)) { els.forEach(function(e){e.classList.add('is-visible');}); return; }
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('is-visible'); obs.unobserve(entry.target); } });
      },{threshold:.1,rootMargin:'0px 0px -50px 0px'});
      els.forEach(function(el){ obs.observe(el); });
    });

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
} else if (route.isOrderPage) {
  console.log('✅ You are on an Order page (/s/order...)');
} else {
  console.log(`❌ Unknown page: ${route.currentPath}`);
}
