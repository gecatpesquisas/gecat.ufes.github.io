function escapeHtml(value){
  return String(value ?? '').replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
}

function scholarUrl(title){
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`;
}

function normalizeDoiLink(doi){
  if(!doi) return '';
  const clean = String(doi).trim();
  if(clean.startsWith('http')) return clean;
  return `https://doi.org/${clean.replace(/^doi:\s*/i,'')}`;
}

function linkButton(label, href){
  if(!href) return '';
  return `<a class="paper-link" href="${escapeHtml(href)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
}

function renderLinks(item){
  const links = [];
  const doi = normalizeDoiLink(item.doi || item.doi_url);
  if(doi) links.push(linkButton('DOI', doi));
  if(item.ssrn) links.push(linkButton('SSRN', item.ssrn));
  if(item.url) links.push(linkButton(item.url_label || 'Acesso', item.url));
  if(item.pdf) links.push(linkButton('PDF', item.pdf));
  links.push(linkButton('Google Scholar', item.scholar || scholarUrl(item.title || '')));
  return `<div class="paper-links">${links.join('')}</div>`;
}

async function renderList(jsonPath, targetId, emptyText='No items available.'){
  const target=document.getElementById(targetId);
  if(!target) return;
  try{
    const res=await fetch(jsonPath,{cache:'no-store'});
    const data=await res.json();
    if(!data.length){target.innerHTML=`<p class="small">${escapeHtml(emptyText)}</p>`;return;}
    target.innerHTML=data.map(item=>`
      <article class="pub">
        <div class="year">${escapeHtml(item.year||'')}</div>
        <div>
          <div class="pub-title">${escapeHtml(item.title||'')}</div>
          <div class="meta">${escapeHtml(item.authors||'')}${item.venue?' · '+escapeHtml(item.venue):''}${item.type?' · '+escapeHtml(item.type):''}${item.status?' · '+escapeHtml(item.status):''}</div>
          ${renderLinks(item)}
        </div>
      </article>`).join('');
  }catch(e){
    target.innerHTML=`<p class="small">${escapeHtml(emptyText)}</p>`;
  }
}
