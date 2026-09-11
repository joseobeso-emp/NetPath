#!/usr/bin/env python3
"""
NetPath — sincronizza curriculum.js con le lezioni realmente scritte.

Mette ready:true SOLO alle lezioni il cui file esiste in lezioni/.
Le altre restano visibili nel percorso con l'etichetta "presto",
ma non cliccabili: così il sito pubblicato non ha mai un link rotto.

Uso:  python3 tools/sincronizza-stato.py
Va lanciato dopo ogni aggiunta di lezioni, prima di caricare su GitHub.
"""
import os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

src = open("assets/js/curriculum.js", encoding="utf-8").read()
esistenti = {f[:-5] for f in os.listdir("lezioni") if f.endswith(".html")}

cambi = []
def fix(m):
    lid, resto, stato = m.group(1), m.group(2), m.group(3)
    giusto = "true" if lid in esistenti else "false"
    if stato != giusto:
        cambi.append((lid, stato, giusto))
    return f'{{ id:"{lid}"{resto}ready:{giusto} }}'

nuovo = re.sub(r'\{ id:"(l\d-\d\d)"(.*?)ready:(true|false) \}', fix, src, flags=re.S)
open("assets/js/curriculum.js", "w", encoding="utf-8").write(nuovo)

pronte = len(re.findall(r'id:"l\d-\d\d".*?ready:true', nuovo, re.S))
totale = len(re.findall(r'id:"l\d-\d\d"', nuovo))
if cambi:
    for lid, vecchio, nuovo_s in cambi:
        print(f"  {lid}: ready {vecchio} → {nuovo_s}")
else:
    print("  Nessun cambiamento necessario.")
print(f"\n  Lezioni pubblicate: {pronte}/{totale}")
