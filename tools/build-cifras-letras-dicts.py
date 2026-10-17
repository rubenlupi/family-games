#!/usr/bin/env python3
"""Genera los diccionarios de «Cifras y letras» (games/cifras-letras/dict/*.txt).

No se ejecuta en la web: sirve para reconstruir los ficheros a partir de las fuentes.
Las fuentes y sus licencias están documentadas en games/cifras-letras/dict/README.md.

Uso:
  python3 tools/build-cifras-letras-dicts.py \
      --es ruta/es-expandido.txt \
      --fr ruta/fr-expandido.txt \
      --en ruta/scowl-2020.12.07/final

- es: lista ya expandida del diccionario hunspell es_ES (RLA-ES), una forma por línea.
- fr: lista ya expandida del diccionario hunspell francés de Grammalecte (Dicollecte).
      Las dos se obtienen con `unmunch index.dic index.aff`, volviendo a pasar por unmunch
      las líneas que aún llevan «/banderas» (afijos encadenados).
- en: carpeta «final» de SCOWL.

Reglas comunes (las mismas que aplica letras.js al validar):
- Se descartan palabras con mayúsculas (nombres propios, siglas), con espacios,
  guiones, apóstrofos, puntos o cifras.
- Normalización para las fichas: minúsculas, sin tildes ni diacríticos;
  en castellano la ñ se conserva como letra propia; œ → oe y æ → ae.
- Solo palabras de 2 a 9 fichas.
- Cada fichero tiene una forma escrita por línea, con su ortografía correcta,
  ordenadas de más a menos frecuentes cuando la fuente da frecuencias.
"""

import argparse
import collections
import os
import re
import sys
import unicodedata

MIN_LEN, MAX_LEN = 2, 9
ALPHABET = {
    "es": set("abcdefghijklmnopqrstuvwxyzñ"),
    "en": set("abcdefghijklmnopqrstuvwxyz"),
    "fr": set("abcdefghijklmnopqrstuvwxyz"),
}
VOWELS = {"es": set("aeiou"), "en": set("aeiou"), "fr": set("aeiou")}
# Solo letras (con diacríticos), en minúscula.
WORD_RE = re.compile(r"^[a-zà-öø-ÿœæ]+$")


def normalize(word, lang):
    """Igual que normalize() en letras.js."""
    w = word.lower().replace("œ", "oe").replace("æ", "ae")
    if lang == "es":
        w = w.replace("ñ", "\0")
    w = "".join(c for c in unicodedata.normalize("NFD", w) if not unicodedata.combining(c))
    return w.replace("\0", "ñ")


def keep(word, lang):
    if not WORD_RE.match(word):
        return None
    n = normalize(word, lang)
    if not (MIN_LEN <= len(n) <= MAX_LEN) or not set(n) <= ALPHABET[lang]:
        return None
    return n


def load_hunspell_expanded(path):
    words = set()
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            w = line.strip()
            if w and "/" not in w:
                words.add(w)
    # Estas fuentes no dan frecuencias: orden alfabético.
    return sorted(words)


def load_en(folder):
    # Palabras comunes a todas las variantes, estadounidenses y británicas (-ise y -ize),
    # hasta el tamaño 60 (el recomendado por SCOWL para correctores).
    kinds = ["english-words", "american-words", "british-words", "british_z-words"]
    level = {}
    for name in os.listdir(folder):
        base, _, size = name.rpartition(".")
        if base in kinds and size.isdigit() and int(size) <= 60:
            with open(os.path.join(folder, name), encoding="latin-1") as fh:
                for line in fh:
                    w = line.strip()
                    if w:
                        level[w] = min(level.get(w, 99), int(size))
    return sorted(level, key=lambda w: (level[w], w))


def build(lang, words, out_dir):
    seen = set()
    out = []
    letters = collections.Counter()
    for w in words:
        n = keep(w, lang)
        if n is None or w in seen:
            continue
        seen.add(w)
        out.append(w)
        letters.update(n)
    with open(os.path.join(out_dir, f"{lang}.txt"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(out) + "\n")
    total = sum(letters.values())
    print(f"{lang}: {len(out)} palabras, {os.path.getsize(os.path.join(out_dir, f'{lang}.txt')) // 1024} KB")
    for group, name in ((VOWELS[lang], "vocales"), (ALPHABET[lang] - VOWELS[lang], "consonantes")):
        share = {c: letters[c] / total * 100 for c in sorted(group)}
        print(f"  {name}: " + " ".join(f"{c}={share[c]:.2f}" for c in sorted(share, key=share.get, reverse=True)))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--es", required=True)
    ap.add_argument("--fr", required=True)
    ap.add_argument("--en", required=True)
    ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "..", "games", "cifras-letras", "dict"))
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)
    build("es", load_hunspell_expanded(args.es), args.out)
    build("fr", load_hunspell_expanded(args.fr), args.out)
    build("en", load_en(args.en), args.out)


if __name__ == "__main__":
    sys.exit(main())
