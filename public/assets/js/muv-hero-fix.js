(()=>{
  const $ = (sel,root=document)=>root.querySelector(sel);
  const $$ = (sel,root=document)=>Array.from(root.querySelectorAll(sel));

  // 0) Mobile only guard
  const isMobile = window.matchMedia('(max-width: 480px)').matches;
  if(!isMobile) return;

  // 1) Marca gli hero che hanno un’immagine/video di background per attivare l’overlay
  $$('.hero, .section-hero').forEach(h=>{
    const bg = getComputedStyle(h).backgroundImage;
    const hasMediaBg = bg && bg !== 'none';
    const hasTag = $('img, video, picture', h);
    if(hasMediaBg || hasTag) h.classList.add('has-media');
  });

  // 2) Deduplica H1: se due H1 vicini hanno lo stesso testo, nascondi il duplicato
  $$('.hero, .section-hero').forEach(h=>{
    const h1s = $$('h1', h);
    if(h1s.length>=2){
      const t0 = h1s[0].innerText.trim();
      for(let i=1;i<h1s.length;i++){
        if(h1s[i].innerText.trim()===t0){
          h1s[i].setAttribute('data-dup-hidden','');
          h1s[i].style.display='none';
        }
      }
    }
  });

  // 3) Anti-collisione con header/logo: se il bounding di H1 o H2 tocca l’header, aumenta padding-top dell’hero
  const header = $('.site-header');
  if(header){
    const hh = header.getBoundingClientRect().height || 64;
    document.documentElement.style.setProperty('--header-h', Math.round(hh)+'px');
    $$('.hero, .section-hero').forEach(h=>{
      const t = $('h1', h) || $('h2', h) || $('p', h);
      if(!t) return;
      const hr = h.getBoundingClientRect(), tr = t.getBoundingClientRect();
      if(tr.top < (hr.top + hh + 8)){ // collide
        h.style.paddingTop = `calc(${hh}px + env(safe-area-inset-top,0px) + 16px)`;
      }
    });
  }

  // 4) Verifica CTA visibile (non sovrapposta): se CTA è parzialmente coperta, aggiungi margine/altezza
  $$('.hero, .section-hero').forEach(h=>{
    const cta = $('.btn, .cta, [href*="wa.me"], [class*="whatsapp"]', h);
    if(!cta) return;
    const r = cta.getBoundingClientRect();
    if(r.height<44){ cta.style.minHeight='44px'; cta.style.display='inline-flex'; cta.style.alignItems='center'; }
  });

  // 5) Contrasto automatico: se il colore medio è scuro/chiaro, rinforza overlay
  try{
    const hero = $('.hero, .section-hero');
    if(hero){
      // Grezza euristica: se qualsiasi testo bianco ha luminosità bassa sullo sfondo, aumenta overlay
      const sample = document.createElement('canvas');
      const ctx = sample.getContext('2d');
      const bgImg = $('img, picture img, video', hero);
      if(bgImg && ctx){
        const w = sample.width = 32, h = sample.height = 32;
        ctx.drawImage(bgImg, 0, 0, w, h);
        const data = ctx.getImageData(0,0,w,h).data;
        let lum = 0; const n = w*h;
        for(let i=0;i<data.length;i+=4){
          const r=data[i], g=data[i+1], b=data[i+2];
          lum += 0.2126*r + 0.7152*g + 0.0722*b;
        }
        lum = lum/(n*255);
        if(lum>0.5){ // sfondo chiaro
          hero.classList.add('overlay-strong');
        }
      }
    }
  }catch(e){ /* noop */ }

  // 6) Migliora visibilità icone su header bianco
  try{
    if(header){
      $$('button, svg, a', header).forEach(el=>{
        (el as HTMLElement).style.color = '#111';
        (el as HTMLElement).style.fill = '#111';
      });
    }
  }catch(e){ /* noop */ }
})();
