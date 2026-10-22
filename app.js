(()=>{"use strict";
const B="https://files.supersite.aruba.it/media/22288_",LOCAL="";
// Fonte dati unica per le foto della galleria (hash = file originali sul sito attuale).
const PHOTOS=["cf6d49b99fc28765c74f907da43870f1a3aba86e","f7ac95bf76c67369099a0bae1ac323c821669813","50f67159fca249c4de4b2ca86f4a366a9f4ee39b","6ffa86b64ec91834ad65c0d17dca82fbbc7d3102","83e9a06c9c570b5b75c6aed25b911eccaeb98b2c","8e2b722178ab851efea8ea8dde8a70cf6e33e58e","0280f70a91276b8a97f5d53699d3ce938fbc36b9","bd149a32aa674310bfd39754521e03364182f03f","110c36608a7d62e2be66a98ce0d326ac1beb3033","bee71759a7789b9bcf55560fc4b172ee28e86da3","fa57415b77775af06a030f63e2b4da703e8f582a","ef7e7e3075fdf9b80f605476314d61c0c8e3f117","3572e3813fcbd145636f44e467414acb58da0b6b","54502cbde0f45415941d12f346a70bb5ca7bdedd"];
// Prima prova il file locale (assets/img/<hash>.jpg); se manca, usa l'originale remoto.
const src=(h,w)=>({local:LOCAL+h+".jpg",remote:`${B}${h}.jpeg/v1/w_${w},h_0/foto.jpeg`});
const fall=(img,h,w)=>{const s=src(h,w);img.src=s.local;img.onerror=()=>{img.onerror=null;img.src=s.remote}};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

const hi=$(".hero-img");if(hi){const s=src(hi.dataset.img,1600),t=new Image();t.onload=()=>hi.style.backgroundImage=`url(${t.src})`;t.onerror=()=>{t.onerror=null;t.src=s.remote};t.src=s.local}

const g=$("#grid"),lb=$("#lb"),lbi=lb.querySelector("img");
PHOTOS.forEach((h,i)=>{const b=document.createElement("button"),im=new Image();b.type="button";b.setAttribute("aria-label","Ingrandisci foto "+(i+1)+" di "+PHOTOS.length);b.dataset.r="";
 im.alt="Lavorazione su metallo, foto "+(i+1);im.loading="lazy";im.width=300;im.height=i%3?260:360;fall(im,h,700);b.append(im);
 b.onclick=()=>{lbi.alt=im.alt;fall(lbi,h,1400);lb.showModal()};g.append(b)});
lb.addEventListener("click",e=>{if(e.target===lb||e.target.classList.contains("x"))lb.close()});

const burger=$(".burger"),nav=$("#nav"),top=$(".top");
const tog=o=>{nav.classList.toggle("open",o);burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Chiudi il menu":"Apri il menu")};
burger.onclick=()=>tog(!nav.classList.contains("open"));
nav.addEventListener("click",e=>{if(e.target.tagName==="A")tog(false)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){tog(false);burger.focus()}});
addEventListener("scroll",()=>top.classList.toggle("on",scrollY>40),{passive:true});

if("IntersectionObserver"in window){
 const names=["Nastratura","Levigatura","Spazzolatura & satinatura","Lucidatura"],surf=$("#surface");
 const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const n=+e.target.dataset.step;$$(".step").forEach(s=>s.classList.toggle("on",s===e.target));surf.dataset.step=n;$("#capn").textContent="0"+(n+1);$("#capt").textContent=names[n]}}),{rootMargin:"-45% 0px -45% 0px"});
 $$(".step").forEach(s=>so.observe(s));
 const r=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");r.unobserve(e.target)}}),{threshold:.1});$$("[data-r]").forEach(x=>r.observe(x));
}else{$$("[data-r]").forEach(x=>x.classList.add("in"));$$(".step").forEach(s=>s.classList.add("on"))}

$("#f").addEventListener("submit",e=>{e.preventDefault();const f=e.target,m=$("#msg");let ok=true;
 [...f.elements].forEach(x=>{if(x.name){const bad=!x.value.trim();x.setAttribute("aria-invalid",bad);if(bad)ok=false}});
 if(!ok){m.textContent="Compila tutti i campi.";return}
 m.textContent="Apro il tuo programma di posta…";
 location.href="mailto:info@pulimetalsrl.it?subject="+encodeURIComponent("Richiesta di informazioni dal sito")+"&body="+encodeURIComponent(`Nome/azienda: ${f.n.value}\nContatto: ${f.c.value}\n\n${f.m.value}`)});
})();
