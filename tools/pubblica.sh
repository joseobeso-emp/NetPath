#!/usr/bin/env bash
# NetPath — rigenera, verifica e pubblica su GitHub Pages.
# Uso:  ./tools/pubblica.sh "messaggio del commit"
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH="$HOME/.local/bin:$PATH"

MSG="${1:-Aggiornamento contenuti}"

echo "▸ Rigenero le pagine delle lezioni…"
python3 tools/build-lezione.py

echo "▸ Sincronizzo lo stato del percorso…"
python3 tools/sincronizza-stato.py

echo "▸ Verifico l'integrità del sito…"
if ! python3 tools/verifica-sito.py; then
  echo
  echo "✗ VERIFICA FALLITA — non pubblico niente. Correggi gli errori qui sopra."
  exit 1
fi

if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo "▸ Nessuna modifica da pubblicare."
  exit 0
fi

echo "▸ Pubblico…"
git add -A
git commit -q -m "$MSG"
git push -q origin main
echo
echo "✓ Pubblicato: https://joseobeso-emp.github.io/NetPath/"
echo "  (GitHub Pages impiega 1-2 minuti ad aggiornarsi)"
