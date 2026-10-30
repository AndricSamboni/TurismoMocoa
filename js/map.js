(function () {
  const D = window.MOCOA_DATA;
  const getLang = () => localStorage.getItem('mocoa-lang') || 'es';
  const t = (value) => value?.[getLang()] ?? value?.es ?? value ?? '';

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.L) {
      console.error('Leaflet did not load. Check your internet connection or the Leaflet URL.');
      const mapElement = document.querySelector('#map');
      if (mapElement) {
        const error = document.createElement('div');
        error.className = 'map-error';
        error.textContent = t(D.ui.mapError);
        mapElement.replaceChildren(error);
      }
      return;
    }

    const map = L.map('map', { scrollWheelZoom: false }).setView([1.1478, -76.6481], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markers = {};
    const list = document.querySelector('#mapList');
    const params = new URLSearchParams(location.search);
    const focus = params.get('focus');
    const language = getLang();

    D.experiences.forEach((experience) => {
      const detailLink = `experiencias/${experience.id}.html`;
      const mapMarker = L.marker(experience.coords).addTo(map).bindPopup(
        `<strong>${t(experience.name)}</strong><br><span>${t(experience.location)}</span><br><a href="${detailLink}">${language === 'es' ? 'Ver experiencia' : 'View experience'}</a>`
      );
      markers[experience.id] = mapMarker;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'map-item';
      button.dataset.id = experience.id;
      button.innerHTML = `<strong>${t(experience.name)}</strong><span>${t(experience.location)}</span>`;
      button.addEventListener('click', () => focusMarker(experience.id));
      list?.appendChild(button);
    });

    function focusMarker(id) {
      const experience = D.experiences.find((item) => item.id === id);
      if (!experience || !markers[id]) return;
      map.setView(experience.coords, 14);
      markers[id].openPopup();
      document.querySelectorAll('.map-item').forEach((item) => {
        item.classList.toggle('active', item.dataset.id === id);
      });
    }

    const search = document.querySelector('#mapSearch');
    search?.addEventListener('input', (event) => {
      const query = event.target.value.toLocaleLowerCase().trim();
      document.querySelectorAll('.map-item').forEach((item) => {
        item.style.display = item.textContent.toLocaleLowerCase().includes(query) ? 'block' : 'none';
      });
    });

    if (focus) focusMarker(focus);
    // Recalculate the map's dimensions after the layout is rendered.
    requestAnimationFrame(() => map.invalidateSize());
  });
})();
