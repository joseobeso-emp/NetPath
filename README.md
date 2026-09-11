# NetPath — Da zero a senior nel networking

Percorso di studio personale del networking: 4 livelli, 24 capitoli, 90 lezioni,
laboratori pratici su MikroTik, glossario, calcolatori e verifiche periodiche.

Sito statico puro: **nessuna dipendenza, nessun build, nessun server**.
Si apre anche facendo doppio clic su `index.html`.

---

## Metterlo online su GitHub Pages

1. Su GitHub crea un repository nuovo, per esempio `netpath` (può essere pubblico o privato:
   con un account gratuito, Pages funziona solo sui repository **pubblici**).
**Il sito è già pubblicato:** https://joseobeso-emp.github.io/NetPath/

Repository: https://github.com/joseobeso-emp/NetPath — ramo `main`, cartella `/ (root)`.

Il file `.nojekyll` (già presente, vuoto) serve a dire a GitHub di pubblicare i file
così come sono, senza passare da Jekyll. **Non cancellarlo.**

### Aggiornarlo

Un comando solo, che rigenera le lezioni, sincronizza lo stato, verifica l'integrità e pubblica:

```bash
./tools/pubblica.sh "Aggiunto capitolo 2.1"
```

Se qualche controllo fallisce si ferma **prima** di pubblicare, così online non finisce mai
una versione rotta. GitHub Pages si aggiorna da solo entro un paio di minuti.

---

## Com'è fatto

```
netpath/
├── index.html            cruscotto: progressi e ripresa da dove eri
├── percorso.html         tutte le 90 lezioni con lo stato di avanzamento
├── piano.html            piano di studio, tempi realistici, metodo
├── lab.html              laboratori pratici sul MikroTik hAP ax²
├── strumenti.html        calcolatore subnet, palestra di subnetting, porte
├── glossario.html        dizionario dei termini, cercabile
├── verifiche.html        test periodici
├── lezioni/              una pagina per lezione (l1-01.html, l1-02.html…)
├── contenuti/            il testo sorgente delle lezioni (.txt)
├── tools/                script di servizio (vedi sotto)
├── assets/
│   ├── css/style.css     design system completo, temi chiaro e scuro
│   └── js/
│       ├── curriculum.js mappa dei livelli, capitoli e lezioni
│       ├── glossario-data.js  i termini del glossario
│       └── app.js        motore: navigazione, quiz, progressi, ricerca
└── .nojekyll
```

I progressi (lezioni completate, punteggi dei quiz, checklist dei laboratori) sono salvati
**solo nel tuo browser**, in `localStorage`. Nessun account, nessun server, nessun dato che esce.
Conseguenza pratica: i progressi sul telefono e quelli sul PC sono separati, e si azzerano
se cancelli i dati del sito.

---

## Aggiungere una lezione

Le pagine delle lezioni **non si scrivono a mano**: si scrive solo il contenuto e uno script
ci costruisce intorno l'impalcatura (intestazione, barra laterale, indice, piè di pagina),
identica per tutte.

1. Crea `contenuti/l1-09.txt`:

   ```
   #id: l1-09
   #title: Titolo della lezione
   #min: 20
   #level: 1
   #chapter: Nome del capitolo
   #desc: Descrizione breve per i motori di ricerca
   #obj: Primo obiettivo
   #obj: Secondo obiettivo
   ---
   <p class="lead">Introduzione…</p>
   <h2>Prima sezione</h2>
   …
   ```

2. Genera la pagina, aggiorna lo stato, verifica:

   ```bash
   python3 tools/build-lezione.py contenuti/l1-09.txt
   python3 tools/sincronizza-stato.py
   python3 tools/verifica-sito.py
   ```

3. Carica su GitHub.

### Gli script

| Script | Cosa fa |
|---|---|
| `tools/build-lezione.py` | Genera le pagine delle lezioni dal contenuto. Senza argomenti le rigenera tutte. |
| `tools/sincronizza-stato.py` | Mette `ready:true` solo alle lezioni realmente scritte, così **non ci sono mai link rotti** sul sito pubblicato. Le altre restano visibili con l'etichetta «presto». |
| `tools/verifica-sito.py` | Controlla JSON dei quiz, link interni, impalcatura delle pagine, tag sbilanciati, termini del glossario. Da lanciare **sempre prima di caricare**. |

---

## Elementi che puoi usare scrivendo una lezione

```html
<!-- Riquadri -->
<div class="callout feynman">…</div>   spiegazione «da dodicenne»
<div class="callout real">…</div>      dove lo vedi nel lavoro
<div class="callout tip">…</div>       consiglio pratico
<div class="callout warn">…</div>      attenzione
<div class="callout danger">…</div>    pericolo
<div class="callout lab">…</div>       esercizio da fare

<!-- Termine del glossario con spiegazione al passaggio del mouse -->
<span class="term" data-term="mac-address">MAC address</span>

<!-- Blocco di comandi -->
<div class="code"><div class="code__bar"><span class="dot"></span>Titolo</div>
<pre>…</pre></div>

<!-- Diagramma -->
<figure class="diagram"><div class="scroll-x"><svg viewBox="0 0 660 240">…</svg></div>
<figcaption>…</figcaption></figure>

<!-- Tabella -->
<div class="table-wrap"><table>…</table></div>
```

Nei diagrammi usa **sempre** le variabili di colore (`var(--dg-1)`, `var(--dg-text)`, …)
e le classi di testo (`dg-title`, `dg-label`, `dg-mono-sm`): così si adattano da soli
al tema chiaro e a quello scuro.

---

## I quiz

Si scrivono in fondo alla lezione come blocco JSON:

```html
<script type="application/json" data-quiz>
{
  "title": "Verifica",
  "questions": [
    { "q": "Domanda?",
      "a": [ {"t":"Risposta giusta","ok":true},
             {"t":"Risposta sbagliata","ok":false},
             {"t":"Altra sbagliata","ok":false} ],
      "e": "Spiegazione del perché, mostrata dopo la risposta." }
  ]
}
</script>
```

**La posizione della risposta corretta nel sorgente è irrilevante.** Il motore mescola le
opzioni a ogni caricamento estraendo la posizione da un «sacchetto» che contiene ogni
posizione una volta sola, e impedisce che la stessa posizione si ripeta in due domande
consecutive. Verificato su 20.000 simulazioni: 25,0% per ciascuna posizione su quattro
opzioni, nessuna ripetizione consecutiva.

---

## Scorciatoie da tastiera

| Tasto | Cosa fa |
|---|---|
| `⌘K` / `Ctrl+K` oppure `/` | Ricerca fra lezioni, termini e pagine |
| `Esc` | Chiude ricerca e menu laterale |

---

## Compatibilità

Funziona su qualsiasi browser moderno, da desktop e da telefono.
Tema chiaro e scuro: segue l'impostazione del sistema operativo e si può forzare
con l'interruttore in alto a destra.
