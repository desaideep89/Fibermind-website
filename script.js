document.documentElement.classList.add('js');
// Drawer
const toggle = document.getElementById('menu-toggle');
const drawer = document.getElementById('drawer');
const closeBtn = document.getElementById('drawer-close');

function openDrawer(){
  drawer.hidden = false;
  requestAnimationFrame(()=>drawer.classList.add('open'));
  toggle?.setAttribute('aria-expanded','true');
}
function closeDrawer(){
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

// Stat counters
function formatCompact(n){
  if (n >= 1e9) return (n/1e9).toFixed(1).replace(/\.0$/,'') + 'b';
  if (n >= 1e6) return (n/1e6).toFixed(1).replace(/\.0$/,'') + 'm';
  if (n >= 1e3) return (n/1e3).toFixed(1).replace(/\.0$/,'') + 'k';
  return ''+Math.round(n);
}
const counters = document.querySelectorAll('[data-count]');
const ioCounters = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if (!entry.isIntersecting) return;
    const el = entry.target;
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
    ioCounters.unobserve(el);
  });
},{threshold:0.6});
counters.forEach(el=>ioCounters.observe(el));

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const ioReveal = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if (e.isIntersecting) {
      e.target.classList.add('show');
      ioReveal.unobserve(e.target);
    }
  });
},{threshold:0.2});
reveals.forEach(el=>ioReveal.observe(el));

if (!('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
}

// Parallax
const parallax = document.querySelectorAll('[data-parallax]');
window.addEventListener('scroll', ()=>{
  const y = window.scrollY;
  parallax.forEach(el=>{
    const r = el.getBoundingClientRect();
    const offset
