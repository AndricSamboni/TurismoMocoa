(function(){
  const D=window.MOCOA_DATA;
  const getLang=()=>localStorage.getItem('mocoa-lang')||'es';
  const t=o=>o?.[getLang()]??o?.es??o??'';

  document.addEventListener('DOMContentLoaded',()=>{
    if(!window.L){
      console.error('Leaflet no se cargó. Revisa la conexión a Internet o la URL de Leaflet.');
      const mapEl=document.querySelector('#map');
      if(mapEl){
        mapEl.innerHTML='<div class="map-error">No se pudo cargar el mapa interactivo. Verifica tu conexión a Internet y vuelve a cargar la página.</div>';
      }
      return;
    }

    const map=L.map('map',{scrollWheelZoom:false}).setView([1.1478,-76.6481],11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom:19,
      attribution:'&copy; OpenStreetMap contributors'
    }).addTo(map);

    const markers={};
    const list=document.querySelector('#mapList');
    const params=new URLSearchParams(location.search);
    const focus=params.get('focus');

    D.experiences.forEach(e=>{
      const m=L.marker(e.coords).addTo(map).bindPopup(
        `<strong>${t(e.name)}</strong><br><span>${t(e.location)}</span><br><a href="experiencias/${e.id}.html">${getLang()==='es'?'Ver experiencia':'View experience'}</a>`
      );
      markers[e.id]=m;

      const b=document.createElement('button');
      b.type='button';
      b.className='map-item';
      b.dataset.id=e.id;
      b.innerHTML=`<strong>${t(e.name)}</strong><span>${t(e.location)}</span>`;
      b.onclick=()=>focusMarker(e.id);
      list.appendChild(b);
    });

    function focusMarker(id){
      const e=D.experiences.find(x=>x.id===id);
      if(!e)return;
      map.setView(e.coords,14);
      markers[id].openPopup();
      document.querySelectorAll('.map-item').forEach(x=>
        x.classList.toggle('active',x.dataset.id===id)
      );
    }

    const search=document.querySelector('#mapSearch');
    search?.addEventListener('input',event=>{
      const q=event.target.value.toLowerCase().trim();
      document.querySelectorAll('.map-item').forEach(b=>{
        b.style.display=b.textContent.toLowerCase().includes(q)?'block':'none';
      });
    });

    const title=document.querySelector('[data-map-title]');
    const description=document.querySelector('[data-map-description]');
    const home=document.querySelector('[data-map-home]');
    if(getLang()==='en'){
      if(title)title.textContent='Experience map';
      if(description)description.textContent='Explore points of interest and open the page for each experience.';
      if(search){search.placeholder='Search experience...';search.setAttribute('aria-label','Search experience');}
      if(home)home.textContent='← Back to home';
    }

    if(focus)focusMarker(focus);

    // Leaflet necesita recalcular el tamaño cuando el contenedor ya está visible.
    setTimeout(()=>map.invalidateSize(),100);
  });
})();
