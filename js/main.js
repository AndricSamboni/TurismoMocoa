
(function(){
  const D=window.MOCOA_DATA; const root=document.documentElement; const BASE=document.body.dataset.page==='experience'?'../':'';
  const getLang=()=>localStorage.getItem('mocoa-lang')||'es';
  let lang=getLang();
  window.t=(obj)=>obj?.[lang] ?? obj?.es ?? obj ?? '';
  window.getExp=(id)=>D.experiences.find(e=>e.id===id);
  function setText(){
    document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n.split('.');let v=D;key.forEach(k=>v=v?.[k]); if(v?.es||v?.en) el.textContent=t(v);});
    document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('active',b.dataset.lang===lang));
    document.documentElement.lang=lang;
    document.title=document.body.dataset.title ? t(D.site.name)+' · '+document.body.dataset.title : t(D.site.name);
  }
  function injectHeader(){
    const el=document.querySelector('#site-header'); if(!el)return;
    el.innerHTML=`<header class="site-header"><div class="container nav" id="nav"><a class="brand" href="${BASE}index.html"><span class="brand-mark">M</span><span>${t(D.site.name)}</span></a><nav class="nav-links" aria-label="${lang==='es'?'Principal':'Main'}"><a href="${BASE}index.html">${lang==='es'?'Inicio':'Home'}</a><a href="${BASE}naturaleza.html">${t(D.categories.naturaleza.title)}</a><a href="${BASE}biodiversidad.html">${t(D.categories.biodiversidad.title)}</a><a href="${BASE}cultura.html">${t(D.categories.cultura.title)}</a><a href="${BASE}gastronomia.html">${t(D.categories.gastronomia.title)}</a><a href="${BASE}mapa.html">${lang==='es'?'Mapa':'Map'}</a></nav><div class="nav-actions"><div class="lang" aria-label="Language"><button data-lang="es">ES</button><button data-lang="en">EN</button></div><button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button></div></div></header>`;
    document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{localStorage.setItem('mocoa-lang',b.dataset.lang);location.reload()});
    document.querySelector('#menuBtn')?.addEventListener('click',()=>document.querySelector('#nav').classList.toggle('mobile-open'));
  }
  function injectFooter(){const el=document.querySelector('#site-footer');if(!el)return;el.innerHTML=`<footer class="site-footer"><div class="container footer-grid"><div><h3>${t(D.site.name)}</h3><p>${t(D.site.tagline)}.</p></div><div><h3>${lang==='es'?'Explora':'Explore'}</h3><p><a href="${BASE}mapa.html">${lang==='es'?'Mapa de experiencias':'Experience map'}</a></p><p><a href="${BASE}naturaleza.html">${t(D.categories.naturaleza.title)}</a></p></div><div><h3>${lang==='es'?'Proyecto académico':'Academic project'}</h3><p>${lang==='es'?'Aplicación multimedia turística para Mocoa, Putumayo.':'Tourism multimedia application for Mocoa, Putumayo.'}</p></div></div><div class="container credits">${lang==='es'?'Contenido informativo: verificar horarios, accesos, tarifas y condiciones antes de cada visita.':'Informational content: verify schedules, access, prices and conditions before each visit.'}</div></footer>`}
  function card(id){const e=getExp(id); if(!e)return ''; const tags=e.tags.map(x=>`<span class="tag">${x}</span>`).join('');return `<article class="experience-card"><div class="card-image"><img src="assets/images/${e.image}" alt="${t(e.name)}" onerror="this.style.display='none'"><div class="image-fallback">${t(e.name)}</div></div><div class="card-body"><h3>${t(e.name)}</h3><div class="card-meta">📍 ${t(e.location)}</div><p>${t(e.short)}</p><div class="tags">${tags}</div><div class="actions" style="margin-top:14px"><a class="btn small" href="${BASE}experiencias/${e.id}.html">${lang==='es'?'Ver experiencia':'View experience'}</a></div></div></article>`}
  window.renderCategoryPage=(categoryId)=>{const d=D.categories[categoryId];document.body.dataset.title=t(d.title);const title=document.querySelector('[data-page-title]');if(title)title.textContent=t(d.title);const desc=document.querySelector('[data-page-desc]');if(desc)desc.textContent=t(d.description);const container=document.querySelector('#subsections');if(!container)return;container.innerHTML=Object.entries(d.subsections).map(([key,s])=>`<section class="subsection"><div class="subsection-title"><div><div class="eyebrow">${d.icon} ${categoryId}</div><h2>${t(s.title)}</h2></div></div><div class="experience-grid">${s.items.map(card).join('')}</div></section>`).join('');setText()}
  window.initCommon=()=>{injectHeader();injectFooter();setText()};
  window.renderHome=()=>{initCommon();const featured=D.experiences.slice(0,6);document.querySelector('#featured').innerHTML=featured.map(card).join('');document.querySelector('#categoryGrid').innerHTML=Object.entries(D.categories).map(([id,c])=>`<a class="category-card" href="${id}.html"><div class="category-icon">${c.icon}</div><h3>${t(c.title)}</h3><p>${t(c.description)}</p><span class="text-link">${lang==='es'?'Explorar →':'Explore →'}</span></a>`).join('');setText()}
  window.renderExperience=()=>{initCommon();const id=document.body.dataset.experienceId,e=getExp(id);if(!e)return;document.body.dataset.title=t(e.name);document.querySelector('[data-exp-name]').textContent=t(e.name);document.querySelector('[data-exp-location]').textContent='📍 '+t(e.location);document.querySelector('[data-exp-short]').textContent=t(e.short);document.querySelector('[data-exp-description]').textContent=t(e.description);const img=document.querySelector('[data-exp-image]');img.src='../assets/images/'+e.image;img.alt=t(e.name);document.querySelector('[data-exp-tags]').innerHTML=e.tags.map(x=>`<span class="tag">${x}</span>`).join('');document.querySelector('[data-exp-map]').href=`../mapa.html?focus=${e.id}`;setText()}
  document.addEventListener('DOMContentLoaded',()=>{
    const page=document.body.dataset.page;
    if(page==='home') renderHome();
    else if(page==='category') renderCategoryPage(document.body.dataset.category);
    else if(page==='experience') renderExperience();
    else if(page==='map'){
      initCommon();
      setText();
    }
  });
})();
