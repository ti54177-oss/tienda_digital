const products = [
  {id:1,section:'hombre',category:'playeras',name:'Playera clásica',detail:'Algodón · Blanco',price:249,color:'#e7e2d8',type:'shirt',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85'},
  {id:2,section:'hombre',category:'sudaderas',name:'Sudadera esencial',detail:'Felpa · Arena',price:499,color:'#c9bba6',type:'hoodie',image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85'},
  {id:3,section:'hombre',category:'pantalones',name:'Pantalón recto',detail:'Mezclilla · Azul',price:599,color:'#566875',type:'pants',image:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=85'},
  {id:4,section:'hombre',category:'playeras',name:'Playera relaxed',detail:'Algodón · Verde',price:279,color:'#718174',type:'shirt',image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85'},
  {id:5,section:'mujer',category:'tops',name:'Top básico',detail:'Algodón · Negro',price:199,color:'#343735',type:'top',image:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=85'},
  {id:6,section:'mujer',category:'playeras',name:'Playera oversize',detail:'Algodón · Marfil',price:269,color:'#e4ddce',type:'shirt',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85'},
  {id:7,section:'mujer',category:'pantalones',name:'Pantalón amplio',detail:'Tela suave · Café',price:549,color:'#927b68',type:'pants',image:'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85'},
  {id:8,section:'mujer',category:'tops',name:'Top de tirantes',detail:'Punto · Beige',price:189,color:'#cdbda7',type:'top',image:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=85'},
  {id:9,section:'ninos',category:'playeras',name:'Playera mini',detail:'Algodón · Amarillo',price:179,color:'#d5bd71',type:'shirt',image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85'},
  {id:10,section:'ninos',category:'sudaderas',name:'Sudadera mini',detail:'Felpa · Azul',price:329,color:'#738b9a',type:'hoodie',image:'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85'},
  {id:11,section:'ninos',category:'pantalones',name:'Jogger cómodo',detail:'Algodón · Gris',price:299,color:'#92958f',type:'pants',image:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=85'},
  {id:12,section:'ninos',category:'playeras',name:'Playera básica',detail:'Algodón · Terracota',price:179,color:'#b77c62',type:'shirt',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85'}
];
const cart = [];
const money = n => '$' + n.toLocaleString('es-MX') + ' MXN';

function garmentSVG(type,color){
  const common = 'stroke="#000000" stroke-opacity=".08" stroke-width="2" stroke-linejoin="round"';
  if(type==='pants') return `<svg class="garment" viewBox="0 0 220 260" aria-hidden="true"><path d="M48 22H172L183 238H119L109 111L99 238H36Z" fill="${color}" ${common}/><path d="M48 22H172L169 57H51Z" fill="${color}"/><path d="M110 57V111" stroke="#ffffff" stroke-opacity=".2" stroke-width="2"/></svg>`;
  if(type==='hoodie') return `<svg class="garment" viewBox="0 0 240 250" aria-hidden="true"><path d="M78 44Q120 2 162 44L210 78L190 119L171 107V226H69V107L50 119L30 78Z" fill="${color}" ${common}/><path d="M78 44Q120 90 162 44" fill="none" stroke="#ffffff" stroke-opacity=".3" stroke-width="4"/><path d="M105 103V145M135 103V145" stroke="#ffffff" stroke-opacity=".35" stroke-width="2"/><path d="M91 165H149V190H91Z" fill="none" stroke="#ffffff" stroke-opacity=".25" stroke-width="2"/></svg>`;
  if(type==='top') return `<svg class="garment" viewBox="0 0 220 250" aria-hidden="true"><path d="M72 34H94L110 62L126 34H148L177 75L155 96L145 84L151 220H69L75 84L65 96L43 75Z" fill="${color}" ${common}/><path d="M94 34L110 62L126 34" fill="none" stroke="#ffffff" stroke-opacity=".25" stroke-width="3"/></svg>`;
  return `<svg class="garment" viewBox="0 0 240 250" aria-hidden="true"><path d="M78 36L106 25Q120 43 134 25L162 36L211 76L186 109L166 94V224H74V94L54 109L29 76Z" fill="${color}" ${common}/><path d="M106 25Q120 63 134 25" fill="none" stroke="#000000" stroke-opacity=".12" stroke-width="4"/><path d="M74 94V224M166 94V224" stroke="#ffffff" stroke-opacity=".18" stroke-width="2"/></svg>`;
}
function renderSection(section,filter='todos',query=''){
  const grid=document.getElementById(`grid-${section}`);
  const list=products.filter(p=>p.section===section&&(filter==='todos'||p.category===filter)&&(`${p.name} ${p.detail} ${p.category}`).toLowerCase().includes(query.toLowerCase()));
  grid.innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-visual"><span class="product-tag">ESENCIA / BÁSICO</span><img class="product-photo" src="${p.image}" alt="${p.name}, ${p.detail}" loading="lazy"><button class="add-button" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">+</button></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.detail}</p></div><span class="product-price">${money(p.price)}</span></div></article>`).join(''):'<p class="no-results">No encontramos prendas con esa búsqueda.</p>';
}
const activeFilters={hombre:'todos',mujer:'todos',ninos:'todos'};
function renderAll(query=''){['hombre','mujer','ninos'].forEach(s=>renderSection(s,activeFilters[s],query));}
renderAll();

document.querySelectorAll('.filter-row').forEach(row=>row.addEventListener('click',e=>{
  const btn=e.target.closest('[data-filter]'); if(!btn)return;
  const section=row.dataset.filterGroup; activeFilters[section]=btn.dataset.filter;
  row.querySelectorAll('.filter-chip').forEach(b=>b.classList.toggle('active',b===btn));
  renderSection(section,activeFilters[section],document.getElementById('searchInput').value);
}));
document.getElementById('searchInput').addEventListener('input',e=>renderAll(e.target.value));
let toastTimer;
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200);}
document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-add]');if(!btn)return;
  const p=products.find(x=>x.id===Number(btn.dataset.add));cart.push(p);
  document.getElementById('cartCount').textContent=cart.length;
  toast(`${p.name} se agregó a tu bolsa.`);
});
document.getElementById('cartButton').addEventListener('click',()=>toast(cart.length?`Tu bolsa tiene ${cart.length} ${cart.length===1?'prenda':'prendas'}. Total: ${money(cart.reduce((s,p)=>s+p.price,0))}`:'Tu bolsa está vacía por ahora.'));
document.getElementById('newsletterForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('newsletterMessage').textContent='¡Gracias! Tu correo quedó registrado en esta demostración.';e.target.reset();});
document.getElementById('menuToggle').addEventListener('click',()=>document.querySelector('.main-nav').classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('open')));
