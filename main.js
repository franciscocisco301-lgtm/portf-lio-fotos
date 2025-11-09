### `assets/js/main.js`
document.querySelectorAll('#year, #year2, #year3, #year4').forEach(el=>{ if(el) el.textContent = new Date().getFullYear(); });


// Galeria: armazenamento simples em localStorage
const GKEY = 'pfot_galeria_v2';
const galleryGrid = document.getElementById('galleryGrid');
const fileElem = document.getElementById('fileElem');
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbClose = document.getElementById('lbClose');


let images = load() || [];


function load(){ try{ return JSON.parse(localStorage.getItem(GKEY)) || []; } catch(e){ return []; }}
function save(){ try{ localStorage.setItem(GKEY, JSON.stringify(images)); } catch(e){ console.warn('Storage full'); }}


function render(){
if(!galleryGrid) return;
galleryGrid.innerHTML = '';
if(images.length===0) galleryGrid.innerHTML = '<p class="muted">Nenhuma imagem. Use "Enviar fotos" para adicionar.</p>';
images.forEach((img, i)=>{
const f = document.createElement('figure'); f.className='thumb';
const im = document.createElement('img'); im.src = img.data; im.alt = img.name || ('foto-'+i);
im.addEventListener('click', ()=>{ openLightbox(img.data); });
f.appendChild(im);
galleryGrid.appendChild(f);
});
}


function openLightbox(src){ if(!lightbox) return; lbImage.src = src; lightbox.setAttribute('aria-hidden','false'); }
function closeLightbox(){ if(!lightbox) return; lightbox.setAttribute('aria-hidden','true'); lbImage.src=''; }


if(lbClose) lbClose.addEventListener('click', closeLightbox);
if(lightbox) lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLightbox(); });


if(fileElem) fileElem.addEventListener('change', e=>{
const files = [...e.target.files]; files.forEach(f=>{
if(!f.type.startsWith('image/')) return;
if(f.size > 8*1024*1024){ alert('Arquivo muito grande: ' + f.name); return; }
const r = new FileReader(); r.onload = ev=>{ images.unshift({name:f.name, data:ev.target.result}); save(); render(); }; r.readAsDataURL(f);
});
});


const clearBtn = document.getElementById('clearBtn'); if(clearBtn) clearBtn.addEventListener('click', ()=>{ if(confirm('Remover todas as imagens salvas localmente?')){ images=[]; save(); render(); }});


render();


// ESC fecha lightbox
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLightbox(); });
```


---