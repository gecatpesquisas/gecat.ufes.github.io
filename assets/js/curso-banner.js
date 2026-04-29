(function(){
  function addStyles(){
    if(document.getElementById('curso-extensao-banner-style')) return;
    var style=document.createElement('style');
    style.id='curso-extensao-banner-style';
    style.textContent = '.curso-extensao-banner{background:linear-gradient(135deg,#0b5c5c,#13807a);color:#fff;border-radius:24px;margin:34px auto 0;padding:24px;box-shadow:0 22px 50px rgba(16,33,59,.16);position:relative;overflow:hidden}.curso-extensao-banner-inner{display:grid;grid-template-columns:1fr auto;gap:22px;align-items:center}.curso-extensao-banner .kicker{font-weight:900;text-transform:uppercase;letter-spacing:.16em;color:#d9f99d;font-size:.78rem;margin-bottom:8px}.curso-extensao-banner h2{margin:0 0 8px;color:#fff;font-family:"Source Serif 4",Georgia,serif;font-size:clamp(1.5rem,3vw,2.5rem);line-height:1.05}.curso-extensao-banner p{margin:0;max-width:760px;color:#eefdfb;line-height:1.6}.curso-extensao-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}.curso-extensao-actions a,.curso-extensao-actions button{border:0;border-radius:999px;padding:12px 16px;font-weight:900;cursor:pointer;text-decoration:none;font-family:inherit}.curso-extensao-actions a{background:#fff;color:#0b5c5c}.curso-extensao-actions button{background:rgba(255,255,255,.14);color:#fff}.curso-extensao-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.curso-extensao-tags span{border:1px solid rgba(255,255,255,.28);border-radius:999px;padding:7px 10px;font-weight:800;font-size:.83rem}.curso-modal{position:fixed;inset:0;background:rgba(16,33,59,.58);display:flex;align-items:center;justify-content:center;padding:20px;z-index:9999}.curso-modal-card{background:#fff;color:#10213b;max-width:620px;border-radius:24px;padding:28px;box-shadow:0 30px 80px rgba(0,0,0,.24)}.curso-modal-card h2{font-family:"Source Serif 4",Georgia,serif;font-size:2rem;margin:0 0 10px}.curso-modal-card p{color:#5b6b82;line-height:1.6}.curso-modal-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:20px}.curso-modal-actions a,.curso-modal-actions button{border:0;border-radius:999px;padding:12px 16px;font-weight:900;cursor:pointer;text-decoration:none;font-family:inherit}.curso-modal-actions a{background:#0b5c5c;color:#fff}.curso-modal-actions button{background:#eef4f3;color:#10213b}@media(max-width:780px){.curso-extensao-banner-inner{grid-template-columns:1fr}.curso-extensao-actions{justify-content:flex-start}}';
    document.head.appendChild(style);
  }
  function insertBanner(){
    var hero=document.querySelector('.hero');
    if(!hero || document.querySelector('.curso-extensao-banner')) return;
    var wrap=document.createElement('div');
    wrap.className='wrap';
    wrap.innerHTML='<div class="curso-extensao-banner" role="region" aria-label="Anúncio do curso de extensão"><div class="curso-extensao-banner-inner"><div><div class="kicker">Curso de extensão · inscrições em breve</div><h2>Contabilidade Pública e Lei de Responsabilidade Fiscal (LRF)</h2><p>Curso gratuito, semipresencial, com certificado de extensão emitido pela UFES. Início previsto para agosto de 2026.</p><div class="curso-extensao-tags"><span>UFES / UnAC</span><span>12 meses</span><span>15h mensais</span><span>Gestão fiscal e cidadania tributária</span></div></div><div class="curso-extensao-actions"><a href="curso-extensao.html">Saiba mais</a><button type="button" data-curso-dismiss>Ocultar</button></div></div></div>';
    hero.insertAdjacentElement('afterend', wrap);
    wrap.querySelector('[data-curso-dismiss]').addEventListener('click', function(){ wrap.remove(); try{sessionStorage.setItem('cursoExtensaoBannerFechado','1')}catch(e){} });
  }
  function showModalOnce(){
    try{ if(sessionStorage.getItem('cursoExtensaoModalVisto')==='1') return; sessionStorage.setItem('cursoExtensaoModalVisto','1'); }catch(e){}
    var modal=document.createElement('div');
    modal.className='curso-modal';
    modal.innerHTML='<div class="curso-modal-card"><div style="color:#2f767b;font-weight:900;text-transform:uppercase;letter-spacing:.14em">Novo curso de extensão</div><h2>Contabilidade Pública e LRF</h2><p>Curso gratuito, semipresencial, com certificado de extensão emitido pela UFES. Acompanhe as informações e o período de inscrição pelo site do GECAT.</p><div class="curso-modal-actions"><a href="curso-extensao.html">Ver página do curso</a><button type="button" data-curso-modal-close>Fechar</button></div></div>';
    document.body.appendChild(modal);
    function close(){ modal.remove(); }
    modal.querySelector('[data-curso-modal-close]').addEventListener('click', close);
    modal.addEventListener('click', function(e){ if(e.target===modal) close(); });
  }
  document.addEventListener('DOMContentLoaded', function(){ addStyles(); try{ if(sessionStorage.getItem('cursoExtensaoBannerFechado')!=='1') insertBanner(); }catch(e){ insertBanner(); } setTimeout(showModalOnce, 800); });
})();