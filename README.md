# Pulimetal – sito statico (versione senza cartelle)
Tutti i file stanno nella stessa cartella: carica TUTTO su GitHub (Add file → Upload files, max 100 file per volta; qui sono circa 55).
Pubblicazione: Settings → Pages → Deploy from a branch → main / root.

## Da configurare / confermare
- Modulo preventivo: in `app.js` (CONFIG) l'endpoint usa FormSubmit verso info@pulimetalsrl.it. Al PRIMO invio arriva una mail di attivazione a quella casella: va confermata, poi le richieste arrivano da un mittente noreply. Se lo staff usa un'altra casella, cambia l'indirizzo in CONFIG.
- Recensioni: `REVIEWS` in `app.js` è vuoto, quindi la sezione è nascosta. Inserire solo recensioni reali (nome, testo, stelle, fonte).
- Footer: copiato dal sito attuale, tranne il capitale sociale ("€10.00,00" è scritto in modo errato sul sito): da confermare col cliente. I link social del sito attuale non hanno un indirizzo riconoscibile e non sono stati inclusi.
- Font: Space Grotesk e DM Sans da Google Fonts (richiesta a terze parti: valutare menzione nella privacy o font locali).
- Rimossi i dati non verificati presenti nei siti di esempio (anni di esperienza, progetti completati, clienti, "dal 2017").
