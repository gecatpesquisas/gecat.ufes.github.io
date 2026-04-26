
async function loadPublications(lang){
  const response = await fetch((lang === 'en' ? '../' : '') + 'data/publications_lse_nber.json');
  const publications = await response.json();

  const list = document.getElementById('publication-list');
  const yearFilter = document.getElementById('filter-year');
  const rankingFilter = document.getElementById('filter-ranking');
  const areaFilter = document.getElementById('filter-area');
  const searchInput = document.getElementById('filter-search');
  const summary = document.getElementById('pub-summary');

  const labels = {
    pt: {
      allYears:'Todos os anos',
      allRankings:'Todos os rankings',
      allAreas:'Todas as áreas',
      doi:'DOI',
      ssrn:'SSRN',
      journal:'Journal',
      scholar:'Google Scholar',
      shown:'publicações exibidas',
      capes:'CAPES 2025–2028',
      basis:'Critério'
    },
    en: {
      allYears:'All years',
      allRankings:'All rankings',
      allAreas:'All areas',
      doi:'DOI',
      ssrn:'SSRN',
      journal:'Journal',
      scholar:'Google Scholar',
      shown:'publications shown',
      capes:'CAPES 2025–2028',
      basis:'Basis'
    }
  }[lang];

  function unique(values){
    return [...new Set(values.filter(Boolean))].sort().reverse();
  }

  function fillSelect(select, values, firstLabel){
    select.innerHTML = `<option value="">${firstLabel}</option>` + values.map(v => `<option value="${v}">${v}</option>`).join('');
  }

  fillSelect(yearFilter, unique(publications.map(p => String(p.year))), labels.allYears);
  fillSelect(rankingFilter, unique(publications.map(p => (p.ranking || '').split('·')[0].trim())), labels.allRankings);
  fillSelect(areaFilter, unique(publications.map(p => lang === 'en' ? p.area_en : p.area_pt)), labels.allAreas);

  function scholarLink(title){
    return 'https://scholar.google.com/scholar?q=' + encodeURIComponent(title);
  }

  function slug(text){
    return text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  }

  function impactBadge(p){
    const level = p.impact_level || 'unknown';
    const label = lang === 'en' ? (p.impact_label_en || 'Impact to verify') : (p.impact_label_pt || 'Impacto a verificar');
    return `<span class="impact-badge impact-${level}"><span class="impact-dot">●</span>${label}</span>`;
  }

  function render(){
    const y = yearFilter.value;
    const r = rankingFilter.value.toLowerCase();
    const a = areaFilter.value.toLowerCase();
    const q = searchInput.value.toLowerCase();

    const filtered = publications.filter(p => {
      const area = (lang === 'en' ? p.area_en : p.area_pt || '').toLowerCase();
      const text = `${p.title} ${p.authors} ${p.journal} ${p.indexing} ${p.ranking} ${p.capes_2025_2028}`.toLowerCase();
      return (!y || String(p.year) === y)
        && (!r || (p.ranking || '').toLowerCase().includes(r))
        && (!a || area === a)
        && (!q || text.includes(q));
    });

    summary.textContent = `${filtered.length} ${labels.shown}`;
    list.innerHTML = filtered.map(p => {
      const status = lang === 'en' ? p.status_en : p.status_pt;
      const area = lang === 'en' ? p.area_en : p.area_pt;
      const id = slug(p.title);
      const capes = p.capes_2025_2028 ? `<span>${labels.capes}: ${p.capes_2025_2028}</span>` : '';
      const basis = lang === 'en' ? (p.impact_basis_en || '') : (p.impact_basis_pt || '');
      const actions = [
        p.doi ? `<a href="${p.doi}" target="_blank" rel="noopener" data-goatcounter-click="publication-doi-${id}">${labels.doi}</a>` : '',
        p.ssrn ? `<a href="${p.ssrn}" target="_blank" rel="noopener" data-goatcounter-click="publication-ssrn-${id}">${labels.ssrn}</a>` : '',
        p.journal_url ? `<a href="${p.journal_url}" target="_blank" rel="noopener" data-goatcounter-click="publication-journal-${id}">${labels.journal}</a>` : '',
        `<a href="${scholarLink(p.title)}" target="_blank" rel="noopener" data-goatcounter-click="publication-scholar-${id}">${labels.scholar}</a>`
      ].join('');

      return `
        <article class="publication-item">
          <div class="publication-topline">
            <span class="publication-year">${p.year}</span>
            <span class="publication-status">${status}</span>
            ${impactBadge(p)}
          </div>
          <div class="publication-title">${p.title}</div>
          <div class="publication-meta">${p.authors} · <em>${p.journal}</em></div>
          <div class="publication-badges">
            <span>${area}</span>
            <span>${p.indexing}</span>
            <span>${p.ranking}</span>
            ${capes}
          </div>
          ${basis ? `<div class="ranking-source">${labels.basis}: ${basis}</div>` : ''}
          <div class="publication-actions">${actions}</div>
        </article>
      `;
    }).join('');
  }

  [yearFilter, rankingFilter, areaFilter, searchInput].forEach(el => el.addEventListener('input', render));
  render();
}
