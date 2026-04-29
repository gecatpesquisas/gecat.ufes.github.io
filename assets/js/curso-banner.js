
(function(){
  function addStyles(){
    if(document.getElementById('curso-extensao-carousel-style')) return;
    var style=document.createElement('style');
    style.id='curso-extensao-carousel-style';
    style.textContent = `
      .curso-carousel-wrap{margin:34px auto 0;}
      .curso-carousel{position:relative;overflow:hidden;border-radius:24px;box-shadow:0 22px 50px rgba(16,33,59,.14);background:#fff;border:1px solid rgba(220,229,228,.9);}
      .curso-carousel-track{display:flex;transition:transform .55s ease;}
      .curso-carousel-slide{min-width:100%;}
      .curso-carousel-image-link{display:block;background:#f7fbfb;}
      .curso-carousel-image{display:block;width:100%;height:auto;}
      .curso-carousel-info{background:linear-gradient(135deg,#0b5c5c,#13807a);color:#fff;padding:30px;min-height:230px;display:grid;grid-template-columns:1fr auto;gap:22px;align-items:center;}
      .curso-carousel-info .kicker{font-weight:900;text-transform:uppercase;letter-spacing:.16em;color:#d9f99d;font-size:.78rem;margin-bottom:8px;}
      .curso-carousel-info h2{margin:0 0 10px;color:#fff;font-family:"Source Serif 4",Georgia,serif;font-size:clamp(1.5rem,3vw,2.7rem);line-height:1.05;}
      .curso-carousel-info p{margin:0;max-width:800px;color:#eefdfb;line-height:1.6;}
      .curso-carousel-tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;}
      .curso-carousel-tags span{border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:7px 10px;font-weight:800;font-size:.83rem;}
      .curso-carousel-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;}
      .curso-carousel-actions a,.curso-carousel-actions button{border:0;border-radius:999px;padding:12px 16px;font-weight:900;cursor:pointer;text-decoration:none;font-family:inherit;}
      .curso-carousel-actions a{background:#fff;color:#0b5c5c;}
      .curso-carousel-actions button{background:rgba(255,255,255,.15);color:#fff;}
      .curso-carousel-dots{position:absolute;left:0;right:0;bottom:14px;display:flex;justify-content:center;gap:8px;pointer-events:none;}
      .curso-carousel-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.65);border:1px solid rgba(16,33,59,.18);}
      .curso-carousel-dot.active{background:#0b5c5c;}
      
      /* SETAS */
      .curso-carousel-arrow{
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        width:44px;
        height:44px;
        border-radius:50%;
        border:none;
        background:rgba(11,92,92,.85);
        color:#fff;
        font-size:22px;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content:center;
        z-index:5;
      }
      .curso-carousel-arrow:hover{background:#0b5c5c;}
      .curso-carousel-arrow.left{left:12px;}
      .curso-carousel-arrow.right{right:12px;}

      @media(max-width:780px){
        .curso-carousel-info{grid-template-columns:1fr;padding:24px;}
        .curso-carousel-actions{justify-content:flex-start;}
      }
    `;
    document.head.appendChild(style);
  }

  function insertCarousel(){
    if(document.querySelector('.curso-carousel')) return;

    var target = document.querySelector('.hero') || document.querySelector('header');
    if(!target) return;

    var wrap=document.createElement('div');
    wrap.className='wrap curso-carousel-wrap';
    wrap.innerHTML = `
      <section class="curso-carousel">
        <button class="curso-carousel-arrow left">&#10094;</button>
        <button class="curso-carousel-arrow right">&#10095;</button>

        <div class="curso-carousel-track">
          <article class="curso-carousel-slide">
            <a class="curso-carousel-image-link" href="curso-extensao.html">
              <img class="curso-carousel-image" src="assets/images/curso-extensao-lrf.png?v=3" alt="Curso de Extensão LRF">
            </a>
          </article>

          <article class="curso-carousel-slide">
            <div class="curso-carousel-info">
              <div>
                <div class="kicker">Curso de extensão · inscrições em breve</div>
                <h2>Contabilidade Pública e Lei de Responsabilidade Fiscal (LRF)</h2>
                <p>Curso gratuito, semipresencial, com certificado de extensão emitido pela UFES.</p>
                <div class="curso-carousel-tags">
                  <span>UFES / UnAC</span>
                  <span>12 meses</span>
                  <span>15h mensais</span>
                </div>
              </div>
              <div class="curso-carousel-actions">
                <a href="curso-extensao.html">Saiba mais</a>
              </div>
            </div>
          </article>
        </div>

        <div class="curso-carousel-dots">
          <span class="curso-carousel-dot active"></span>
          <span class="curso-carousel-dot"></span>
        </div>
      </section>
    `;

    target.insertAdjacentElement('afterend', wrap);

    var track=wrap.querySelector('.curso-carousel-track');
    var dots=wrap.querySelectorAll('.curso-carousel-dot');
    var prev=wrap.querySelector('.left');
    var next=wrap.querySelector('.right');

    var index=0;

    function go(i){
      index=i;
      if(index<0) index=1;
      if(index>1) index=0;
      track.style.transform='translateX(' + (-100*index) + '%)';
      dots.forEach(function(d,j){d.classList.toggle('active',j===index)});
    }

    next.onclick=function(){go(index+1)};
    prev.onclick=function(){go(index-1)};

    var timer=setInterval(function(){go(index+1)},6500);

    wrap.addEventListener('mouseenter',function(){clearInterval(timer)});
    wrap.addEventListener('mouseleave',function(){
      timer=setInterval(function(){go(index+1)},6500)
    });
  }

  document.addEventListener('DOMContentLoaded',function(){
    addStyles();
    insertCarousel();
  });
})();
