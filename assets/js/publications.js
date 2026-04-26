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
    pt: { allYears:'Todos os anos', allRankings:'Todos os rankings', allAreas:'Todas as áreas', doi:'DOI', ssrn:'SSRN', journal:'Journal', scholar:'Google Scholar', shown:'publicações exibidas' },
    en: { allYears:'All years', allRankings:'All rankings', allAreas:'All areas', doi:'DOI', ssrn:'SSRN', journal:'Journal', scholar:'Google Scholar', shown:'publications shown' }
  }[lang];

  function unique(values){ return [...new Set(values.filter(Boolean))].sort().reverse(); }
  function fillSelect(select, values, firstLabel){
    if(!select) return;
    select.innerHTML = `<option value="">${firstLabel}</option>` + values.map(v => `<option value="${v}">${v}</option>`).join('');
  }

  fillSelect(yearFilter, unique(publications.map(p => String(p.year))), labels.allYears);
  fillSelect(rankingFilter, unique(publications.flatMap(p => Object.values(p.metrics || {}).filter(x => x && x !== '—'))), labels.allRankings);
  fillSelect(areaFilter, unique(publications.map(p => lang === 'en' ? p.area_en : p.area_pt)), labels.allAreas);

  function scholarLink(title){ return 'https://scholar.google.com/scholar?q=' + encodeURIComponent(title); }
  function slug(text){ return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }
  function impactBadge(p){
    const level = p.impact_level || 'unknown';
    const label = lang === 'en' ? (p.impact_label_en || 'Impact') : (p.impact_label_pt || 'Impacto');
    return `<span class="impact-badge impact-${level}"><span class="impact-dot">●</span>${label}</span>`;
  }
  function metricBadges(p){
    const m = p.metrics || {};
    const order = ['CAPES','ABDC','ABS','SJR','JCR','SPELL','Qualis'];
    return order.filter(k => m[k] && m[k] !== '—').map(k => `<span>${k}: ${m[k]}</span>`).join('');
  }

  function render(){
    const y = yearFilter ? yearFilter.value : '';
    const r = rankingFilter ? rankingFilter.value.toLowerCase() : '';
    const a = areaFilter ? areaFilter.value.toLowerCase() : '';
    const q = searchInput ? searchInput.value.toLowerCase() : '';
    const filtered = publications.filter(p => {
      const area = (lang === 'en' ? p.area_en : p.area_pt || '').toLowerCase();
      const metricText = Object.entries(p.metrics || {}).map(([k,v]) => `${k}: ${v}`).join(' ');
      const text = `${p.title} ${p.authors} ${p.journal} ${p.indexing} ${metricText}`.toLowerCase();
      return (!y || String(p.year) === y) && (!r || metricText.toLowerCase().includes(r)) && (!a || area === a) && (!q || text.includes(q));
    });
    if(summary) summary.textContent = `${filtered.length} ${labels.shown}`;
    if(!list) return;
    list.innerHTML = filtered.map(p => {
      const status = lang === 'en' ? p.status_en : p.status_pt;
      const area = lang === 'en' ? p.area_en : p.area_pt;
      const criterion = lang === 'en' ? p.criterion_en : p.criterion_pt;
      const id = slug(p.title);
      const actions = [
        p.doi ? `<a href="${p.doi}" target="_blank" rel="noopener" data-goatcounter-click="publication-doi-${id}">${labels.doi}</a>` : '',
        p.ssrn ? `<a href="${p.ssrn}" target="_blank" rel="noopener" data-goatcounter-click="publication-ssrn-${id}">${labels.ssrn}</a>` : '',
        p.journal_url ? `<a href="${p.journal_url}" target="_blank" rel="noopener" data-goatcounter-click="publication-journal-${id}">${labels.journal}</a>` : '',
        `<a href="${scholarLink(p.title)}" target="_blank" rel="noopener" data-goatcounter-click="publication-scholar-${id}">${labels.scholar}</a>`
      ].join('');
      return `<article class="publication-item"><div class="publication-topline"><span class="publication-year">${p.year}</span><span class="publication-status">${status}</span>${impactBadge(p)}</div><div class="publication-title">${p.title}</div><div class="publication-meta">${p.authors} · <em>${p.journal}</em></div><div class="publication-badges"><span>${area}</span><span>${p.indexing}</span>${metricBadges(p)}</div>${criterion ? `<div class="ranking-source">${criterion}</div>` : ''}<div class="publication-actions">${actions}</div></article>`;
    }).join('');
  }
  [yearFilter, rankingFilter, areaFilter, searchInput].filter(Boolean).forEach(el => el.addEventListener('input', render));
  render();
}
