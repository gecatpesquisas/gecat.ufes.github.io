
async function loadWorkingPapers(lang){
  const base = lang === 'en' ? '../' : '';
  const response = await fetch(base + 'data/ssrn_papers.json');
  const data = await response.json();
  const list = document.getElementById('working-paper-list');
  if(!list) return;

  const labels = {
    pt: { abstract:'Ver resumo', hide:'Ocultar resumo', ssrn:'SSRN', doi:'DOI', year:'Working Paper' },
    en: { abstract:'Show abstract', hide:'Hide abstract', ssrn:'SSRN', doi:'DOI', year:'Working Paper' }
  }[lang];

  function slug(text){
    return text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  }

  list.innerHTML = data.papers.map((p, i) => {
    const id = 'wp-abstract-' + i;
    const abstractText = lang === 'en' ? p.abstract_en : p.abstract_pt;
    const safeSlug = slug(p.title);
    return `
      <article class="wp-item">
        <div class="wp-meta">${labels.year} · ${p.year}</div>
        <h2 class="wp-title">${p.title}</h2>
        <div class="wp-authors">${p.authors}</div>
        <div class="wp-actions">
          <button type="button" onclick="toggleWPAbstract('${id}', this, '${labels.abstract}', '${labels.hide}')">${labels.abstract}</button>
          <a href="${p.ssrn}" target="_blank" rel="noopener" data-goatcounter-click="wp-ssrn-${safeSlug}">${labels.ssrn}</a>
          <a href="${p.doi}" target="_blank" rel="noopener" data-goatcounter-click="wp-doi-${safeSlug}">${labels.doi}</a>
        </div>
        <div id="${id}" class="wp-abstract">${abstractText}</div>
      </article>
    `;
  }).join('');
}

function toggleWPAbstract(id, btn, showLabel, hideLabel){
  const el = document.getElementById(id);
  if(!el) return;
  const open = el.classList.toggle('open');
  btn.textContent = open ? hideLabel : showLabel;
}
