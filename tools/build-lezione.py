#!/usr/bin/env python3
"""
NetPath — generatore di pagine-lezione.

Uso:   python3 tools/build-lezione.py contenuti/l1-01.txt
       python3 tools/build-lezione.py contenuti/*.txt

Ogni file in contenuti/ inizia con alcune righe di intestazione, poi '---',
poi il corpo della lezione in HTML. Il generatore ci costruisce intorno
l'impalcatura completa (header, barra laterale, indice, piè di pagina).

Intestazione riconosciuta:
  #id:       l1-01                (obbligatorio, deve esistere in curriculum.js)
  #title:    Titolo della lezione (obbligatorio)
  #min:      18                   (minuti di lettura)
  #level:    1                    (1-4, oppure la sigla di un modulo: mt)
  #lvname:   Modulo MikroTik      (etichetta mostrata; default 'Livello N')
  #chapter:  Nome del capitolo
  #desc:     Descrizione per i motori di ricerca
  #obj:      Un obiettivo          (ripetibile: una riga per obiettivo)
"""
import sys, os, re, glob

HEAD = '''<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title} — NetPath</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#0f7d8c" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0d1016" media="(prefers-color-scheme: dark)">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%230f7d8c'/><g fill='none' stroke='%23fff' stroke-width='7' stroke-linecap='round'><circle cx='50' cy='26' r='9'/><circle cx='24' cy='74' r='9'/><circle cx='76' cy='74' r='9'/><path d='M50 35v16M43 58L31 67M57 58l12 9'/></g></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
<script>(function(){{try{{var t=localStorage.getItem("netpath:theme");if(t)document.documentElement.setAttribute("data-theme",t);}}catch(e){{}}}})();</script>
</head>
<body data-page="lezione" data-root="../" data-lesson="{lid}">

<div class="read-progress" id="np-progress"></div>
<header id="np-header"></header>
<div class="scrim" id="np-scrim"></div>

<div class="layout">
  <aside class="sidebar" id="np-sidebar"></aside>

  <main class="content">
    <div class="lesson-top">
      <nav class="crumbs">
        <a href="../index.html">Home</a><span class="sep">/</span>
        <a href="../percorso.html#{lvanchor}">{lvname}</a><span class="sep">/</span>
        <span>{chapter}</span>
      </nav>
      <h1 class="lesson-title">{title}</h1>
      <div class="lesson-meta">
        <span class="badge lv{lvl}">{lvname}</span>
        <span class="chip">Lezione {num}</span>
        <span class="chip">{minutes} min di lettura</span>
      </div>
    </div>

    <div class="objectives">
      <h2>Alla fine di questa lezione saprai</h2>
      <ul>
{objectives}
      </ul>
    </div>

    <article class="prose">
{body}
    </article>

    <div id="np-lesson-foot"></div>
  </main>

  <aside class="toc-rail" id="np-toc"></aside>
</div>

<footer id="np-footer"></footer>

<script src="../assets/js/curriculum.js"></script>
<script src="../assets/js/glossario-data.js"></script>
<script src="../assets/js/app.js"></script>
</body>
</html>
'''

def build(path):
    raw = open(path, encoding="utf-8").read()
    if "\n---\n" not in raw:
        raise SystemExit(f"{path}: manca la riga '---' che separa intestazione e corpo")
    head, body = raw.split("\n---\n", 1)

    meta, objs = {}, []
    for line in head.splitlines():
        line = line.strip()
        if not line or not line.startswith("#"):
            continue
        k, _, v = line[1:].partition(":")
        k, v = k.strip().lower(), v.strip()
        if k == "obj":
            objs.append(v)
        else:
            meta[k] = v

    for req in ("id", "title"):
        if req not in meta:
            raise SystemExit(f"{path}: manca #{req}:")

    lid = meta["id"]
    lvl = meta.get("level") or lid[1]
    # I moduli dedicati a un produttore usano una sigla al posto del numero:
    # "mt" produce ancora "#mt" ed etichetta "Modulo MikroTik".
    # I livelli da 1 a 4 continuano a comportarsi come prima.
    lvanchor = ("l" + lvl) if lvl.isdigit() else lvl
    lvname = meta.get("lvname") or ("Livello " + lvl)
    num = lid.split("-")[1]
    out = HEAD.format(
        lid=lid, lvl=lvl, num=num, lvanchor=lvanchor, lvname=lvname,
        title=meta["title"],
        desc=meta.get("desc", meta["title"]).replace('"', "&quot;"),
        chapter=meta.get("chapter", ""),
        minutes=meta.get("min", "20"),
        objectives="\n".join(f"        <li>{o}</li>" for o in objs),
        body=body.rstrip() + "\n",
    )
    dest = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(path))), "lezioni", lid + ".html")
    open(dest, "w", encoding="utf-8").write(out)
    return dest, len(objs), len(body)

if __name__ == "__main__":
    args = sys.argv[1:]
    if not args:
        args = sorted(glob.glob("contenuti/*.txt"))
    for a in args:
        for p in sorted(glob.glob(a)):
            d, n, b = build(p)
            print(f"  ✓ {os.path.basename(d):<16} {n} obiettivi, {b:>6} caratteri di corpo")
