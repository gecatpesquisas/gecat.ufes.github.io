(function(){
  function addStyles(){
    var old = document.getElementById('curso-extensao-carousel-style');
    if(old) old.remove();

    var style = document.createElement('style');
    style.id = 'curso-extensao-carousel-style';
    style.textContent = `
      .curso-carousel-wrap{
        margin:34px auto 0;
      }

      .curso-carousel{
        position:relative !important;
        overflow:hidden !important;
        border-radius:24px;
        box-shadow:0 22px 50px rgba(16,33,59,.14);
        background:#fff;
        border:1px solid rgba(220,229,228,.9);
      }

      .curso-carousel-track{
        display:flex;
        transition:transform .55s ease;
        will-change:transform;
      }

      .curso-carousel-slide{
        min-width:100%;
        width:100%;
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

      .curso-carousel-actions a{
        border:0;
        border-radius:999px;
        padding:12px 16px;
        font-weight:900;
        text-decoration:none;
        font-family:inherit;
        background:#fff;
        color:#0b5c5c;
      }

      .curso-carousel-dots{
        position:absolute !important;
        left:0;
        right:0;
        bottom:14px;
        display:flex;
        justify-content:center;
        gap:8px;
        z-index:30 !important;
      }

      .curso-carousel-dot{
        width:11px;
        height:11px;
        border-radius:50%;
        background:rgba(255,255,255,.85);
        border:1px solid rgba(16,33,59,.25);
        cursor:pointer;
      }

      .curso-carousel-dot.active{
        background:#0b5c5c;
      }

      .curso-carousel-arrow{
        position:absolute !important;
        top:50% !important;
        transform:translateY(-50%) !important;
        z-index:999 !important;
        width:56px !important;
        height:56px !important;
        border-radius:999px !important;
        border:3px solid #ffffff !important;
        background:#0b5c5c !important;
        color:#ffffff !important;
        font-size:34px !important;
        font-weight:900 !important;
        line-height:1 !important;
        display:flex !important;
        align-items:center !important;
        justify-content:center !important;
        cursor:pointer !important;
        box-shadow:0 12px 30px rgba(16,33,59,.35) !important;
        opacity:1 !important;
        visibility:visible !important;
        pointer-events:auto !important;
      }

      .curso-carousel-arrow:hover{
        background:#13807a !important;
      }

      .curso-carousel-arrow.prev{
        left:22px !important;
      }

      .curso-carousel-arrow.next{
        right:22px !important;
      }

      @media(max-width:780px){
        .curso-carousel-info{
          grid-template-columns:1fr;
          padding:24px;
        }

        .curso-carousel-actions{
          justify-content:flex-start;
        }

        .curso-carousel-arrow{
          width:44px !important;
          height:44px !important;
          font-size:26px !important;
        }

        .curso-carousel-arrow.prev{
          left:10px !important;
        }

        .curso-carousel-arrow.next{
          right:10px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function insertCarousel(){
    var existing = document.querySelector('.curso-carousel-wrap');
    if(existing) existing.remove();

    var target = document.querySelector('.hero') || document.querySelector('header') || document.querySelector('.site-header');
    if(!target) return;

    var wrap = document.createElement('div');
    wrap.className = 'wrap curso-carousel-wrap';

    wrap.innerHTML = `
      <section class="curso-carousel" aria-label="Destaque do curso de extensão">

        <button class="curso-carousel-arrow prev" type="button" aria-label="Slide anterior">‹</button>
        <button class="curso-carousel-arrow next" type="button" aria-label="Próximo slide">›</button>

        <div class="curso-carousel-track">
          <article class="curso-carousel-slide">
            <a class="curso-carousel-image-link" href="curso-extensao.html">
              <img class="curso-carousel-image" src="assets/images/curso-extensao-lrf.png?v=50" alt="Curso de Extensão em Contabilidade Pública e Lei de Responsabilidade Fiscal">
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
              </div>
            </div>
          </article>
        </div>

        <div class="curso-carousel-dots" aria-hidden="true">
          <button class="curso-carousel-dot active" type="button"></button>
          <button class="curso-carousel-dot" type="button"></button>
        </div>

      </section>
    `;

    target.insertAdjacentElement('afterend', wrap);

    var track = wrap.querySelector('.curso-carousel-track');
    var dots = wrap.querySelectorAll('.curso-carousel-dot');
    var prev = wrap.querySelector('.curso-carousel-arrow.prev');
    var next = wrap.querySelector('.curso-carousel-arrow.next');

    var index = 0;
    var total = 2;
    var timer = null;

    function go(to){
      index = (to + total) % total;
      track.style.transform = 'translateX(' + (-100 * index) + '%)';
      dots.forEach(function(dot, i){
        dot.classList.toggle('active', i === index);
      });
    }

    function restart(){
      if(timer) clearInterval(timer);
      timer = setInterval(function(){
        go(index + 1);
      }, 6500);
    }

    prev.onclick = function(e){
      e.preventDefault();
      e.stopPropagation();
      go(index - 1);
      restart();
    };

    next.onclick = function(e){
      e.preventDefault();
      e.stopPropagation();
      go(index + 1);
      restart();
    };

    dots.forEach(function(dot, i){
      dot.onclick = function(){
        go(i);
        restart();
      };
    });

    restart();
  }

  document.addEventListener('DOMContentLoaded', function(){
    addStyles();
    insertCarousel();
  });
})();