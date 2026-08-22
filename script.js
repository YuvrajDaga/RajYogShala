const nav = document.getElementById('mainNav');
const menuToggle = document.querySelector('.menu-toggle');
const links = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded','false');
  if(menuToggle) menuToggle.textContent='☰';
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
},{threshold:.38});
sections.forEach(s => observer.observe(s));

const lightbox=document.getElementById('lightbox');
const lightboxImage=document.getElementById('lightboxImage');
const lightboxCaption=document.getElementById('lightboxCaption');
document.querySelectorAll('.gallery-card img').forEach(img=>{
  img.addEventListener('click',()=>{
    lightboxImage.src=img.src;
    lightboxImage.alt=img.alt;
    lightboxCaption.textContent=img.closest('figure')?.querySelector('figcaption')?.textContent || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  });
});
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImage.src='';
}
document.querySelector('.lightbox-close')?.addEventListener('click',closeLightbox);
lightbox?.addEventListener('click',e=>{if(e.target===lightbox) closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeLightbox()});
