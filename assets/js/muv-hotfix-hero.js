(()=>{ 
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  /* 1) Calcola altezza header reale e impostala come variabile per il padding dell'hero */
  const header = $('.site-header') || $('header[role="banner"]') || $('header') || $('.navbar') || $('.nav');
  if(header){
    const hh = Math.max(56, Math.round(header.getBoundingClientRect().height||64));
    document.documentElement.style.setProperty('--muv-header-h', hh+'px');
  }
  /* 2) Marca come "has-media" gli hero con bg image/video per garantire overlay (fallback se CSS non vede bg) */
  $$('.hero, .section-hero').forEach(h=>{
    const bg = getComputedStyle(h).backgroundImage;
    if(bg && bg!=='none') h.classList.add('has-media');
    if($('img,video,picture',h)) h.classList.add('has-media');
  });
  /* 3) Dedup H1: se due H1 hanno lo stesso testo, nascondi il duplicato (quello dopo) */
  $$('.hero, .section-hero').forEach(h=>{
    const hs = $$('h1',h);
    if(hs.length>1){
      const t0 = hs[0].innerText.replace(/\s+/g,' ').trim().toLowerCase();
      for(let i=1;i<hs.length;i++){
        const ti = hs[i].innerText.replace(/\s+/g,' ').trim().toLowerCase();
        if(ti===t0){ hs[i].style.display='none'; hs[i].setAttribute('data-dup-hidden',''); }
      }
    }
  });
  /* 4) Anti-collisione: se h1/h2 tocca il header, aumenta padding-top dell'hero */
  const bumpIfCollide = (h)=>{
    const hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--muv-header-h'))||64;
    const t = $('h1',h) || $('h2',h) || $('p',h);
    if(!t) return;
    const tr = t.getBoundingClientRect(); const hr = header? header.getBoundingClientRect():{bottom:0, top:0, height:0};
    if(tr.top < hr.bottom + 8){ h.style.paddingTop = `calc(${hh}px + env(safe-area-inset-top,0px) + 16px)`; }
  };
  $$('.hero, .section-hero').forEach(bumpIfCollide);
})();