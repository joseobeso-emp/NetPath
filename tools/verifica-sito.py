#!/usr/bin/env python3
"""
NetPath — controllo di integrità del sito.
Uso:  python3 tools/verifica-sito.py
Controlla: JSON dei quiz, lezioni dichiarate pronte ma mancanti,
link interni rotti, tag sbilanciati, risposte corrette per domanda.
"""
import os, re, json, sys, glob
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
err, warn, ok = [], [], []

pages = sorted(glob.glob("*.html") + glob.glob("lezioni/*.html"))

# --- 1. quiz -----------------------------------------------------------------
nq = nquiz = 0
for p in pages:
    s = open(p, encoding="utf-8").read()
    for i, block in enumerate(re.findall(r'<script type="application/json" data-quiz>(.*?)</script>', s, re.S)):
        nquiz += 1
        try:
            d = json.loads(block)
        except json.JSONDecodeError as e:
            err.append(f"{p}: quiz #{i+1} JSON non valido — {e}")
            continue
        for j, q in enumerate(d.get("questions", [])):
            nq += 1
            n_ok = sum(1 for a in q["a"] if a.get("ok"))
            if n_ok != 1:
                err.append(f"{p}: domanda {j+1} ha {n_ok} risposte corrette (deve essere 1)")
            if len(q["a"]) < 3:
                warn.append(f"{p}: domanda {j+1} ha solo {len(q['a'])} opzioni")
            if not q.get("e"):
                warn.append(f"{p}: domanda {j+1} non ha spiegazione")
ok.append(f"{nquiz} quiz, {nq} domande — JSON valido, 1 sola risposta corretta ciascuna")

# --- 2. lezioni dichiarate pronte --------------------------------------------
cur = open("assets/js/curriculum.js", encoding="utf-8").read()
entries = re.findall(r'\{ id:"(l\d-\d\d)", t:"(.*?)".*?ready:(true|false) \}', cur)
missing, extra = [], []
declared = {}
for lid, title, ready in entries:
    declared[lid] = (ready == "true")
    f = f"lezioni/{lid}.html"
    if ready == "true" and not os.path.exists(f):
        missing.append(lid)
for f in glob.glob("lezioni/*.html"):
    lid = os.path.basename(f)[:-5]
    if lid not in declared:
        extra.append(lid)
    elif not declared[lid]:
        warn.append(f"{lid}.html esiste ma in curriculum.js è ready:false — non sarà raggiungibile")
if missing:
    err.append(f"dichiarate pronte ma il file manca ({len(missing)}): {', '.join(missing)}")
if extra:
    warn.append(f"file presenti ma non in curriculum.js: {', '.join(extra)}")
ok.append(f"{len(declared)} lezioni in mappa, {len(glob.glob('lezioni/*.html'))} pagine scritte")

# --- 3. link interni ---------------------------------------------------------
broken = set()
for p in pages:
    base = os.path.dirname(p)
    s = open(p, encoding="utf-8").read()
    for href in re.findall(r'href="([^"#?][^"]*?\.html)(?:#[^"]*)?"', s):
        if "'" in href or "+" in href or "${" in href:
            continue          # stringa costruita da JavaScript, non un link statico
        target = os.path.normpath(os.path.join(base, href))
        if not os.path.exists(target):
            broken.add(f"{p} → {href}")
    for src in re.findall(r'(?:src|href)="((?:\.\./)?assets/[^"]+)"', s):
        target = os.path.normpath(os.path.join(base, src))
        if not os.path.exists(target):
            broken.add(f"{p} → {src}")
if broken:
    for b in sorted(broken): err.append("link rotto: " + b)
else:
    ok.append("tutti i link interni e gli asset risolvono")

# --- 4. impalcatura obbligatoria ---------------------------------------------
for p in pages:
    s = open(p, encoding="utf-8").read()
    for need, what in [('id="np-header"', "header"), ('id="np-footer"', "footer"),
                       ('assets/js/app.js', "app.js"), ('data-root=', "data-root"),
                       ('name="viewport"', "viewport"), ('netpath:theme', "anti-lampeggio tema")]:
        if need not in s:
            err.append(f"{p}: manca {what}")
    if "lezioni/" in p:
        for need, what in [('id="np-sidebar"', "barra laterale"), ('id="np-toc"', "indice"),
                           ('id="np-lesson-foot"', "piè di lezione"), ('data-lesson=', "data-lesson")]:
            if need not in s:
                err.append(f"{p}: manca {what}")
ok.append(f"{len(pages)} pagine con impalcatura completa")

# --- 5. tag bilanciati (approssimato, sui contenitori principali) -------------
for p in pages:
    s = open(p, encoding="utf-8").read()
    s = re.sub(r'<script.*?</script>', '', s, flags=re.S)
    for tag in ("div", "figure", "table", "section", "article", "details", "svg"):
        o = len(re.findall(rf'<{tag}[\s>]', s))
        c = len(re.findall(rf'</{tag}>', s))
        if o != c:
            err.append(f"{p}: <{tag}> aperti {o}, chiusi {c}")
if not any("aperti" in e for e in err):
    ok.append("tag dei contenitori bilanciati in tutte le pagine")

# --- 6. glossario ------------------------------------------------------------
g = open("assets/js/glossario-data.js", encoding="utf-8").read()
gids = re.findall(r'\{id:"([a-z0-9-]+)"', g)
dup = [i for i, c in Counter(gids).items() if c > 1]
if dup: err.append(f"glossario: id duplicati {dup}")
used = set()
for p in pages:
    used |= set(re.findall(r'data-term="([a-z0-9-]+)"', open(p, encoding="utf-8").read()))
unknown = used - set(gids)
if unknown: err.append(f"data-term che non esistono nel glossario: {sorted(unknown)}")
ok.append(f"glossario: {len(gids)} termini, {len(used)} richiamati nelle lezioni")

# --- 7. leggibilita su telefono -----------------------------------------------
# Un elemento piu largo dello schermo fa scorrere in orizzontale tutta la pagina
# e il testo finisce incollato al bordo. Le tabelle e i diagrammi larghi devono
# quindi stare dentro un contenitore che scorre per conto proprio.
nudi_tab, nudi_svg = [], []
for p in pages:
    s_ = open(p, encoding="utf-8").read()
    if "<table" in re.sub(r'<div class="table-wrap"[^>]*>.*?</table>\s*</div>', "", s_, flags=re.S):
        nudi_tab.append(p)
    if re.search(r'<figure class="diagram">\s*<svg',
                 re.sub(r'<div class="scroll-x"[^>]*>.*?</svg>\s*</div>', "", s_, flags=re.S)):
        nudi_svg.append(p)
if nudi_tab: err.append(f"tabelle fuori da .table-wrap (sfondano su telefono): {nudi_tab}")
if nudi_svg: err.append(f"diagrammi fuori da .scroll-x (sfondano su telefono): {nudi_svg}")
if not nudi_tab and not nudi_svg:
    ok.append("telefono: tutte le tabelle e i diagrammi sono incapsulati")

css = open("assets/css/style.css", encoding="utf-8").read()
mancanti = [t for t in ("--gutter", "--safe-l", "safe-area-inset-left") if t not in css]
if mancanti: err.append(f"CSS: manca la gestione del margine laterale {mancanti}")
else: ok.append("telefono: margine laterale e safe-area configurati")

# --- esito -------------------------------------------------------------------
print("\n" + "=" * 66)
for o in ok:   print("  OK    " + o)
for w in warn: print("  NOTA  " + w)
for e in err:  print("  ERR   " + e)
print("=" * 66)
print(f"  {len(ok)} controlli superati · {len(warn)} note · {len(err)} errori\n")
sys.exit(1 if err else 0)
