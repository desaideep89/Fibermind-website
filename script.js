// Ensure JS is detected (optional)
document.documentElement.classList.add('js');

/* ===== Drawer menu ===== */
const toggle = document.getElementById('menu-toggle');
const drawer = document.getElementById('drawer');
const closeBtn = document.getElementById('drawer-close');

function openDrawer(){
  if (!drawer) return;
  drawer.hidden = false;
  requestAnimationFrame(()=>drawer.classList.add('open'));
  toggle?.setAttribute('aria-expanded','true');
}
function closeDrawer(){
  if (!drawer) return;
  drawer.classList.remove('open');
  toggle?.setAttribute('aria-expanded','false');
  setTimeout(()=>drawer.hidden = true, 150);
}
toggle?.addEventListener('click', ()=> {
  if (drawer.hidden || !drawer.classList.contains('open')) openDrawer();
  else closeDrawer();
});
closeBtn?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', e=> { if (e.target === drawer) closeDrawer(); });
document.querySelectorAll('.drawer a[href^="#"]').forEach(a=>{
  a.addEventListener('click', ()=> closeDrawer());
});

/* ===== Stat counters (safe default) ===== */
function formatCompact(n){
  if (n >= 1e9) return (n/1e9).toFixed(1).replace(/\.0$/,'') + 'b';
  if (n >= 1e6) return (n/1e6).toFixed(1).replace(/\.0$/,'') + 'm';
  if (n >= 1e3) return (n/1e3).toFixed(1).replace(/\.0$/,'') + 'k';
  return ''+Math.round(n);
}
function runCounters(){
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el=>{
    const end = parseFloat(el.getAttribute('data-count'));
    const decimals = parseInt(el.getAttribute('data-decimals')||'0',10);
    const prefix = el.getAttribute('data-prefix')||'';
    const suffix = el.getAttribute('data-suffix')||'';
    const compact = el.getAttribute('data-format')==='compact';
    const dur = 1200;
    const t0 = performance.now();
    function tick(now){
      const p = Math.min(1, (now - t0)/dur);
      const val = end * p;
      el.textContent = prefix + (compact ? formatCompact(val) : val.toFixed(decimals)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
window.addEventListener('load', runCounters);

/* ===== Reveal & Parallax — DISABLED for now =====
   If you want to re-enable later, use IntersectionObserver
   but DO NOT set opacity:0 as default.
*/
