(function () {
  const D = window.MOCOA_DATA;
  const BASE = document.body.dataset.page === 'experience' ? '../' : '';
  const getLang = () => localStorage.getItem('mocoa-lang') || 'es';
  let lang = getLang();

  const resolve = (path) => path.split('.').reduce((value, key) => value?.[key], D);
  window.t = (value) => value?.[lang] ?? value?.es ?? value ?? '';
  window.getExp = (id) => D.experiences.find((experience) => experience.id === id);

  function setText() {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const value = resolve(element.dataset.i18n);
      if (value && (value.es || value.en)) element.textContent = window.t(value);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const value = resolve(element.dataset.i18nPlaceholder);
      if (value) element.setAttribute('placeholder', window.t(value));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      const value = resolve(element.dataset.i18nAria);
      if (value) element.setAttribute('aria-label', window.t(value));
    });

    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.classList.toggle('active', button.dataset.lang === lang);
      button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });

    document.documentElement.lang = lang;
    const titleKey = document.body.dataset.titleKey;
    const titleValue = titleKey ? window.t(resolve(titleKey)) : document.body.dataset.title;
    document.title = titleValue ? `${window.t(D.site.name)} · ${titleValue}` : window.t(D.site.name);
  }

  function injectHeader() {
    const host = document.querySelector('#site-header');
    if (!host) return;
    const page = document.body.dataset.page;
    const current = page === 'experience' ? window.getExp(document.body.dataset.experienceId) : null;
    const sectionTitle = current ? window.t(current.name) : page === 'category' ? window.t(D.categories[document.body.dataset.category].title) : page === 'map' ? window.t(D.ui.experienceMap) : page === 'credits' ? window.t(D.ui.creditsAndSources) : '';
    const backHref = current ? `${BASE}${current.category}.html` : `${BASE}index.html`;
    host.innerHTML = `
      <header class="site-header">
        <div class="container nav" id="nav">
          <a class="brand" href="${BASE}index.html" aria-label="Mocoa Vive — ${lang === 'es' ? 'inicio' : 'home'}"><span class="brand-mark" aria-hidden="true">M</span><span>Mocoa Vive</span></a>
          <nav id="main-nav-links" class="nav-links" aria-label="${lang === 'es' ? 'Navegación principal' : 'Main navigation'}">
            <a href="${BASE}index.html">${window.t(D.ui.home)}</a>
            <a href="${BASE}naturaleza.html">${window.t(D.categories.naturaleza.title)}</a>
            <a href="${BASE}biodiversidad.html">${window.t(D.categories.biodiversidad.title)}</a>
            <a href="${BASE}cultura.html">${window.t(D.categories.cultura.title)}</a>
            <a href="${BASE}gastronomia.html">${window.t(D.categories.gastronomia.title)}</a>
            <a href="${BASE}mapa.html">${window.t(D.ui.map)}</a>
          </nav>
          <div class="nav-actions">
            <div class="lang" aria-label="${window.t(D.ui.language)}">
              <button type="button" data-lang="es">ES</button>
              <button type="button" data-lang="en">EN</button>
            </div>
            <button type="button" class="menu-btn" id="menuBtn" aria-controls="main-nav-links" aria-label="${window.t(D.ui.menu)}" aria-expanded="false">☰</button>
          </div>
        </div>
        ${sectionTitle ? `<div class="mobile-section-bar"><div class="container mobile-section-inner"><a href="${backHref}" class="mobile-back">← ${window.t(D.ui.back)}</a><span>${sectionTitle}</span></div></div>` : ''}
      </header>`;

    host.querySelectorAll('[data-lang]').forEach((button) => {
      button.addEventListener('click', () => {
        localStorage.setItem('mocoa-lang', button.dataset.lang);
        location.reload();
      });
    });
    host.querySelector('#menuBtn')?.addEventListener('click', (event) => {
      const nav = host.querySelector('#nav');
      nav.classList.toggle('mobile-open');
      event.currentTarget.setAttribute('aria-expanded', String(nav.classList.contains('mobile-open')));
    });
  }

  function injectFooter() {
    const host = document.querySelector('#site-footer');
    if (!host) return;
    host.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div><h3>Mocoa Vive</h3><p>${window.t(D.site.tagline)}.</p></div>
          <div><h3>${lang === 'es' ? 'Explora' : 'Explore'}</h3>
            <p><a href="${BASE}mapa.html">${window.t(D.ui.experienceMap)}</a></p>
            <p><a href="${BASE}naturaleza.html">${window.t(D.categories.naturaleza.title)}</a></p>
            <p><a href="${BASE}creditos.html">${window.t(D.ui.creditsAndSources)}</a></p>
          </div>
          <div><h3>${window.t(D.ui.projectAcademic)}</h3><p>${window.t(D.ui.projectDescription)}</p></div>
        </div>
        <div class="container credits">${lang === 'es' ? 'Contenido informativo: verifica horarios, accesos, tarifas y condiciones antes de cada visita.' : 'Informational content: check opening hours, access, fees, and conditions before each visit.'}</div>
      </footer>`;
  }

  function getTagLabel(tag) {
    return window.t(D.tagLabels?.[tag] || { es: tag, en: tag });
  }

  function renderTags(tags) {
    return (tags || []).map((tag) => `<span class="tag">${getTagLabel(tag)}</span>`).join('');
  }

  function card(id) {
    const experience = window.getExp(id);
    if (!experience) return '';
    const image = `${BASE}${experience.image}`;
    return `
      <article class="experience-card">
        <a class="card-image" href="${BASE}experiencias/${experience.id}.html" aria-label="${window.t(D.ui.viewExperience)}: ${window.t(experience.name)}">
          <img src="${image}" alt="${window.t(experience.imageAlt || experience.name)}" loading="lazy" decoding="async" onerror="this.style.display='none'">
          <span class="image-fallback" aria-hidden="true">${window.t(experience.name)}</span>
        </a>
        <div class="card-body">
          <h3>${window.t(experience.name)}</h3>
          <div class="card-meta">📍 ${window.t(experience.location)}</div>
          <p>${window.t(experience.short)}</p>
          <div class="tags">${renderTags(experience.tags)}</div>
          <div class="actions" style="margin-top:14px">
            <a class="btn small card-detail-link" aria-label="${window.t(D.ui.viewExperience)}: ${window.t(experience.name)}" href="${BASE}experiencias/${experience.id}.html">${window.t(D.ui.viewExperience)}</a>
          </div>
        </div>
      </article>`;
  }

  window.renderCategoryPage = (categoryId) => {
    const category = D.categories[categoryId];
    if (!category) return;
    document.body.dataset.title = window.t(category.title);
    const title = document.querySelector('[data-page-title]');
    if (title) title.textContent = window.t(category.title);
    const description = document.querySelector('[data-page-desc]');
    if (description) description.textContent = window.t(category.description);
    const breadcrumb = document.querySelector('[data-category-breadcrumb]');
    if (breadcrumb) breadcrumb.textContent = window.t(category.label || category.title);
    const container = document.querySelector('#subsections');
    if (container) {
      container.innerHTML = Object.entries(category.subsections).map(([key, subsection]) => `
        <section class="subsection">
          <div class="subsection-title"><div><div class="eyebrow">${category.icon} ${window.t(category.label || category.title)}</div><h2>${window.t(subsection.title)}</h2></div></div>
          <div class="experience-grid">${subsection.items.map(card).join('')}</div>
        </section>`).join('');
    }
    setText();
  };

  window.initCommon = () => { injectHeader(); injectFooter(); setText(); };

  window.renderHome = () => {
    window.initCommon();
    const featured = document.querySelector('#featured');
    if (featured) featured.innerHTML = D.experiences.slice(0, 6).map((experience) => card(experience.id)).join('');
    const categories = document.querySelector('#categoryGrid');
    if (categories) {
      categories.innerHTML = Object.entries(D.categories).map(([id, category]) => `
        <a class="category-card" href="${id}.html">
          <div class="category-icon" aria-hidden="true">${category.icon}</div>
          <h3>${window.t(category.title)}</h3>
          <p>${window.t(category.description)}</p>
          <span class="text-link">${window.t(D.ui.exploreArrow)}</span>
        </a>`).join('');
    }
    setText();
  };

  window.renderExperience = () => {
    window.initCommon();
    const id = document.body.dataset.experienceId;
    const experience = window.getExp(id);
    if (!experience) {
      const main = document.querySelector('#main');
      if (main) main.insertAdjacentHTML('afterbegin', `<p class="container notice">${lang === 'es' ? 'No se encontró la ficha de esta experiencia.' : 'The details for this experience could not be found.'}</p>`);
      return;
    }
    document.body.dataset.title = window.t(experience.name);
    const name = document.querySelector('[data-exp-name]');
    if (name) name.textContent = window.t(experience.name);
    const location = document.querySelector('[data-exp-location]');
    if (location) location.textContent = `📍 ${window.t(experience.location)}`;
    const short = document.querySelector('[data-exp-short]');
    if (short) short.textContent = window.t(experience.short);
    const description = document.querySelector('[data-exp-description]');
    if (description) description.textContent = window.t(experience.description);

    const image = document.querySelector('[data-exp-image]');
    if (image) {
      image.src = `${BASE}${experience.image}`;
      image.alt = window.t(experience.imageAlt || experience.name);
    }
    document.querySelectorAll('[data-exp-extra]').forEach((paragraph) => {
      const index = Number(paragraph.dataset.expExtra);
      paragraph.textContent = experience.extraDescription?.[lang]?.[index] || '';
    });
    document.querySelectorAll('.detail-gallery img').forEach((galleryImage, index) => {
      const alt = experience.galleryAlt?.[index];
      if (alt) galleryImage.alt = window.t(alt);
    });
    const tags = document.querySelector('[data-exp-tags]');
    if (tags) tags.innerHTML = renderTags(experience.tags);
    const mapLink = document.querySelector('[data-exp-map]');
    if (mapLink) mapLink.href = `../mapa.html?focus=${experience.id}`;
    const category = D.categories[experience.category];
    const categoryLink = document.querySelector('[data-exp-category]');
    if (categoryLink && category) {
      categoryLink.href = `../${experience.category}.html`;
      categoryLink.textContent = window.t(category.label || category.title);
    }
    const backLink = document.querySelector('[data-exp-back-category]');
    if (backLink) backLink.href = `../${experience.category}.html`;
    const detailCopy = document.querySelector('.detail-copy');
    if (detailCopy) {
      const facts = document.createElement('div');
      facts.className = 'facts experience-facts';
      facts.innerHTML = `<div class="fact"><small>${window.t(D.ui.activitiesTitle)}</small><strong>${window.t(experience.activities)}</strong></div><div class="fact"><small>${window.t(D.ui.locationTitle)}</small><strong>${window.t(experience.location)}</strong><p>${window.t(D.ui.locationNote)}</p></div>`;
      detailCopy.querySelector('.actions')?.after(facts);
    }
    const related = D.experiences.filter(item => item.category === experience.category && item.id !== id).slice(0, 3);
    if (related.length) document.querySelector('#main').insertAdjacentHTML('beforeend', `<section class="section related-section"><div class="container"><div class="section-head"><div><h2>${window.t(D.ui.relatedTitle)}</h2><p>${window.t(D.ui.relatedDescription)}</p></div></div><div class="experience-grid">${related.map(item => card(item.id)).join('')}</div></div></section>`);
    setText();
  };

  window.renderCredits = () => {
    window.initCommon();
    const rows = document.querySelector('#imageCreditRows');
    if (!rows) return;
    const names = Object.fromEntries(D.experiences.map((experience) => [experience.id, window.t(experience.name)]));
    names.hero = lang === 'es' ? 'Imagen principal del sitio' : 'Website hero image';
    const na = lang === 'es' ? 'No disponible (NA)' : 'Not available (NA)';
    rows.innerHTML = (D.imageCredits || []).map((item) => {
      const experienceName = names[item.experienceId] || (item.experienceId === 'NA' ? na : item.experienceId);
      const sourceText = window.t(item.source);
      const creditText = window.t(item.credit);
      const sourceMarkup = item.url
        ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer">${sourceText}</a>`
        : `<span>${sourceText}</span>`;
      return `<tr><td>${experienceName}</td><td><code>${item.file}</code></td><td>${creditText}</td><td>${sourceMarkup}</td></tr>`;
    }).join('');
    setText();
  };

  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page;
    if (page === 'home') window.renderHome();
    else if (page === 'category') { window.initCommon(); window.renderCategoryPage(document.body.dataset.category); }
    else if (page === 'experience') window.renderExperience();
    else if (page === 'credits') window.renderCredits();
    else if (page === 'map') window.initCommon();
  });
})();
