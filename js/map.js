(function () {
  const D = window.MOCOA_DATA;
  const getLang = () => localStorage.getItem('mocoa-lang') || 'es';
  const t = (value) => value?.[getLang()] ?? value?.es ?? value ?? '';
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('#mapList');
    const status = document.querySelector('#mapStatus');
    const results = document.querySelector('#mapResults');
    const markers = {};
    const focus = new URLSearchParams(location.search).get('focus');
    let map;
    function showStatus(message) { status.textContent = message; status.hidden = false; }
    if (window.L) {
      map = L.map('map', { scrollWheelZoom: false }).setView([1.1478, -76.6481], 11);
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      tiles.on('tileerror', () => showStatus(t(D.ui.mapTilesError)));
    } else {
      const error = document.createElement('div');
      error.className = 'map-error'; error.textContent = t(D.ui.mapError);
      document.querySelector('#map').replaceChildren(error);
    }
    D.experiences.forEach((experience) => {
      const detailLink = `experiencias/${experience.id}.html`;
      if (map) {
        markers[experience.id] = L.marker(experience.coords, { title: t(experience.name), alt: t(experience.name) }).addTo(map).bindPopup(
          `<strong>${t(experience.name)}</strong><br><span>${t(experience.location)}</span><br><a href="${detailLink}">${t(D.ui.viewExperience)}</a>`
        );
      }
      const entry = document.createElement('div'); entry.className = 'map-entry'; entry.dataset.id = experience.id;
      const button = document.createElement('button'); button.type = 'button'; button.className = 'map-item'; button.dataset.id = experience.id;
      button.innerHTML = `<strong>${t(experience.name)}</strong><span>${t(experience.location)}</span>`;
      button.disabled = !map; button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => {
        focusMarker(experience.id);
        if (window.matchMedia('(max-width:900px)').matches) document.querySelector('#map').scrollIntoView({block:'start'});
      });
      const link = document.createElement('a'); link.href = detailLink; link.className = 'map-detail-link'; link.textContent = t(D.ui.viewExperience);
      link.setAttribute('aria-label', `${t(D.ui.viewExperience)}: ${t(experience.name)}`);
      entry.append(button, link); list?.appendChild(entry);
    });
    function focusMarker(id) {
      const experience = D.experiences.find((item) => item.id === id);
      if (!experience || !markers[id]) return;
      map.setView(experience.coords, 14); markers[id].openPopup();
      document.querySelectorAll('.map-item').forEach((item) => {
        const active = item.dataset.id === id; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active));
      });
    }
    const search = document.querySelector('#mapSearch');
    function filterList() {
      const query = normalize(search.value); let count = 0;
      document.querySelectorAll('.map-entry').forEach((entry) => {
        const item = D.experiences.find(experience => experience.id === entry.dataset.id);
        entry.hidden = !normalize([item.name.es, item.name.en, item.location.es, item.location.en].join(' ')).includes(query);
        if (!entry.hidden) count++;
      });
      results.textContent = count ? `${t(D.ui.mapResults)}: ${count}` : t(D.ui.mapNoResults);
    }
    search?.addEventListener('input', filterList); filterList();
    if (focus) focusMarker(focus);
    if (map) requestAnimationFrame(() => map.invalidateSize());
  });
})();
