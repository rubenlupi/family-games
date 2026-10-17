// Lógica de las rondas de cifras: bolsa, objetivo, lectura de expresiones y solucionador.
// No toca la interfaz y no usa eval. Se carga en la página y en el Web Worker del solucionador.
//
// Reglas (las mismas para los jugadores y para el solucionador):
// - Se pueden usar +, −, × y ÷ con los 6 números; cada número, una vez por cada vez que aparece.
// - No hace falta usarlos todos.
// - Cada resultado intermedio tiene que ser un entero positivo: no valen restas que den 0
//   o menos, ni divisiones que no sean exactas.

// Bolsa configurable: dos copias de 1–10 y una de 25, 50, 75 y 100.
const NUMBER_BAG = {
  small: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  large: [25, 50, 75, 100],
};
const NUMBER_COUNT = 6;
const TARGET_MIN = 100;
const TARGET_MAX = 999;
// Modo fácil: solo números del 1 al 10 y un objetivo que se sabe alcanzable.
const EASY_TARGET_MIN = 20;
const EASY_TARGET_MAX = 200;

function takeRandom(pool, n, random) {
  const copy = [...pool];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) out.push(copy.splice(Math.floor(random() * copy.length), 1)[0]);
  return out;
}

// Normal: `large` números grandes (0–4) y el resto pequeños; objetivo al azar entre 100 y 999.
function drawNumbers(large, random = Math.random) {
  const big = takeRandom(NUMBER_BAG.large, Math.max(0, Math.min(4, large)), random);
  const small = takeRandom(NUMBER_BAG.small, NUMBER_COUNT - big.length, random);
  return {
    numbers: [...big, ...small],
    target: TARGET_MIN + Math.floor(random() * (TARGET_MAX - TARGET_MIN + 1)),
  };
}

// Fácil: números pequeños y un objetivo construido con operaciones válidas sobre ellos.
function drawEasyNumbers(random = Math.random) {
  for (let tries = 0; tries < 500; tries++) {
    const numbers = takeRandom(NUMBER_BAG.small, NUMBER_COUNT, random);
    let pool = takeRandom(numbers, 3 + Math.floor(random() * 2), random);
    while (pool.length > 1) {
      const a = pool.splice(Math.floor(random() * pool.length), 1)[0];
      const b = pool.splice(Math.floor(random() * pool.length), 1)[0];
      const options = combine(a, b).map((s) => s.value);
      pool.push(options[Math.floor(random() * options.length)]);
    }
    const target = pool[0];
    if (target >= EASY_TARGET_MIN && target <= EASY_TARGET_MAX) return { numbers, target };
  }
  return { numbers: [2, 3, 4, 5, 6, 10], target: 60 };
}

// Operaciones válidas entre dos números (resultados enteros positivos).
function combine(a, b) {
  const [x, y] = a >= b ? [a, b] : [b, a];
  const out = [{ op: "+", a: x, b: y, value: x + y }, { op: "×", a: x, b: y, value: x * y }];
  if (x > y) out.push({ op: "−", a: x, b: y, value: x - y });
  if (x % y === 0) out.push({ op: "÷", a: x, b: y, value: x / y });
  return out;
}

// ---------- Lectura de expresiones ----------

const OPERATORS = { "+": "+", "-": "−", "−": "−", "–": "−", "*": "×", "×": "×", "x": "×", "X": "×", "·": "×", "/": "÷", "÷": "÷", ":": "÷" };

function tokenize(text) {
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    const c = text[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9]/.test(c)) {
      let j = i;
      while (j < text.length && /[0-9]/.test(text[j])) j++;
      tokens.push({ type: "num", value: Number(text.slice(i, j)), pos: i });
      i = j;
    } else if (c in OPERATORS) {
      tokens.push({ type: "op", value: OPERATORS[c], pos: i });
      i++;
    } else if (c === "(" || c === ")") {
      tokens.push({ type: c, pos: i });
      i++;
    } else {
      throw { code: "char", char: c };
    }
  }
  return tokens;
}

// expresión := término (("+" | "−") término)*
// término    := factor (("×" | "÷") factor)*
// factor     := número | "(" expresión ")"
function parseExpression(text) {
  const tokens = tokenize(text);
  if (!tokens.length) throw { code: "empty" };
  let i = 0;
  const peek = () => tokens[i];

  function factor() {
    const t = peek();
    if (!t) throw { code: "syntax" };
    if (t.type === "num") { i++; return { type: "num", value: t.value }; }
    if (t.type === "(") {
      i++;
      const inner = expression();
      if (!peek() || peek().type !== ")") throw { code: "paren" };
      i++;
      return inner;
    }
    throw { code: "syntax" };
  }
  function term() {
    let node = factor();
    while (peek() && peek().type === "op" && (peek().value === "×" || peek().value === "÷")) {
      const op = tokens[i++].value;
      node = { type: "op", op, left: node, right: factor() };
    }
    return node;
  }
  function expression() {
    let node = term();
    while (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "−")) {
      const op = tokens[i++].value;
      node = { type: "op", op, left: node, right: term() };
    }
    return node;
  }

  const tree = expression();
  if (i < tokens.length) throw { code: tokens[i].type === ")" ? "paren" : "syntax" };
  return tree;
}

// Calcula el árbol aplicando las reglas del juego. Devuelve { value, used, steps } o lanza { code, … }.
function evaluateTree(tree) {
  const used = [];
  const steps = [];
  function walk(node) {
    if (node.type === "num") {
      used.push(node.value);
      return node.value;
    }
    const a = walk(node.left);
    const b = walk(node.right);
    let value;
    if (node.op === "+") value = a + b;
    else if (node.op === "×") value = a * b;
    else if (node.op === "−") {
      value = a - b;
      if (value <= 0) throw { code: "negative", a, b };
    } else {
      if (b === 0 || a % b !== 0) throw { code: "division", a, b };
      value = a / b;
    }
    steps.push({ op: node.op, a, b, value });
    return value;
  }
  const value = walk(tree);
  return { value, used, steps };
}

// Comprueba la expresión de un jugador. Devuelve { ok: true, value, steps } o { ok: false, code, … }.
function checkExpression(text, numbers) {
  try {
    const result = evaluateTree(parseExpression(String(text || "")));
    const left = [...numbers];
    for (const n of result.used) {
      const i = left.indexOf(n);
      if (i < 0) {
        const code = numbers.includes(n) ? "repeated" : "missing";
        return { ok: false, code, n };
      }
      left.splice(i, 1);
    }
    return { ok: true, value: result.value, steps: result.steps };
  } catch (e) {
    if (e && e.code) return { ok: false, ...e };
    throw e;
  }
}

// ---------- Solucionador ----------
//
// Busca primero soluciones exactas con 1 operación, luego con 2, etc. (la primera que encuentra
// es de las más cortas). Si no hay exacta, devuelve la más cercana con menos operaciones.
// Solo usa combine(), así que respeta las mismas reglas que checkExpression().

function solve(numbers, target) {
  let best = null;
  const consider = (value, steps, expr) => {
    const distance = Math.abs(value - target);
    if (!best || distance < best.distance || (distance === best.distance && steps.length < best.steps.length)) {
      best = { value, distance, steps: [...steps], expression: expr };
    }
  };
  numbers.forEach((n) => consider(n, [], String(n)));
  if (best.distance === 0) return best;

  let exactFound = false;
  function search(items, steps, depth) {
    for (let i = 0; i < items.length && !exactFound; i++) {
      for (let j = i + 1; j < items.length && !exactFound; j++) {
        const [p, q] = items[i].value >= items[j].value ? [items[i], items[j]] : [items[j], items[i]];
        const rest = items.filter((_, k) => k !== i && k !== j);
        for (const s of combine(p.value, q.value)) {
          // ×1 y ÷1 no aportan nada nuevo.
          if ((s.op === "×" || s.op === "÷") && s.b === 1) continue;
          const expr = `(${p.expr} ${s.op} ${q.expr})`;
          steps.push(s);
          if (steps.length === depth) {
            consider(s.value, steps, expr);
            if (s.value === target) exactFound = true;
          } else if (rest.length) {
            search([...rest, { value: s.value, expr }], steps, depth);
          }
          steps.pop();
          if (exactFound) return;
        }
      }
    }
  }
  const start = numbers.map((n) => ({ value: n, expr: String(n) }));
  for (let depth = 1; depth < numbers.length && !exactFound; depth++) search(start, [], depth);
  best.expression = best.expression.replace(/^\((.*)\)$/, "$1");
  return best;
}

if (typeof module !== "undefined") {
  module.exports = { NUMBER_BAG, NUMBER_COUNT, TARGET_MIN, TARGET_MAX, EASY_TARGET_MIN, EASY_TARGET_MAX, drawNumbers, drawEasyNumbers, combine, parseExpression, evaluateTree, checkExpression, solve };
}
