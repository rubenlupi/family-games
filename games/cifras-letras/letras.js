// Lógica de las rondas de letras: normalización, reparto, validación y búsqueda de palabras.
// No toca la interfaz. Las mismas reglas sirven para validar a los jugadores y para buscar soluciones.
//
// Fichas y normalización (igual que tools/build-cifras-letras-dicts.py):
// - Todo en mayúsculas y sin tildes ni diacríticos: «árbol» se juega con A R B O L.
// - Castellano: la Ñ es una ficha propia, distinta de la N.
// - Francés e inglés: œ se escribe con dos fichas, O + E (cœur = C O E U R), y æ con A + E.
//   La Ç se juega como C.
// - Una palabra vale tantos puntos como fichas usa.

const LETTER_RULES = {
  // Bolsas calculadas con la frecuencia de cada letra en el propio diccionario
  // (ver dict/README.md). Se quitan las letras con menos de un 0,15 % de apariciones.
  es: {
    vowels: { A: 19, E: 13, O: 8, I: 7, U: 3 },
    consonants: { R: 14, S: 12, N: 8, L: 7, D: 6, C: 6, T: 6, M: 4, P: 3, B: 3, G: 2, V: 2, H: 1, F: 1, J: 1, Z: 1, Ñ: 1, Q: 1, X: 1, Y: 1 },
  },
  fr: {
    vowels: { E: 18, A: 12, I: 9, O: 6, U: 5 },
    consonants: { S: 13, R: 12, T: 9, N: 9, L: 6, C: 5, M: 4, P: 4, D: 3, G: 3, B: 3, F: 2, H: 2, V: 2, Z: 2, Y: 1, Q: 1, X: 1, J: 1, K: 1 },
  },
  en: {
    vowels: { E: 17, I: 11, A: 10, O: 8, U: 5 },
    consonants: { S: 12, R: 9, T: 8, N: 8, L: 7, D: 6, C: 5, G: 4, P: 4, M: 3, H: 3, B: 3, Y: 2, F: 2, K: 2, W: 2, V: 1, Z: 1, X: 1, J: 1, Q: 1 },
  },
};

const TILE_COUNT = 9;
const MIN_VOWELS = 3;
const MIN_CONSONANTS = 4;

// «Cœur» → «COEUR», «Árbol» → «ARBOL», «niño» → «NIÑO» (solo en castellano se conserva la Ñ).
function normalizeWord(word, lang) {
  let w = String(word).trim().toLowerCase().replace(/œ/g, "oe").replace(/æ/g, "ae");
  if (lang === "es") w = w.replace(/ñ/g, "\u0000");
  w = w.normalize("NFD").replace(/\p{M}/gu, "");
  return w.replace(/\u0000/g, "ñ").toUpperCase();
}

function isVowel(letter) {
  return "AEIOU".includes(letter);
}

// ---------- Reparto ----------

function newBags(lang) {
  const bag = (counts) => Object.entries(counts).flatMap(([l, n]) => Array(n).fill(l));
  return { vowels: bag(LETTER_RULES[lang].vowels), consonants: bag(LETTER_RULES[lang].consonants) };
}

// Saca una ficha al azar de la bolsa (sin devolverla), así las letras frecuentes salen más.
function drawTile(bags, kind, random = Math.random) {
  const bag = kind === "vowel" ? bags.vowels : bags.consonants;
  const i = Math.floor(random() * bag.length);
  return bag.splice(i, 1)[0];
}

// Qué se puede pedir todavía sin romper el mínimo de vocales y consonantes.
function allowedKinds(tiles) {
  const left = TILE_COUNT - tiles.length;
  const vowels = tiles.filter(isVowel).length;
  const consonants = tiles.length - vowels;
  return {
    vowel: left > 0 && MIN_CONSONANTS - consonants < left,
    consonant: left > 0 && MIN_VOWELS - vowels < left,
  };
}

// ---------- Diccionario ----------

// Map de forma normalizada → formas escritas (p. ej. «ESTA» → [«esta», «está»]).
function buildDictionary(text, lang) {
  const dict = new Map();
  for (const line of text.split("\n")) {
    const word = line.trim();
    if (!word) continue;
    const key = normalizeWord(word, lang);
    const forms = dict.get(key);
    if (forms) forms.push(word);
    else dict.set(key, [word]);
  }
  return dict;
}

const dictionaryCache = {};

function loadDictionary(lang, base = "dict/") {
  if (!dictionaryCache[lang]) {
    dictionaryCache[lang] = fetch(`${base}${lang}.txt`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => buildDictionary(text, lang))
      .catch((e) => {
        delete dictionaryCache[lang];
        throw e;
      });
  }
  return dictionaryCache[lang];
}

// ---------- Validación ----------

function countLetters(letters) {
  const counts = {};
  for (const l of letters) counts[l] = (counts[l] || 0) + 1;
  return counts;
}

// Qué letras de la palabra faltan entre las fichas (vacío si se puede formar).
function missingLetters(norm, tiles) {
  const left = countLetters(tiles);
  const missing = [];
  for (const l of norm) {
    if (left[l]) left[l]--;
    else missing.push(l);
  }
  return missing;
}

// status: "empty" | "invalid" (caracteres que no son letras) | "letters" (usa fichas que no hay)
//       | "unknown" (no está en el diccionario: la familia puede aceptarla) | "ok"
function checkWord(input, tiles, dict, lang) {
  const raw = String(input || "").trim();
  if (!raw) return { status: "empty", length: 0 };
  const norm = normalizeWord(raw, lang);
  const alphabet = lang === "es" ? /^[A-ZÑ]+$/ : /^[A-Z]+$/;
  if (!alphabet.test(norm)) return { status: "invalid", norm, length: 0 };
  const missing = missingLetters(norm, tiles);
  if (missing.length) return { status: "letters", norm, missing, length: norm.length };
  const forms = dict.get(norm);
  if (!forms) return { status: "unknown", norm, display: raw.toLowerCase(), length: norm.length };
  // Si lo escrito coincide con una forma del diccionario (con tildes), se muestra tal cual.
  const display = forms.find((f) => f === raw.toLowerCase()) || forms[0];
  return { status: "ok", norm, display, forms, length: norm.length };
}

// Palabras del diccionario que se pueden formar con las fichas, de más larga a más corta.
function findWords(tiles, dict, limit = 12) {
  const have = countLetters(tiles);
  const found = [];
  for (const [norm, forms] of dict) {
    if (norm.length > tiles.length) continue;
    const used = {};
    let ok = true;
    for (const l of norm) {
      used[l] = (used[l] || 0) + 1;
      if (used[l] > (have[l] || 0)) { ok = false; break; }
    }
    if (ok) found.push({ norm, forms, length: norm.length });
  }
  found.sort((a, b) => b.length - a.length || a.norm.localeCompare(b.norm));
  return { total: found.length, best: found.length ? found[0].length : 0, words: found.slice(0, limit) };
}

// Índices de las fichas que usa una palabra (para resaltarlas).
function usedTileIndexes(norm, tiles) {
  const taken = new Set();
  for (const l of norm) {
    const i = tiles.findIndex((t, idx) => t === l && !taken.has(idx));
    if (i >= 0) taken.add(i);
  }
  return taken;
}

if (typeof module !== "undefined") {
  module.exports = { LETTER_RULES, TILE_COUNT, MIN_VOWELS, MIN_CONSONANTS, normalizeWord, isVowel, newBags, drawTile, allowedKinds, buildDictionary, loadDictionary, checkWord, findWords, usedTileIndexes, missingLetters };
}
