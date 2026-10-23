(()=>{"use strict";
/* ===== CONFIGURAZIONE (un solo punto da modificare) ===== */
const CONFIG={
  // Servizio che invia la richiesta da un indirizzo "noreply" alla casella dello staff.
  // Al primo invio FormSubmit manda una mail di attivazione alla casella indicata: va confermata.
  formEndpoint:"https://formsubmit.co/ajax/info@pulimetalsrl.it",
  fallbackMail:"info@pulimetalsrl.it"
};
/* Recensioni: inserire SOLO recensioni reali. Se l'elenco è vuoto la sezione resta nascosta.
   Esempio: {nome:"Mario Rossi, Azienda Srl", testo:"...", stelle:5, fonte:"Google"} */
const REVIEWS=[];
/* Domande "per curiosità": risposte basate solo su informazioni presenti sul sito di Pulimetal. */
const FAQ=[
 ["Quali lavorazioni eseguite?","Nastratura, levigatura, spazzolatura, satinatura e lucidatura di superfici metalliche. Ogni lavorazione viene scelta in base al materiale, allo stato iniziale del pezzo e al risultato richiesto."],
 ["Quali materiali lavorate?","Principalmente ferro, alluminio, acciaio inox e ottone."],
 ["Che differenza c’è tra spazzolatura e satinatura?","La spazzolatura crea una trama più evidente e definita; la satinatura una superficie più fine, uniforme e discreta. La scelta segue le esigenze del cliente."],
 ["Per chi lavorate?","Per aziende e artigiani, in conto terzi: dalla singola lavorazione alla fornitura continuativa."],
 ["Dove siete e quali sono gli orari?","Via Filippo Meda 16, 20037 Paderno Dugnano (Milano). Siamo aperti dal lunedì al venerdì, 8:00–12:00 e 13:00–17:00."],
 ["Come richiedo un preventivo?","Compila il modulo nella sezione Contatti indicando materiale, quantità e finitura, oppure scrivi a info@pulimetalsrl.it o chiama il 02 2809 5247."]
];
const PHOTOS=[1,2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].map(n=>"p"+String(n).padStart(2,"0")+".jpg");
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

/* Galleria + lightbox con frecce */
const g=$("#grid"),lb=$("#lb"),lbi=lb.querySelector("img");let cur=0;
PHOTOS.forEach((f,i)=>{const b=document.createElement("button"),im=new Image();b.type="button";b.setAttribute("aria-label","Ingrandisci foto "+(i+1)+" di "+PHOTOS.length);
 im.src=f;im.alt="Pezzo metallico lavorato Pulimetal, foto "+(i+1);im.loading="lazy";im.decoding="async";b.append(im);b.onclick=()=>show(i,true);g.append(b)});
function show(i,open){cur=(i+PHOTOS.length)%PHOTOS.length;lbi.src=PHOTOS[cur];lbi.alt="Pezzo metallico lavorato Pulimetal, foto "+(cur+1);if(open)lb.showModal()}
lb.addEventListener("click",e=>{if(e.target===lb||e.target.classList.contains("x"))lb.close();if(e.target.classList.contains("pv"))show(cur-1);if(e.target.classList.contains("nx"))show(cur+1)});
lb.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")show(cur-1);if(e.key==="ArrowRight")show(cur+1)});

/* Recensioni (solo se presenti) */
if(REVIEWS.length){$("#recensioni").hidden=false;$("#navrev").hidden=false;
 REVIEWS.forEach(r=>{const c=document.createElement("article");c.className="card";const n=Math.max(1,Math.min(5,r.stelle||5));
  const s=document.createElement("div");s.className="stars";s.setAttribute("role","img");s.setAttribute("aria-label",n+" stelle su 5");s.textContent="★".repeat(n)+"☆".repeat(5-n);
  const p=document.createElement("p");p.textContent=r.testo;const sm=document.createElement("small");sm.textContent=r.nome+(r.fonte?" · "+r.fonte:"");c.append(s,p,sm);$("#cards").append(c)})}

/* Domande */
const qs=$("#qs"),ans=$("#ans");
FAQ.forEach(([q,a])=>{const b=document.createElement("button");b.type="button";b.textContent=q;b.setAttribute("aria-pressed","false");
 b.onclick=()=>{$$("#qs button").forEach(x=>x.setAttribute("aria-pressed",x===b));ans.textContent=a};qs.append(b)});

/* Menu + header */
const burger=$(".burger"),nav=$("#nav"),top=$(".top");
const tog=o=>{nav.classList.toggle("open",o);burger.setAttribute("aria-expanded",o);burger.setAttribute("aria-label",o?"Chiudi il menu":"Apri il menu")};
burger.onclick=()=>tog(!nav.classList.contains("open"));
nav.addEventListener("click",e=>{if(e.target.tagName==="A")tog(false)});
addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){tog(false);burger.focus()}});
addEventListener("scroll",()=>top.classList.toggle("on",scrollY>40),{passive:true});

/* Scrollytelling lavorazioni */
if("IntersectionObserver"in window){
 const names=["Nastratura","Levigatura","Spazzolatura & satinatura","Lucidatura"],surf=$("#surface");
 const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const n=+e.target.dataset.step;$$(".step").forEach(s=>s.classList.toggle("on",s===e.target));surf.dataset.step=n;$("#capn").textContent="0"+(n+1);$("#capt").textContent=names[n]}}),{rootMargin:"-45% 0px -45% 0px"});
 $$(".step").forEach(s=>so.observe(s));
}else $$(".step").forEach(s=>s.classList.add("on"));

/* Modulo preventivo: conferma solo dopo invio riuscito */
$("#f").addEventListener("submit",async e=>{e.preventDefault();const f=e.target,m=$("#msg"),btn=f.querySelector("button");m.className="msg";let ok=true;
 f.querySelectorAll("[required]").forEach(x=>{const bad=x.type==="checkbox"?!x.checked:!x.value.trim()||(x.type==="email"&&!/^\S+@\S+\.\S+$/.test(x.value));x.setAttribute("aria-invalid",bad);if(bad)ok=false});
 if(!ok){m.textContent="Controlla i campi evidenziati.";m.classList.add("err");return}
 const d=new FormData(f);d.delete("privacy");d.append("_subject","Richiesta di preventivo dal sito Pulimetal");d.append("_template","table");d.append("_captcha","false");
 btn.disabled=true;m.textContent="Invio in corso…";
 try{const r=await fetch(CONFIG.formEndpoint,{method:"POST",body:d,headers:{Accept:"application/json"}});const j=await r.json().catch(()=>({}));
  if(r.ok&&(j.success===true||j.success==="true")){f.reset();m.textContent="Richiesta inviata. Lo staff di Pulimetal ti risponderà appena possibile."}
  else throw new Error("send")}
 catch(_){m.classList.add("err");m.innerHTML="Invio non riuscito. Scrivici a <a href=\"mailto:"+CONFIG.fallbackMail+"\">"+CONFIG.fallbackMail+"</a> o chiama il 02 2809 5247."}
 finally{btn.disabled=false}});
})();
