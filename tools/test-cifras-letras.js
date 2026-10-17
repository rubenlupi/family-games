// Pruebas de la lógica de «Cifras y letras». Uso: node tools/test-cifras-letras.js
const fs = require("fs");
const path = require("path");
const assert = require("assert");

const dir = path.join(__dirname, "..", "games", "cifras-letras");
const L = require(path.join(dir, "letras.js"));
const C = require(path.join(dir, "cifras.js"));
const S = require(path.join(dir, "scoring.js"));

let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    console.error(`✗ ${name}\n  ${e.message}`);
    process.exitCode = 1;
  }
}

const dicts = {};
for (const lang of ["es", "en", "fr"]) {
  const t0 = Date.now();
  dicts[lang] = L.buildDictionary(fs.readFileSync(path.join(dir, "dict", `${lang}.txt`), "utf8"), lang);
  console.log(`${lang}: ${dicts[lang].size} formas normalizadas, cargado en ${Date.now() - t0} ms`);
}
const T = (s) => [...s];

// ---------- Letras ----------

test("normalización", () => {
  assert.strictEqual(L.normalizeWord("Árbol", "es"), "ARBOL");
  assert.strictEqual(L.normalizeWord("niño", "es"), "NIÑO");
  assert.strictEqual(L.normalizeWord("pingüino", "es"), "PINGUINO");
  assert.strictEqual(L.normalizeWord("cœur", "fr"), "COEUR");
  assert.strictEqual(L.normalizeWord("Cæcum", "fr"), "CAECUM");
  assert.strictEqual(L.normalizeWord("façon", "fr"), "FACON");
  assert.strictEqual(L.normalizeWord("café", "en"), "CAFE");
});

test("castellano: la ñ es una letra distinta de la n", () => {
  const tiles = T("NIÑOSARET");
  assert.strictEqual(L.checkWord("niño", tiles, dicts.es, "es").status, "ok");
  assert.strictEqual(L.checkWord("niños", tiles, dicts.es, "es").status, "ok");
  const nino = L.checkWord("nino", tiles, dicts.es, "es");
  assert.strictEqual(nino.status, "letters"); // necesita dos N y solo hay una
  assert.deepStrictEqual(nino.missing, ["N"]);
  assert.strictEqual(L.checkWord("año", T("AÑOXXXXXX"), dicts.es, "es").status, "ok");
  assert.strictEqual(L.checkWord("ano", T("AÑOXXXXXX"), dicts.es, "es").status, "letters");
});

test("castellano: tildes opcionales al escribir, ortografía correcta al mostrar", () => {
  const tiles = T("CAMIONESX");
  const r = L.checkWord("camion", tiles, dicts.es, "es");
  assert.strictEqual(r.status, "ok");
  assert.strictEqual(r.display, "camión");
  assert.strictEqual(L.checkWord("CAMIÓN", tiles, dicts.es, "es").status, "ok");
  assert.strictEqual(L.checkWord("camiones", tiles, dicts.es, "es").status, "ok");
});

test("castellano: plurales y conjugaciones", () => {
  for (const w of ["cantamos", "cantabais", "árboles", "comieron", "dámelo", "salimos"]) {
    assert.ok(dicts.es.has(L.normalizeWord(w, "es")), w);
  }
});

test("letras repetidas: cada ficha una sola vez", () => {
  const tiles = T("CASAEXTRO");
  assert.strictEqual(L.checkWord("casa", tiles, dicts.es, "es").status, "ok"); // dos A en las fichas
  const r = L.checkWord("cocos", tiles, dicts.es, "es");
  assert.strictEqual(r.status, "letters");
  assert.deepStrictEqual(r.missing, ["C", "O"]);
});

test("francés: œ y æ ocupan dos fichas; se puede escribir con o sin ligadura", () => {
  const tiles = T("COEURSAXT");
  const a = L.checkWord("cœur", tiles, dicts.fr, "fr");
  const b = L.checkWord("coeur", tiles, dicts.fr, "fr");
  assert.strictEqual(a.status, "ok");
  assert.strictEqual(b.status, "ok");
  assert.strictEqual(b.display, "cœur");
  assert.strictEqual(a.length, 5);
  assert.strictEqual(L.checkWord("cœurs", tiles, dicts.fr, "fr").status, "ok");
  assert.strictEqual(L.checkWord("facon", T("FACONSXTR"), dicts.fr, "fr").display, "façon");
  assert.strictEqual(L.checkWord("etaient", T("ETAIENTXR"), dicts.fr, "fr").display, "étaient");
});

test("inglés: británico y estadounidense", () => {
  for (const w of ["colour", "color", "realise", "realize", "theatre", "theater", "cities", "running"]) {
    assert.ok(dicts.en.has(L.normalizeWord(w, "en")), w);
  }
});

test("exclusiones: nombres propios, siglas, guiones y apóstrofos", () => {
  assert.ok(!dicts.es.has("MADRID"));
  assert.ok(!dicts.es.has("ADSL"));
  assert.ok(!dicts.en.has("LONDON"));
  for (const lang of ["es", "en", "fr"]) {
    for (const forms of dicts[lang].values()) {
      for (const f of forms) assert.ok(/^[a-zà-öø-ÿœæ]+$/.test(f), `${lang}: ${f}`);
    }
  }
});

test("palabras fuera del diccionario y entradas inválidas", () => {
  const tiles = T("CASAEXTRO");
  assert.strictEqual(L.checkWord("", tiles, dicts.es, "es").status, "empty");
  assert.strictEqual(L.checkWord("ca-sa", tiles, dicts.es, "es").status, "invalid");
  assert.strictEqual(L.checkWord("caxt", tiles, dicts.es, "es").status, "unknown");
});

test("las soluciones cumplen las mismas reglas que los jugadores", () => {
  for (const lang of ["es", "en", "fr"]) {
    for (let r = 0; r < 40; r++) {
      const bags = L.newBags(lang);
      const tiles = [];
      while (tiles.length < L.TILE_COUNT) {
        const ok = L.allowedKinds(tiles);
        const kind = ok.vowel && (!ok.consonant || Math.random() < 0.4) ? "vowel" : "consonant";
        tiles.push(L.drawTile(bags, kind));
      }
      const found = L.findWords(tiles, dicts[lang], 30);
      for (const w of found.words) {
        assert.strictEqual(L.checkWord(w.forms[0], tiles, dicts[lang], lang).status, "ok", `${lang} ${tiles.join("")} ${w.forms[0]}`);
      }
    }
  }
});

test("reparto: entre 3 y 5 vocales, solo letras de la bolsa", () => {
  for (const lang of ["es", "en", "fr"]) {
    const allowed = new Set([...Object.keys(L.LETTER_RULES[lang].vowels), ...Object.keys(L.LETTER_RULES[lang].consonants)]);
    for (let r = 0; r < 2000; r++) {
      const bags = L.newBags(lang);
      const tiles = [];
      while (tiles.length < L.TILE_COUNT) {
        const ok = L.allowedKinds(tiles);
        const kind = ok.vowel && ok.consonant ? (Math.random() < 0.5 ? "vowel" : "consonant") : ok.vowel ? "vowel" : "consonant";
        tiles.push(L.drawTile(bags, kind));
      }
      const v = tiles.filter(L.isVowel).length;
      assert.ok(v >= 3 && v <= 5, `${lang} ${tiles.join("")}`);
      assert.ok(tiles.every((t) => allowed.has(t)));
    }
  }
});

test("las rondas de letras son jugables (casi siempre hay una palabra de 5 o más)", () => {
  for (const lang of ["es", "en", "fr"]) {
    let good = 0;
    const N = 300;
    for (let r = 0; r < N; r++) {
      const bags = L.newBags(lang);
      const tiles = [];
      while (tiles.length < L.TILE_COUNT) {
        const ok = L.allowedKinds(tiles);
        tiles.push(L.drawTile(bags, ok.vowel && (!ok.consonant || Math.random() < 0.42) ? "vowel" : "consonant"));
      }
      if (L.findWords(tiles, dicts[lang], 1).best >= 5) good++;
    }
    console.log(`  ${lang}: ${Math.round((good / N) * 100)} % de rondas con palabra de 5+ letras`);
    assert.ok(good / N > 0.9, lang);
  }
});

// ---------- Cifras ----------

const nums = [100, 25, 6, 3, 3, 7];

test("expresiones válidas y prioridad de operaciones", () => {
  assert.strictEqual(C.checkExpression("100 + 25", nums).value, 125);
  assert.strictEqual(C.checkExpression("100 + 25 × 3", nums).value, 175);
  assert.strictEqual(C.checkExpression("(100 + 25) × 3", nums).value, 375);
  assert.strictEqual(C.checkExpression("(100+25)*3-7", nums).value, 368);
  assert.strictEqual(C.checkExpression("100 / 25 x 6", nums).value, 24);
  assert.strictEqual(C.checkExpression("100 ÷ 25 · 6 : 3", nums).value, 8);
  assert.strictEqual(C.checkExpression("7", nums).value, 7);
  assert.strictEqual(C.checkExpression("3 × 3", nums).value, 9); // hay dos 3
});

test("expresiones inválidas", () => {
  const code = (e) => C.checkExpression(e, nums).code;
  assert.strictEqual(code(""), "empty");
  assert.strictEqual(code("   "), "empty");
  assert.strictEqual(code("100 25"), "syntax");
  assert.strictEqual(code("100 +"), "syntax");
  assert.strictEqual(code("(100 + 25"), "paren");
  assert.strictEqual(code("100 + 25)"), "paren");
  assert.strictEqual(code("-3 + 7"), "syntax");
  assert.strictEqual(code("2^3"), "char");
  assert.strictEqual(code("100 + 8"), "missing");
  assert.strictEqual(code("100 + 100"), "repeated");
  assert.strictEqual(code("3 + 3 + 3"), "repeated");
});

test("divisiones no exactas y resultados no positivos", () => {
  assert.strictEqual(C.checkExpression("7 / 3", nums).code, "division");
  assert.strictEqual(C.checkExpression("(100 + 7) / 3", nums).code, "division");
  assert.strictEqual(C.checkExpression("3 - 3", nums).code, "negative");
  assert.strictEqual(C.checkExpression("3 - 7", nums).code, "negative");
  // También a mitad de la cuenta, aunque al final saliera positivo.
  assert.strictEqual(C.checkExpression("(3 - 7) + 100", nums).code, "negative");
  assert.strictEqual(C.checkExpression("100 / (3 - 3)", nums).code, "negative");
});

test("el solucionador encuentra exactas y cumple las reglas de los jugadores", () => {
  let exact = 0;
  let maxMs = 0;
  const N = 150;
  for (let r = 0; r < N; r++) {
    const { numbers, target } = C.drawNumbers(r % 5);
    const t0 = Date.now();
    const sol = C.solve(numbers, target);
    maxMs = Math.max(maxMs, Date.now() - t0);
    const check = C.checkExpression(sol.expression, numbers);
    assert.ok(check.ok, `${numbers} → ${sol.expression}: ${check.code}`);
    assert.strictEqual(check.value, sol.value);
    assert.strictEqual(sol.distance, Math.abs(sol.value - target));
    // Los pasos encadenan resultados enteros positivos.
    for (const s of sol.steps) assert.ok(Number.isInteger(s.value) && s.value > 0);
    if (sol.distance === 0) exact++;
  }
  console.log(`  ${exact} de ${N} rondas normales con solución exacta; la más lenta tardó ${maxMs} ms`);
});

// Búsqueda de fuerza bruta independiente para comprobar que el solucionador no se deja exactas.
function reachable(numbers) {
  const seen = new Set();
  const out = new Set();
  (function rec(list) {
    const key = [...list].sort((a, b) => a - b).join(",");
    if (seen.has(key)) return;
    seen.add(key);
    for (const n of list) out.add(n);
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list.length; j++) {
        if (i === j) continue;
        const a = list[i];
        const b = list[j];
        const rest = list.filter((_, k) => k !== i && k !== j);
        const results = [a + b, a * b];
        if (a - b > 0) results.push(a - b);
        if (a % b === 0) results.push(a / b);
        for (const v of results) rec([...rest, v]);
      }
    }
  })(numbers);
  return out;
}

test("objetivos sin solución exacta: da la más cercana", () => {
  for (let r = 0; r < 25; r++) {
    const { numbers, target } = C.drawNumbers(r % 3);
    const all = reachable(numbers);
    const sol = C.solve(numbers, target);
    let bestDistance = Infinity;
    for (const v of all) bestDistance = Math.min(bestDistance, Math.abs(v - target));
    assert.strictEqual(sol.distance, bestDistance, `${numbers} → ${target}`);
  }
  // Con 1, 1, 2, 2, 3, 3 lo máximo alcanzable es 81 = 3 · 3 · (1 + 2) · (1 + 2).
  const sol = C.solve([1, 1, 2, 2, 3, 3], 999);
  assert.strictEqual(Math.max(...reachable([1, 1, 2, 2, 3, 3])), 81);
  assert.strictEqual(sol.value, 81);
  assert.strictEqual(C.checkExpression(sol.expression, [1, 1, 2, 2, 3, 3]).value, 81);
});

test("modo fácil: números del 1 al 10 y objetivo siempre alcanzable", () => {
  for (let r = 0; r < 300; r++) {
    const { numbers, target } = C.drawEasyNumbers();
    assert.ok(numbers.every((n) => n >= 1 && n <= 10));
    assert.ok(target >= C.EASY_TARGET_MIN && target <= C.EASY_TARGET_MAX);
    assert.strictEqual(C.solve(numbers, target).distance, 0, `${numbers} → ${target}`);
  }
});

test("bolsa: copias respetadas", () => {
  for (let r = 0; r < 2000; r++) {
    const { numbers, target } = C.drawNumbers(r % 5);
    assert.strictEqual(numbers.length, 6);
    assert.ok(target >= 100 && target <= 999);
    const counts = {};
    for (const n of numbers) counts[n] = (counts[n] || 0) + 1;
    for (const [n, c] of Object.entries(counts)) assert.ok(c <= (Number(n) > 10 ? 1 : 2), numbers.join(","));
    assert.strictEqual(numbers.filter((n) => n > 10).length, r % 5);
  }
});

// ---------- Puntuación ----------

test("puntos de letras con empates y sin respuestas válidas", () => {
  let r = S.scoreLetters([{ name: "A", valid: true, length: 6 }, { name: "B", valid: true, length: 6 }, { name: "C", valid: true, length: 4 }, { name: "D", valid: false, length: 8 }]);
  assert.deepStrictEqual(r.points, { A: 6, B: 6, C: 0, D: 0 });
  r = S.scoreLetters([{ name: "A", valid: false, length: 5 }, { name: "B", valid: false, length: 0 }]);
  assert.deepStrictEqual(r.points, { A: 0, B: 0 });
});

test("puntos de cifras: 10 / 7 / 5 / 0 y empates", () => {
  const sc = (answers) => S.scoreNumbers(answers, 500).points;
  assert.deepStrictEqual(sc([{ name: "A", valid: true, value: 500 }, { name: "B", valid: true, value: 499 }]), { A: 10, B: 0 });
  assert.deepStrictEqual(sc([{ name: "A", valid: true, value: 503 }, { name: "B", valid: true, value: 497 }]), { A: 7, B: 7 });
  assert.deepStrictEqual(sc([{ name: "A", valid: true, value: 508 }, { name: "B", valid: false, value: 500 }]), { A: 5, B: 0 });
  assert.deepStrictEqual(sc([{ name: "A", valid: true, value: 511 }]), { A: 0 });
  assert.deepStrictEqual(sc([{ name: "A", valid: false }]), { A: 0 });
});

test("clasificación con empates", () => {
  const r = S.ranking(["A", "B", "C", "D"], { A: 10, B: 17, C: 10, D: 3 });
  assert.deepStrictEqual(r.map((x) => `${x.name}${x.place}`), ["B1", "A2", "C2", "D4"]);
});

console.log(`${passed} pruebas superadas${process.exitCode ? ", con fallos" : ""}`);
