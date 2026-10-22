# Pulimetal – sito statico
Entry point: `index.html`. Nessuna build. Percorsi relativi: funziona su GitHub Pages anche con prefisso repo.
## Pubblicazione
1. Crea un repository su GitHub e carica TUTTO il contenuto di questa cartella (incluso `.nojekyll`).
2. Settings → Pages → Source: "Deploy from a branch" → `main` / root → Save.
3. Il sito sarà su `https://<utente>.github.io/<repo>/`.
## Foto (da fare)
Il download delle foto originali non è stato possibile nell'ambiente di sviluppo. Il sito le carica dall'URL originale come ripiego.
Per renderlo indipendente: scarica le 14 foto della galleria di pulimetalsrl.it/gallery e salvale in `assets/img/<hash>.jpg` (hash = elenco PHOTOS in `assets/app.js`; il file locale ha la precedenza).
Le immagini "gemini_generated_*" del sito attuale sono generate con IA e NON sono state usate.
## Da fare prima del lancio
- Sostituire i canonical/sitemap se il dominio cambia; aggiungere redirect lato hosting (GitHub Pages non li gestisce).
- Pagina privacy: resta il link a pulimetalsrl.it/privacy (testo legale da validare).
- Form: apre `mailto:`; per un invio reale serve un servizio esterno.
