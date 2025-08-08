const toggle = document.getElementById('menu-toggle');
const drawer = document.getElementById('drawer');
const closeBtn = document.getElementById('drawer-close');

function openDrawer(){
  drawer.hidden = false;
  requestAnimationFrame(()=>drawer.classList.add('open'));
  toggle.setAttribute('aria-expanded','true');
}
function closeDrawer(){
  drawer.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  setTimeout(()=>drawer.hidden = true, 150);
}

toggle?.addEventListener('click', ()=>{
  if (drawer.hidden || !drawer.classList.contains('open')) openDrawer();
  else closeDrawer();
});
closeBtn?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', e=>{
  if (e.target === drawer) closeDrawer();
});
document.querySelectorAll('.drawer a[href^="#"]').forEach(a=>{
  a.addEventListener('click', ()=> closeDrawer());
});
