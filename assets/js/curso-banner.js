(function(){
  function addStyles(){
    if(document.getElementById('curso-extensao-carousel-style')) return;
    var style=document.createElement('style');
    style.id='curso-extensao-carousel-style';
    style.textContent = `
      .curso-carousel-wrap{
        margin:34px auto 0;
      }
      .curso-carousel{
        position:relative;
        overflow:hidden;
        border-radius:24px;
        box-shadow:0 22px 50px rgba(16,33,59,.14);
        background:#fff;
        border:1px solid rgba(220,229,228,.9);
      }
      .curso-carousel-track{
        display:flex;
        transition:transform .55s ease;
      }
      .curso-carousel-slide{
        min-width:100%;
      }
      .curso-carousel-image-link{
        display:block;
        background:#f7fbfb;
      }
      .curso-carousel-image{
        display:block;
        width:100%;
        height:auto;
      }
      .curso-carousel-info{
        background:linear-gradient(135deg,#0b5c5c,#13807a);
        color:#fff;
        padding:30px;
        min-height:230px;
        display:grid;
        grid-template-columns:1fr auto;
        gap:22px;
        align-items:center;
      }
      .curso-carousel-info .kicker{
        font-weight:900;
        text-transform:uppercase;
        letter-spacing:.16em;
        color:#d9f99d;
        font-size:.78rem;
        margin-bottom:8px;
      }
      .curso-carousel-info h2{
        margin:0 0 10px;
        color:#fff;
        font-family:"Source Serif 4",Georgia,serif;
        font-size:clamp(1.5rem,3vw,2.7rem);
        line-height:1.05;
      }
      .curso-carousel-info p{
        margin:0;
        max-width:800px;
        color:#eefdfb;
        line-height:1.6;
      }
      .curso-carousel-tags{
        display:flex;
        gap:8px;
        flex-wrap:wrap;
        margin-top:14px;
      }
      .curso-carousel-tags span{
        border:1px solid rgba(255,255,255,.3);
        border-radius:999px;
        padding:7px 10px;
        font-weight:800;
        font-size:.83rem;
      }
      .curso-carousel-actions{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        justify-content:flex-end;
      }
      .curso-carousel-actions a,
      .curso-carousel-actions button{
        border:0;
        border-radius:999px;
        padding:12px 16px;
        font-weight:900;
        cursor:pointer;
        text-decoration:none;
        font-family:inherit;
      }
      .curso-carousel-actions a{
        background:#fff;
        color:#0b5c5c;
      }
      .curso-carousel-actions button{
        background:rgba(255,255,255,.15);
        color:#fff;
      }
      .curso-carousel-dots{
        position:absolute;
        left:0;
        right:0;
        bottom:14px;
        display:flex;
        justify-content:center;
        gap:8px;
        pointer-events:none;
      }
      .curso-carousel-dot{
        width:10px;
        height:10px;
        border-radius:50%;
        background:rgba(255,255,255,.55);
        border:1px solid rgba(16,33,59,.18);
      }
      .curso-carousel-dot.active{
        background:#0b5c5c;
      }
      .curso-modal{
        position:fixed;
        inset:0;
        background:rgba(16,33,59,.58);
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
        z-index:9999;
      }
      .curso-modal-card{
        background:#fff;
        color:#10213b;
        max-width:620px;
        border-radius:24px;
        padding:28px;
        box-shadow:0 30px 80px rgba(0,0,0,.24);
      }
      .curso-modal-card h2{
        font-family:"Source Serif 4",Georgia,serif;
        font-size:2rem;
        margin:0 0 10px;
      }
      .curso-modal-card p{
        color:#5b6b82;
        line-height:1.6;
      }
      .curso-modal-actions{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        margin-top:20px;
      }
      .curso-modal-actions a,
      .curso-modal-actions button{
        border:0;
        border-radius:999px;
        padding:12px 16px;
        font-weight:900;
        cursor:pointer;
        text-decoration:none;
        font-family:inherit;
      }
      .curso-modal-actions a{
        background:#0b5c5c;
        color:#fff;
      }
      .curso-modal-actions button{
        background:#eef4f3;
        color:#10213b;
      }
      @media(max-width:780px){
        .curso-carousel-info{
          grid-template-columns:1fr;
          padding:24px;
        }
        .curso-carousel-actions{
          justify-content:flex-start;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function insertCarousel(){
    var hero=document.querySelector('.hero');
    if(!hero || document.querySelector('.curso-carousel')) return;

    var wrap=document.createElement('div');
    wrap.className='wrap curso-carousel-wrap';
    wrap.innerHTML = `
      <section class="curso-carousel" aria-label="Destaque do curso de extensão">
        <div class="curso-carousel-track">
          <article class="curso-carousel-slide">
            <a class="curso-carousel-image-link" href="curso-extensao.html">
              <img class="curso-carousel-image" src="assets/images/curso-extensao-lrf.png" alt="Curso de Extensão em Contabilidade Pública e Lei de Responsabilidade Fiscal">
            </a>
          </article>
          <article class="curso-carousel-slide">
            <div class="curso-carousel-info">
              <div>
                <div class="kicker">Curso de extensão · inscrições em breve</div>
                <h2>Contabilidade Pública e Lei de Responsabilidade Fiscal (LRF)</h2>
                <p>Curso gratuito, semipresencial, com certificado de extensão emitido pela UFES. Início previsto para agosto de 2026.</p>
                <div class="curso-carousel-tags">
                  <span>UFES / UnAC</span>
                  <span>12 meses</span>
                  <span>15h mensais</span>
                  <span>Gestão fiscal e cidadania tributária</span>
                </div>
              </div>
              <div class="curso-carousel-actions">
                <a href="curso-extensao.html">Saiba mais</a>
                <button type="button" data-curso-dismiss>Ocultar</button>
              </div>
            </div>
          </article>
        </div>
        <div class="curso-carousel-dots" aria-hidden="true">
          <span class="curso-carousel-dot active"></span>
          <span class="curso-carousel-dot"></span>
        </div>
      </section>
    `;

    hero.insertAdjacentElement('afterend', wrap);

    var track=wrap.querySelector('.curso-carousel-track');
    var dots=wrap.querySelectorAll('.curso-carousel-dot');
    var index=0;

    function go(next){
      index=next;
      track.style.transform='translateX(' + (-100*index) + '%)';
      dots.forEach(function(dot,i){ dot.classList.toggle('active', i===index); });
    }

    var timer=setInterval(function(){ go(index===0 ? 1 : 0); }, 6500);
    wrap.addEventListener('mouseenter', function(){ clearInterval(timer); });
    wrap.addEventListener('mouseleave', function(){ timer=setInterval(function(){ go(index===0 ? 1 : 0); }, 6500); });

    var btn=wrap.querySelector('[data-curso-dismiss]');
    btn.addEventListener('click', function(){
      wrap.remove();
      try{ sessionStorage.setItem('cursoExtensaoBannerFechado','1'); }catch(e){}
    });
  }

  function showModalOnce(){
    try{
      if(sessionStorage.getItem('cursoExtensaoModalVisto')==='1') return;
      sessionStorage.setItem('cursoExtensaoModalVisto','1');
    }catch(e){}
    var modal=document.createElement('div');
    modal.className='curso-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.innerHTML = `
      <div class="curso-modal-card">
        <div style="color:#2f767b;font-weight:900;text-transform:uppercase;letter-spacing:.14em">Novo curso de extensão</div>
        <h2>Contabilidade Pública e LRF</h2>
        <p>Curso gratuito, semipresencial, com certificado de extensão emitido pela UFES. Acompanhe as informações e o período de inscrição pelo site do GECAT.</p>
        <div class="curso-modal-actions">
          <a href="curso-extensao.html">Ver página do curso</a>
          <button type="button" data-curso-modal-close>Fechar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    function close(){ modal.remove(); }
    modal.querySelector('[data-curso-modal-close]').addEventListener('click', close);
    modal.addEventListener('click', function(e){ if(e.target===modal) close(); });
  }

  document.addEventListener('DOMContentLoaded', function(){
    addStyles();
    try{
      if(sessionStorage.getItem('cursoExtensaoBannerFechado')!=='1') insertCarousel();
    }catch(e){ insertCarousel(); }
    setTimeout(showModalOnce, 800);
  });
})();
