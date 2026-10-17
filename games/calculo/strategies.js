// Estrategias de cálculo mental, por bloques de 5.
//
// Cada estrategia tiene:
//   id, block, icon
//   name, idea, why   textos [español, inglés, francés]
//   example           una operación fija para la explicación (sus pasos se calculan con steps)
//   gen(level)        crea una operación en la que la estrategia es útil (nivel 1 fácil, 2 medio, 3 difícil)
//   fits(p)           si la estrategia sirve para la operación p (para enseñar otras formas válidas)
//   steps(p)          los pasos para resolver p con esta estrategia, en el idioma elegido
//
// Una operación es { op: "+" | "−" | "×" | "÷", nums: [...], answer }.
//
// Las estrategias se han contrastado con Mental Math de Wikibooks (CC BY-SA),
// Open-Apps-Studio/mental-math (MIT) y World Mental Calculation. Los textos, ejemplos y
// generadores son propios: no se ha copiado contenido de esas fuentes.

const CALC_LANG = { es: 0, en: 1, fr: 2 }[I18N.lang];
const NUM = new Intl.NumberFormat(I18N.lang);

// f(1234) → «1234» / «1,234» / «1 234» según el idioma.
const f = (n) => NUM.format(n);
// T("hola", "hello", "bonjour") → el texto del idioma elegido.
const T = (...texts) => texts[CALC_LANG];

const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const randNotRound = (a, b) => {
  let n;
  do { n = rand(a, b); } while (n % 10 === 0);
  return n;
};

const CALC = {
  "+": (a, b) => a + b,
  "−": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => a / b,
};

function make(op, nums) {
  return { op, nums, answer: nums.reduce(CALC[op]) };
}

// Las dos órdenes de los dos números de una operación.
const orders = (p) => [[p.nums[0], p.nums[1]], [p.nums[1], p.nums[0]]];
const twoNums = (p, op) => p.op === op && p.nums.length === 2;

// Múltiplo de `base` más cercano y si `n` está a `max` o menos de él (sin serlo).
function nearRound(n, base, max) {
  const R = Math.round(n / base) * base;
  const k = R - n;
  return R > 0 && k !== 0 && Math.abs(k) <= max ? { R, k } : null;
}

// ---------- Bloque 1: sumas y restas ----------

function completePlan(p) {
  if (!twoNums(p, "+")) return null;
  for (const [x, y] of orders(p)) {
    const need = 100 - (x % 100);
    if (x >= 100 && x % 100 >= 80 && need < y) return { x, y, need, target: x + need };
  }
  // Lo natural es completar el número grande (47 + 8 → 50 + 5); el pequeño solo si acaba en 5 o más.
  const [big, small] = p.nums[0] >= p.nums[1] ? p.nums : [p.nums[1], p.nums[0]];
  for (const [x, y] of [[big, small], [small, big]]) {
    const need = 10 - (x % 10);
    if (x % 10 !== 0 && (x === big || x % 10 >= 5) && need < y && (x % 10) + (y % 10) >= 10) return { x, y, need, target: x + need };
  }
  return null;
}

function roundPlan(p) {
  if (p.nums.length !== 2 || (p.op !== "+" && p.op !== "−")) return null;
  const [a, b] = p.nums;
  const candidates = p.op === "+" ? [[a, b], [b, a]] : [[b, a]];
  let best = null;
  for (const [t, o] of candidates) {
    const near = (t >= 100 && nearRound(t, 100, 5)) || nearRound(t, 10, 3);
    if (near && (!best || Math.abs(near.k) < Math.abs(best.k))) best = { t, o, ...near };
  }
  return best;
}

function groupPlan(p) {
  if (p.op !== "+" || p.nums.length < 3) return null;
  const rest = [...p.nums];
  const pairs = [];
  for (const base of [100, 10]) {
    for (let i = 0; i < rest.length; i++) {
      for (let j = i + 1; j < rest.length; j++) {
        const s = rest[i] + rest[j];
        if (s % base === 0 && rest[i] % base !== 0) {
          pairs.push([rest[i], rest[j], s]);
          rest.splice(j, 1);
          rest.splice(i, 1);
          i = -1;
          break;
        }
      }
    }
  }
  return pairs.length ? { pairs, rest } : null;
}

// «48 + 48: doble de 40 = 80 y doble de 8 = 16 → 96»
function doubleHint(n) {
  const units = n % 10;
  const tens = n - units;
  if (n < 20 || units === 0) return null;
  return T(
    `Doble de ${f(tens)} = ${f(2 * tens)} y doble de ${f(units)} = ${f(2 * units)}: ${f(n)} + ${f(n)} = ${f(2 * n)}.`,
    `Double ${f(tens)} = ${f(2 * tens)} and double ${f(units)} = ${f(2 * units)}: ${f(n)} + ${f(n)} = ${f(2 * n)}.`,
    `Double de ${f(tens)} = ${f(2 * tens)} et double de ${f(units)} = ${f(2 * units)} : ${f(n)} + ${f(n)} = ${f(2 * n)}.`
  );
}

function shiftPlan(p) {
  if (!twoNums(p, "−")) return null;
  const [a, b] = p.nums;
  const near = (b >= 100 && nearRound(b, 100, 5)) || nearRound(b, 10, 3);
  return near && a + near.k > near.R ? { a, b, ...near } : null;
}

// ---------- Bloque 2 y 3: multiplicación y división ----------

// La pareja (factor especial, otro factor) de una multiplicación, si existe.
function factorWith(p, test) {
  if (!twoNums(p, "×")) return null;
  for (const [x, y] of orders(p)) if (test(x, y)) return { k: x, m: y };
  return null;
}

function placeParts(n) {
  const parts = [];
  let mult = 1;
  while (n > 0) {
    const d = n % 10;
    if (d) parts.unshift(d * mult);
    n = Math.floor(n / 10);
    mult *= 10;
  }
  return parts;
}

function halveDoubleChain(e, o) {
  const chain = [[e, o]];
  while (o % 10 !== 0 && e % 2 === 0) {
    e /= 2;
    o *= 2;
    chain.push([e, o]);
  }
  if (e % 2 === 0 && o % 100 !== 0 && (o * 2) % 100 === 0) {
    e /= 2;
    o *= 2;
    chain.push([e, o]);
  }
  return chain;
}

// «23 × 70: 23 × 7 = 161, y se añade un 0»
function zerosHint(e, o) {
  let zeros = 0;
  let base = o;
  while (base % 10 === 0) { base /= 10; zeros++; }
  if (!zeros || base === 1 || e < 10) return null;
  const z = "0".repeat(zeros);
  return T(
    `(${f(e)} × ${f(base)} = ${f(e * base)} y se añade${zeros > 1 ? "n" : ""} ${z}.)`,
    `(${f(e)} × ${f(base)} = ${f(e * base)}, then add ${z}.)`,
    `(${f(e)} × ${f(base)} = ${f(e * base)}, puis on ajoute ${z}.)`
  );
}

const DIVISOR_FACTORS = { 12: [2, 6], 14: [2, 7], 15: [3, 5], 16: [4, 4], 18: [2, 9], 24: [4, 6], 36: [4, 9], 45: [5, 9], 48: [6, 8] };

const STRATEGIES = [
  // ===== Bloque 1: sumas y restas =====
  {
    id: "complete", block: 0, icon: "🔟",
    name: ["Completar decenas y centenas", "Bridging through ten", "Compléter la dizaine"],
    idea: [
      "Para sumar, primero llega a la decena (o centena) redonda más cercana y después suma lo que te queda.",
      "When adding, first get to the nearest round ten (or hundred), then add whatever is left.",
      "Pour additionner, va d'abord jusqu'à la dizaine (ou centaine) ronde la plus proche, puis ajoute le reste.",
    ],
    why: [
      "Sumar a un número redondo es muy fácil (50 + 5). Partir el segundo número no cambia el total: solo lo sumas en dos trozos.",
      "Adding to a round number is very easy (50 + 5). Splitting the second number doesn't change the total: you just add it in two pieces.",
      "Ajouter à un nombre rond est très facile (50 + 5). Découper le second nombre ne change pas le total : on l'ajoute en deux morceaux.",
    ],
    example: make("+", [47, 8]),
    gen(level) {
      if (level === 1) {
        const a = rand(1, 8) * 10 + rand(6, 9);
        return make("+", [a, rand(11 - (a % 10), 9)]);
      }
      if (level === 2) {
        const a = rand(2, 8) * 10 + rand(5, 9);
        return make("+", shuffle([a, rand(1, 6) * 10 + rand(11 - (a % 10), 9)]));
      }
      const a = rand(1, 9) * 100 + randNotRound(81, 98);
      return make("+", [a, randNotRound(100 - (a % 100) + 3, 89)]);
    },
    fits: (p) => !!completePlan(p),
    steps(p) {
      const { x, y, need, target } = completePlan(p);
      const rest = y - need;
      return [
        T(`A ${f(x)} le ${need === 1 ? "falta" : "faltan"} ${f(need)} para llegar a ${f(target)}.`, `${f(x)} needs ${f(need)} more to reach ${f(target)}.`, `Il manque ${f(need)} à ${f(x)} pour arriver à ${f(target)}.`),
        T(`Parte el ${f(y)} en ${f(need)} + ${f(rest)}.`, `Split ${f(y)} into ${f(need)} + ${f(rest)}.`, `Découpe ${f(y)} en ${f(need)} + ${f(rest)}.`),
        T(`${f(x)} + ${f(need)} = ${f(target)}, y ${f(target)} + ${f(rest)} = ${f(p.answer)}.`, `${f(x)} + ${f(need)} = ${f(target)}, then ${f(target)} + ${f(rest)} = ${f(p.answer)}.`, `${f(x)} + ${f(need)} = ${f(target)}, puis ${f(target)} + ${f(rest)} = ${f(p.answer)}.`),
      ];
    },
  },
  {
    id: "round", block: 0, icon: "🎯",
    name: ["Redondear y compensar", "Round and compensate", "Arrondir et compenser"],
    idea: [
      "Si un número está muy cerca de uno redondo (29, 198), usa el redondo y luego corrige la diferencia.",
      "If a number is very close to a round one (29, 198), use the round number and then fix the difference.",
      "Si un nombre est tout près d'un nombre rond (29, 198), utilise le nombre rond puis corrige l'écart.",
    ],
    why: [
      "29 es 30 − 1. Si sumas 30 has sumado 1 de más, así que lo quitas al final. En las restas es al revés: si quitas de más, lo devuelves.",
      "29 is 30 − 1. If you add 30 you've added 1 too many, so you take it off at the end. With subtraction it's the other way round: if you take away too much, give it back.",
      "29, c'est 30 − 1. Si tu ajoutes 30, tu as ajouté 1 de trop : tu l'enlèves à la fin. Pour la soustraction, c'est l'inverse : si tu enlèves trop, tu le rends.",
    ],
    example: make("+", [64, 29]),
    gen(level) {
      const op = pick(["+", "−"]);
      let b;
      if (level === 1) b = rand(1, 4) * 10 - rand(1, 2);
      else if (level === 2) b = rand(2, 9) * 10 + pick([-3, -2, -1, 1, 2]);
      else b = rand(2, 9) * 100 + pick([-4, -3, -2, -1, 1, 2, 3]);
      const top = level === 1 ? 99 : level === 2 ? 199 : 999;
      const a = op === "−" ? rand(b + 11, top + b) : rand(level === 3 ? 150 : 20, top);
      return make(op, [a, b]);
    },
    fits: (p) => !!roundPlan(p),
    steps(p) {
      const { t, o, R, k } = roundPlan(p);
      const m = Math.abs(k);
      const plus = p.op === "+";
      const s = plus ? o + R : o - R;
      const first = k > 0
        ? T(`${f(t)} está muy cerca de ${f(R)}: es ${f(R)} − ${f(m)}.`, `${f(t)} is very close to ${f(R)}: it's ${f(R)} − ${f(m)}.`, `${f(t)} est tout près de ${f(R)} : c'est ${f(R)} − ${f(m)}.`)
        : T(`${f(t)} está muy cerca de ${f(R)}: es ${f(R)} + ${f(m)}.`, `${f(t)} is very close to ${f(R)}: it's ${f(R)} + ${f(m)}.`, `${f(t)} est tout près de ${f(R)} : c'est ${f(R)} + ${f(m)}.`);
      const second = `${f(o)} ${p.op} ${f(R)} = ${f(s)}.`;
      let third;
      if (plus && k > 0) third = T(`Has sumado ${f(m)} de más, así que resta ${f(m)}: ${f(s)} − ${f(m)} = ${f(p.answer)}.`, `You added ${f(m)} too many, so take away ${f(m)}: ${f(s)} − ${f(m)} = ${f(p.answer)}.`, `Tu as ajouté ${f(m)} de trop, donc enlève ${f(m)} : ${f(s)} − ${f(m)} = ${f(p.answer)}.`);
      else if (plus) third = T(`Faltan ${f(m)} por sumar: ${f(s)} + ${f(m)} = ${f(p.answer)}.`, `You still need to add ${f(m)}: ${f(s)} + ${f(m)} = ${f(p.answer)}.`, `Il reste ${f(m)} à ajouter : ${f(s)} + ${f(m)} = ${f(p.answer)}.`);
      else if (k > 0) third = T(`Has quitado ${f(m)} de más, así que suma ${f(m)}: ${f(s)} + ${f(m)} = ${f(p.answer)}.`, `You took away ${f(m)} too many, so add ${f(m)} back: ${f(s)} + ${f(m)} = ${f(p.answer)}.`, `Tu as enlevé ${f(m)} de trop, donc ajoute ${f(m)} : ${f(s)} + ${f(m)} = ${f(p.answer)}.`);
      else third = T(`Faltan ${f(m)} por quitar: ${f(s)} − ${f(m)} = ${f(p.answer)}.`, `You still need to take away ${f(m)}: ${f(s)} − ${f(m)} = ${f(p.answer)}.`, `Il reste ${f(m)} à enlever : ${f(s)} − ${f(m)} = ${f(p.answer)}.`);
      return [first, second, third];
    },
  },
  {
    id: "group", block: 0, icon: "🤝",
    name: ["Agrupar sumandos", "Group the numbers", "Regrouper les nombres"],
    idea: [
      "Cuando sumas varios números, no hace falta ir en orden: junta primero las parejas que dan un número redondo.",
      "When adding several numbers, you don't have to go in order: first pair up the ones that make a round number.",
      "Quand on additionne plusieurs nombres, pas besoin de suivre l'ordre : regroupe d'abord ceux qui font un nombre rond.",
    ],
    why: [
      "En una suma el orden no importa (7 + 3 es lo mismo que 3 + 7), así que puedes elegir las parejas que más te convengan.",
      "In addition the order doesn't matter (7 + 3 is the same as 3 + 7), so you can choose the most convenient pairs.",
      "Dans une addition, l'ordre ne compte pas (7 + 3 = 3 + 7) : tu peux choisir les paires les plus pratiques.",
    ],
    example: make("+", [7, 8, 3, 2]),
    gen(level) {
      if (level === 1) {
        const x = rand(1, 9);
        const y = rand(1, 9);
        return make("+", shuffle([x, 10 - x, y, 10 - y]));
      }
      if (level === 2) {
        const x = randNotRound(11, 89);
        const z = randNotRound(11, 49);
        const w = rand(1, 4) * 10 + (10 - (z % 10));
        return make("+", shuffle([x, 100 - x, z, w]));
      }
      const x = randNotRound(101, 899);
      const total = rand(Math.ceil((x + 50) / 100), 10) * 100;
      const z = randNotRound(101, 499);
      const w = rand(1, 4) * 100 + (100 - (z % 100));
      return make("+", shuffle([x, total - x, z, w]));
    },
    fits: (p) => !!groupPlan(p),
    steps(p) {
      const { pairs, rest } = groupPlan(p);
      const sums = [...pairs.map((q) => q[2]), ...rest];
      return [
        T("Busca parejas que den números redondos:", "Look for pairs that make round numbers:", "Cherche des paires qui font des nombres ronds :"),
        ...pairs.map(([x, y, s]) => `${f(x)} + ${f(y)} = ${f(s)}`),
        T(`Ahora es fácil: ${sums.map(f).join(" + ")} = ${f(p.answer)}.`, `Now it's easy: ${sums.map(f).join(" + ")} = ${f(p.answer)}.`, `Maintenant c'est facile : ${sums.map(f).join(" + ")} = ${f(p.answer)}.`),
      ];
    },
  },
  {
    id: "doubles", block: 0, icon: "👯",
    name: ["Dobles y casi dobles", "Doubles and near doubles", "Doubles et presque doubles"],
    idea: [
      "Si los dos números son iguales o casi, haz el doble del pequeño y suma lo que falta.",
      "If the two numbers are the same or almost, double the smaller one and add what's missing.",
      "Si les deux nombres sont égaux ou presque, double le plus petit et ajoute ce qui manque.",
    ],
    why: [
      "Los dobles se recuerdan muy bien (7 + 7, 25 + 25). 35 + 36 es 35 + 35 más 1.",
      "Doubles are easy to remember (7 + 7, 25 + 25). 35 + 36 is 35 + 35 plus 1.",
      "Les doubles se retiennent très bien (7 + 7, 25 + 25). 35 + 36, c'est 35 + 35 plus 1.",
    ],
    example: make("+", [35, 36]),
    gen(level) {
      const small = level === 1 ? rand(6, 15) : level === 2 ? rand(16, 99) : rand(100, 499);
      const d = level === 1 ? pick([0, 1, 1, 2]) : pick([1, 1, 2]);
      return make("+", shuffle([small, small + d]));
    },
    fits: (p) => twoNums(p, "+") && Math.abs(p.nums[0] - p.nums[1]) <= 2 && Math.min(...p.nums) >= 5,
    steps(p) {
      const small = Math.min(...p.nums);
      const big = Math.max(...p.nums);
      const d = big - small;
      const hint = doubleHint(small);
      if (d === 0) {
        return [
          T(`Es un doble: ${f(small)} + ${f(small)}.`, `It's a double: ${f(small)} + ${f(small)}.`, `C'est un double : ${f(small)} + ${f(small)}.`),
          hint || `${f(small)} + ${f(small)} = ${f(p.answer)}.`,
        ];
      }
      return [
        T(`Piensa en el doble del pequeño: ${f(small)} + ${f(small)}.`, `Think of double the smaller one: ${f(small)} + ${f(small)}.`, `Pense au double du plus petit : ${f(small)} + ${f(small)}.`),
        hint || `${f(small)} + ${f(small)} = ${f(2 * small)}.`,
        T(`${f(big)} es ${f(d)} más, así que suma ${f(d)}: ${f(2 * small)} + ${f(d)} = ${f(p.answer)}.`, `${f(big)} is ${f(d)} more, so add ${f(d)}: ${f(2 * small)} + ${f(d)} = ${f(p.answer)}.`, `${f(big)}, c'est ${f(d)} de plus : ajoute ${f(d)}. ${f(2 * small)} + ${f(d)} = ${f(p.answer)}.`),
      ];
    },
  },
  {
    id: "shift", block: 0, icon: "↔️",
    name: ["Desplazar los dos números de una resta", "Shift both numbers in a subtraction", "Décaler les deux nombres d'une soustraction"],
    idea: [
      "En una resta puedes sumar (o restar) lo mismo a los dos números: elige lo que haga redondo el segundo.",
      "In a subtraction you can add (or take away) the same amount from both numbers: choose the amount that makes the second one round.",
      "Dans une soustraction, tu peux ajouter (ou enlever) la même quantité aux deux nombres : choisis celle qui rend le second rond.",
    ],
    why: [
      "Una resta es la distancia entre dos números. Si mueves los dos lo mismo, la distancia no cambia: como dos personas que caminan juntas.",
      "A subtraction is the distance between two numbers. If you move both by the same amount, the distance stays the same: like two people walking together.",
      "Une soustraction, c'est la distance entre deux nombres. Si on décale les deux de la même quantité, la distance ne change pas : comme deux personnes qui marchent ensemble.",
    ],
    example: make("−", [82, 38]),
    gen(level) {
      if (level === 1) {
        const b = rand(1, 7) * 10 + rand(7, 9);
        return make("−", [rand(b + 11, 99), b]);
      }
      if (level === 2) {
        const b = rand(2, 9) * 10 + pick([7, 8, 9, 1, 2]);
        return make("−", [rand(101, 299), b]);
      }
      const b = rand(1, 8) * 100 + pick([-3, -2, -1, 1, 2, 3]);
      return make("−", [rand(b + 50, b + 900), b]);
    },
    fits: (p) => !!shiftPlan(p),
    steps(p) {
      const { a, b, R, k } = shiftPlan(p);
      const m = Math.abs(k);
      const a2 = a + k;
      const op = k > 0 ? "+" : "−";
      return [
        k > 0
          ? T(`Suma ${f(m)} a los dos números para que el segundo quede redondo:`, `Add ${f(m)} to both numbers so the second one is round:`, `Ajoute ${f(m)} aux deux nombres pour que le second soit rond :`)
          : T(`Resta ${f(m)} a los dos números para que el segundo quede redondo:`, `Take ${f(m)} from both numbers so the second one is round:`, `Enlève ${f(m)} aux deux nombres pour que le second soit rond :`),
        `${f(a)} ${op} ${f(m)} = ${f(a2)}   ·   ${f(b)} ${op} ${f(m)} = ${f(R)}`,
        `${f(a2)} − ${f(R)} = ${f(p.answer)}.`,
      ];
    },
  },

  // ===== Bloque 2: multiplicar =====
  {
    id: "double-up", block: 1, icon: "✌️",
    name: ["Multiplicar por 4 y por 8 doblando", "Times 4 and 8 by doubling", "Multiplier par 4 et 8 en doublant"],
    idea: [
      "Multiplicar por 4 es doblar dos veces. Por 8, doblar tres veces.",
      "Multiplying by 4 means doubling twice. By 8, doubling three times.",
      "Multiplier par 4, c'est doubler deux fois. Par 8, doubler trois fois.",
    ],
    why: [
      "4 = 2 × 2 y 8 = 2 × 2 × 2. Doblar es fácil y así nunca tienes que hacer una multiplicación difícil.",
      "4 = 2 × 2 and 8 = 2 × 2 × 2. Doubling is easy, so you never need a hard multiplication.",
      "4 = 2 × 2 et 8 = 2 × 2 × 2. Doubler est facile : plus besoin de multiplication difficile.",
    ],
    example: make("×", [37, 4]),
    gen(level) {
      if (level === 1) return make("×", shuffle([4, rand(12, 49)]));
      if (level === 2) return make("×", shuffle(pick([[4, rand(51, 250)], [8, rand(12, 40)]])));
      return make("×", shuffle(pick([[8, rand(41, 250)], [16, rand(12, 40)]])));
    },
    fits: (p) => !!factorWith(p, (k, m) => [4, 8, 16].includes(k) && m >= 11),
    steps(p) {
      const { k, m } = factorWith(p, (k2, m2) => [4, 8, 16].includes(k2) && m2 >= 11);
      const times = Math.log2(k);
      const chain = [m];
      for (let i = 0; i < times; i++) chain.push(chain[i] * 2);
      return [
        T(`Multiplicar por ${f(k)} es doblar ${times} veces.`, `Multiplying by ${f(k)} means doubling ${times} times.`, `Multiplier par ${f(k)}, c'est doubler ${times} fois.`),
        doubleHint(m) || `${f(m)} + ${f(m)} = ${f(2 * m)}.`,
        `${chain.map(f).join(" → ")}`,
      ];
    },
  },
  {
    id: "times5", block: 1, icon: "🖐️",
    name: ["Multiplicar por 5", "Times 5", "Multiplier par 5"],
    idea: [
      "Para multiplicar por 5, multiplica por 10 y haz la mitad. Por 50: por 100 y la mitad.",
      "To multiply by 5, multiply by 10 and halve it. For 50: by 100 and halve it.",
      "Pour multiplier par 5, multiplie par 10 et prends la moitié. Pour 50 : par 100 et la moitié.",
    ],
    why: [
      "5 es la mitad de 10. Multiplicar por 10 solo es añadir un cero, y la mitad es fácil.",
      "5 is half of 10. Multiplying by 10 is just adding a zero, and halving is easy.",
      "5, c'est la moitié de 10. Multiplier par 10, c'est juste ajouter un zéro, et la moitié est facile.",
    ],
    example: make("×", [46, 5]),
    gen(level) {
      if (level === 1) return make("×", shuffle([5, rand(12, 48)]));
      if (level === 2) return make("×", shuffle(pick([[5, rand(51, 199)], [50, rand(12, 60)]])));
      return make("×", shuffle(pick([[5, rand(201, 999)], [50, rand(61, 199)]])));
    },
    fits: (p) => !!factorWith(p, (k, m) => (k === 5 || k === 50) && m >= 11),
    steps(p) {
      const { k, m } = factorWith(p, (k2, m2) => (k2 === 5 || k2 === 50) && m2 >= 11);
      const ten = k === 5 ? 10 : 100;
      return [
        T(`${f(k)} es la mitad de ${f(ten)}.`, `${f(k)} is half of ${f(ten)}.`, `${f(k)}, c'est la moitié de ${f(ten)}.`),
        `${f(m)} × ${f(ten)} = ${f(m * ten)}.`,
        T(`La mitad de ${f(m * ten)} es ${f(p.answer)}.`, `Half of ${f(m * ten)} is ${f(p.answer)}.`, `La moitié de ${f(m * ten)}, c'est ${f(p.answer)}.`),
      ];
    },
  },
  {
    id: "split", block: 1, icon: "🧩",
    name: ["Descomponer en decenas y unidades", "Split into tens and units", "Décomposer en dizaines et unités"],
    idea: [
      "Parte el número grande en trozos redondos (40 + 3), multiplica cada trozo y suma.",
      "Split the bigger number into round pieces (40 + 3), multiply each piece and add them up.",
      "Découpe le grand nombre en morceaux ronds (40 + 3), multiplie chaque morceau et additionne.",
    ],
    why: [
      "7 × 43 son 43 grupos de 7… o 40 grupos más 3 grupos. Multiplicar por números redondos es fácil.",
      "7 × 43 is 43 groups of 7… or 40 groups plus 3 groups. Multiplying by round numbers is easy.",
      "7 × 43, c'est 43 groupes de 7… ou 40 groupes plus 3 groupes. Multiplier par des nombres ronds est facile.",
    ],
    example: make("×", [7, 43]),
    gen(level) {
      if (level === 1) return make("×", shuffle([rand(3, 6), randNotRound(12, 29)]));
      if (level === 2) return make("×", shuffle([rand(6, 9), randNotRound(31, 98)]));
      return make("×", shuffle([rand(6, 9), randNotRound(102, 499)]));
    },
    fits: (p) => !!factorWith(p, (k, m) => k >= 2 && k <= 9 && m >= 11 && m % 10 !== 0),
    steps(p) {
      const { k, m } = factorWith(p, (k2, m2) => k2 >= 2 && k2 <= 9 && m2 >= 11 && m2 % 10 !== 0);
      const parts = placeParts(m);
      const prods = parts.map((x) => k * x);
      return [
        T(`Parte ${f(m)} en ${parts.map(f).join(" + ")}.`, `Split ${f(m)} into ${parts.map(f).join(" + ")}.`, `Découpe ${f(m)} en ${parts.map(f).join(" + ")}.`),
        parts.map((x) => `${f(k)} × ${f(x)} = ${f(k * x)}`).join("   ·   "),
        T(`Suma: ${prods.map(f).join(" + ")} = ${f(p.answer)}.`, `Add: ${prods.map(f).join(" + ")} = ${f(p.answer)}.`, `Additionne : ${prods.map(f).join(" + ")} = ${f(p.answer)}.`),
      ];
    },
  },
  {
    id: "halve-double", block: 1, icon: "⚖️",
    name: ["La mitad de uno, el doble del otro", "Halve one, double the other", "La moitié de l'un, le double de l'autre"],
    idea: [
      "Si un número es par y el otro acaba en 5, haz la mitad del par y el doble del otro hasta que salga algo redondo.",
      "If one number is even and the other ends in 5, halve the even one and double the other until you get something round.",
      "Si un nombre est pair et l'autre finit par 5, prends la moitié du pair et le double de l'autre jusqu'à obtenir un nombre rond.",
    ],
    why: [
      "Si un rectángulo es la mitad de ancho y el doble de largo, su área es la misma. 16 × 25 = 8 × 50 = 4 × 100.",
      "If a rectangle is half as wide and twice as long, its area stays the same. 16 × 25 = 8 × 50 = 4 × 100.",
      "Si un rectangle est deux fois moins large et deux fois plus long, son aire ne change pas. 16 × 25 = 8 × 50 = 4 × 100.",
    ],
    example: make("×", [16, 25]),
    gen(level) {
      if (level === 1) return make("×", shuffle([pick([4, 6, 8, 12, 14, 16, 18]), pick([15, 25, 35, 45])]));
      if (level === 2) return make("×", shuffle([rand(6, 24) * 2, pick([15, 25, 35, 45, 55, 75])]));
      return make("×", shuffle([rand(8, 44) * 2, pick([15, 25, 35, 45, 65, 75, 125])]));
    },
    fits: (p) => !!factorWith(p, (k, m) => k % 10 === 5 && k >= 15 && m % 2 === 0 && m >= 4),
    steps(p) {
      const { k: o, m: e } = factorWith(p, (k2, m2) => k2 % 10 === 5 && k2 >= 15 && m2 % 2 === 0 && m2 >= 4);
      const chain = halveDoubleChain(e, o);
      const [le, lo] = chain[chain.length - 1];
      return [
        T("Haz la mitad del par y el doble del otro: el resultado no cambia.", "Halve the even one and double the other: the result doesn't change.", "Prends la moitié du pair et le double de l'autre : le résultat ne change pas."),
        chain.map(([x, y]) => `${f(x)} × ${f(y)}`).join(" → "),
        [`${f(le)} × ${f(lo)} = ${f(p.answer)}.`, zerosHint(le, lo)].filter(Boolean).join(" "),
      ];
    },
  },
  {
    id: "near-round", block: 1, icon: "🪄",
    name: ["Multiplicar por 9, 19, 99… compensando", "Times 9, 19, 99… and compensate", "Multiplier par 9, 19, 99… en compensant"],
    idea: [
      "9 es 10 − 1. Multiplica por 10 y quita una vez el número. Igual con 19 (20 − 1), 99 (100 − 1) o 21 (20 + 1).",
      "9 is 10 − 1. Multiply by 10 and take the number away once. Same with 19 (20 − 1), 99 (100 − 1) or 21 (20 + 1).",
      "9, c'est 10 − 1. Multiplie par 10 et enlève le nombre une fois. Pareil avec 19 (20 − 1), 99 (100 − 1) ou 21 (20 + 1).",
    ],
    why: [
      "9 × 37 son 37 nueves, que es lo mismo que 37 dieces menos 37 unos.",
      "9 × 37 is 37 nines, which is the same as 37 tens minus 37 ones.",
      "9 × 37, c'est 37 fois 9, soit 37 dizaines moins 37 unités.",
    ],
    example: make("×", [9, 37]),
    gen(level) {
      if (level === 1) return make("×", shuffle([9, rand(12, 30)]));
      if (level === 2) return make("×", shuffle(pick([[9, rand(31, 99)], [19, rand(3, 9)], [29, rand(3, 9)], [21, rand(3, 9)]])));
      return make("×", shuffle(pick([[99, rand(12, 99)], [49, rand(4, 20)], [999, rand(12, 99)], [101, rand(12, 99)]])));
    },
    fits: (p) => !!factorWith(p, (k, m) => k >= 9 && (k % 10 === 9 || (k % 10 === 1 && k >= 21)) && m >= 2),
    steps(p) {
      const { k, m } = factorWith(p, (k2, m2) => k2 >= 9 && (k2 % 10 === 9 || (k2 % 10 === 1 && k2 >= 21)) && m2 >= 2);
      const R = k % 10 === 9 ? k + 1 : k - 1;
      const minus = k % 10 === 9;
      return [
        `${f(k)} = ${f(R)} ${minus ? "−" : "+"} 1.`,
        `${f(m)} × ${f(R)} = ${f(m * R)}.`,
        minus
          ? T(`Quita una vez ${f(m)}: ${f(m * R)} − ${f(m)} = ${f(p.answer)}.`, `Take ${f(m)} away once: ${f(m * R)} − ${f(m)} = ${f(p.answer)}.`, `Enlève ${f(m)} une fois : ${f(m * R)} − ${f(m)} = ${f(p.answer)}.`)
          : T(`Añade una vez ${f(m)}: ${f(m * R)} + ${f(m)} = ${f(p.answer)}.`, `Add ${f(m)} once: ${f(m * R)} + ${f(m)} = ${f(p.answer)}.`, `Ajoute ${f(m)} une fois : ${f(m * R)} + ${f(m)} = ${f(p.answer)}.`),
      ];
    },
  },

  // ===== Bloque 3: más multiplicación y división =====
  {
    id: "times11", block: 2, icon: "🪞",
    name: ["Multiplicar por 11", "Times 11", "Multiplier par 11"],
    idea: [
      "Con un número de dos cifras: sepáralas y pon en medio su suma. 43 × 11 → 4 (4+3) 3 = 473.",
      "With a two-digit number: pull the digits apart and put their sum in the middle. 43 × 11 → 4 (4+3) 3 = 473.",
      "Avec un nombre à deux chiffres : écarte les chiffres et mets leur somme au milieu. 43 × 11 → 4 (4+3) 3 = 473.",
    ],
    why: [
      "× 11 es × 10 más una vez el número: 430 + 43. Al sumarlos, las cifras se juntan en el centro. Si la suma pasa de 9, se lleva 1.",
      "× 11 is × 10 plus the number once: 430 + 43. When you add them, the digits meet in the middle. If the sum is over 9, carry 1.",
      "× 11, c'est × 10 plus le nombre une fois : 430 + 43. En les additionnant, les chiffres se rejoignent au milieu. Si la somme dépasse 9, on retient 1.",
    ],
    example: make("×", [43, 11]),
    gen(level) {
      if (level === 1) {
        const d1 = rand(1, 8);
        return make("×", shuffle([11, d1 * 10 + rand(1, 9 - d1)]));
      }
      if (level === 2) return make("×", shuffle([11, rand(12, 99)]));
      return make("×", shuffle([11, pick([rand(56, 99), randNotRound(101, 999)])]));
    },
    fits: (p) => !!factorWith(p, (k, m) => k === 11 && m >= 10),
    steps(p) {
      const { m } = factorWith(p, (k2, m2) => k2 === 11 && m2 >= 10);
      if (m >= 100) {
        return [
          T("× 11 es × 10 más una vez el número.", "× 11 is × 10 plus the number once.", "× 11, c'est × 10 plus le nombre une fois."),
          `${f(m)} × 10 = ${f(m * 10)}.`,
          `${f(m * 10)} + ${f(m)} = ${f(p.answer)}.`,
        ];
      }
      const d1 = Math.floor(m / 10);
      const d2 = m % 10;
      const s = d1 + d2;
      return [
        T(`Separa las cifras de ${f(m)}: ${d1} _ ${d2}.`, `Pull apart the digits of ${f(m)}: ${d1} _ ${d2}.`, `Écarte les chiffres de ${f(m)} : ${d1} _ ${d2}.`),
        T(`En medio va su suma: ${d1} + ${d2} = ${s}.`, `Their sum goes in the middle: ${d1} + ${d2} = ${s}.`, `Au milieu, leur somme : ${d1} + ${d2} = ${s}.`),
        s < 10
          ? T(`Queda ${f(p.answer)}.`, `That gives ${f(p.answer)}.`, `Ça donne ${f(p.answer)}.`)
          : T(`Como ${s} tiene dos cifras, deja el ${s % 10} y suma 1 al ${d1}: ${f(p.answer)}.`, `As ${s} has two digits, keep the ${s % 10} and add 1 to the ${d1}: ${f(p.answer)}.`, `Comme ${s} a deux chiffres, garde le ${s % 10} et ajoute 1 au ${d1} : ${f(p.answer)}.`),
      ];
    },
  },
  {
    id: "div5", block: 2, icon: "✂️",
    name: ["Dividir entre 5", "Dividing by 5", "Diviser par 5"],
    idea: [
      "Para dividir entre 5, haz el doble y divide entre 10. Entre 50: el doble y entre 100.",
      "To divide by 5, double it and divide by 10. By 50: double it and divide by 100.",
      "Pour diviser par 5, double et divise par 10. Par 50 : double et divise par 100.",
    ],
    why: [
      "En cada 10 caben dos cincos. Por eso, contar cincos es lo mismo que contar dieces y doblarlos.",
      "Every 10 holds two fives. So counting fives is the same as counting tens and doubling.",
      "Dans chaque 10, il y a deux 5. Compter les 5 revient donc à compter les 10 et à doubler.",
    ],
    example: make("÷", [340, 5]),
    gen(level) {
      if (level === 1) return make("÷", [5 * rand(11, 30), 5]);
      if (level === 2) return make("÷", [5 * rand(31, 199), 5]);
      return pick([make("÷", [5 * rand(200, 999), 5]), make("÷", [50 * rand(11, 99), 50])]);
    },
    fits: (p) => twoNums(p, "÷") && (p.nums[1] === 5 || p.nums[1] === 50) && p.nums[0] >= 50,
    steps(p) {
      const [n, d] = p.nums;
      const ten = d === 5 ? 10 : 100;
      return [
        T(`Dividir entre ${f(d)} es doblar y dividir entre ${f(ten)}.`, `Dividing by ${f(d)} means doubling and dividing by ${f(ten)}.`, `Diviser par ${f(d)}, c'est doubler et diviser par ${f(ten)}.`),
        `${f(n)} × 2 = ${f(2 * n)}.`,
        `${f(2 * n)} ÷ ${f(ten)} = ${f(p.answer)}.`,
      ];
    },
  },
  {
    id: "halves", block: 2, icon: "🍰",
    name: ["Dividir entre 4 y 8 haciendo mitades", "Dividing by 4 and 8 by halving", "Diviser par 4 et 8 en prenant des moitiés"],
    idea: [
      "Dividir entre 4 es hacer la mitad dos veces. Entre 8, tres veces.",
      "Dividing by 4 means halving twice. By 8, three times.",
      "Diviser par 4, c'est prendre la moitié deux fois. Par 8, trois fois.",
    ],
    why: [
      "Repartir entre 4 es repartir entre 2, y cada mitad otra vez entre 2.",
      "Sharing between 4 is sharing between 2, then sharing each half between 2 again.",
      "Partager entre 4, c'est partager entre 2, puis chaque moitié encore entre 2.",
    ],
    example: make("÷", [168, 4]),
    gen(level) {
      if (level === 1) return make("÷", [4 * rand(11, 40), 4]);
      if (level === 2) return pick([make("÷", [4 * rand(41, 250), 4]), make("÷", [8 * rand(11, 40), 8])]);
      return pick([make("÷", [8 * rand(41, 250), 8]), make("÷", [16 * rand(11, 60), 16])]);
    },
    fits: (p) => twoNums(p, "÷") && [4, 8, 16].includes(p.nums[1]) && p.nums[0] >= 40,
    steps(p) {
      const [n, d] = p.nums;
      const times = Math.log2(d);
      const chain = [n];
      for (let i = 0; i < times; i++) chain.push(chain[i] / 2);
      return [
        T(`Dividir entre ${f(d)} es hacer la mitad ${times} veces.`, `Dividing by ${f(d)} means halving ${times} times.`, `Diviser par ${f(d)}, c'est prendre la moitié ${times} fois.`),
        chain.map(f).join(" → "),
      ];
    },
  },
  {
    id: "share", block: 2, icon: "🍫",
    name: ["Repartir por partes", "Divide in parts", "Diviser en morceaux"],
    idea: [
      "Parte el número en un trozo fácil de dividir (10 veces, 20 veces el divisor…) y lo que sobra. Divide cada trozo y suma.",
      "Split the number into an easy chunk (10 times, 20 times the divisor…) and the rest. Divide each chunk and add.",
      "Découpe le nombre en un morceau facile à diviser (10 fois, 20 fois le diviseur…) et le reste. Divise chaque morceau et additionne.",
    ],
    why: [
      "Repartir 156 caramelos entre 6 es repartir primero 120 (20 a cada uno) y luego los 36 que quedan (6 más).",
      "Sharing 156 sweets among 6 is sharing 120 first (20 each), then the 36 left over (6 more each).",
      "Partager 156 bonbons entre 6, c'est d'abord en partager 120 (20 chacun), puis les 36 restants (6 de plus).",
    ],
    example: make("÷", [156, 6]),
    gen(level) {
      if (level === 1) { const d = rand(3, 6); return make("÷", [d * randNotRound(11, 19), d]); }
      if (level === 2) { const d = rand(3, 9); return make("÷", [d * randNotRound(12, 49), d]); }
      const d = pick([6, 7, 8, 9, 12]);
      return make("÷", [d * randNotRound(21, 99), d]);
    },
    fits: (p) => twoNums(p, "÷") && p.nums[1] >= 3 && p.nums[1] <= 12 && p.answer >= 11 && p.answer % 10 !== 0,
    steps(p) {
      const [n, d] = p.nums;
      const t = Math.floor(p.answer / 10) * 10;
      const r = p.answer - t;
      return [
        T(`Busca un trozo fácil: ${f(d)} × ${f(t)} = ${f(d * t)}.`, `Find an easy chunk: ${f(d)} × ${f(t)} = ${f(d * t)}.`, `Cherche un morceau facile : ${f(d)} × ${f(t)} = ${f(d * t)}.`),
        `${f(n)} = ${f(d * t)} + ${f(d * r)}.`,
        `${f(d * t)} ÷ ${f(d)} = ${f(t)}   ·   ${f(d * r)} ÷ ${f(d)} = ${f(r)}`,
        `${f(t)} + ${f(r)} = ${f(p.answer)}.`,
      ];
    },
  },
  {
    id: "quarters", block: 2, icon: "🪙",
    name: ["Multiplicar y dividir por 25", "Times and divided by 25", "Multiplier et diviser par 25"],
    idea: [
      "25 es la cuarta parte de 100. Por 25: multiplica por 100 y divide entre 4. Entre 25: multiplica por 4 y divide entre 100.",
      "25 is a quarter of 100. Times 25: multiply by 100 and divide by 4. Divided by 25: multiply by 4 and divide by 100.",
      "25, c'est le quart de 100. Fois 25 : multiplie par 100 et divise par 4. Divisé par 25 : multiplie par 4 et divise par 100.",
    ],
    why: [
      "Como con las monedas: 4 monedas de 25 céntimos hacen un euro.",
      "Like coins: four 25-cent coins make one euro (or one dollar).",
      "Comme avec les pièces : 4 pièces de 25 centimes font un euro.",
    ],
    example: make("×", [36, 25]),
    gen(level) {
      const [mul, div] = level === 1 ? [[4, 24], [3, 20]] : level === 2 ? [[25, 99], [21, 80]] : [[101, 400], [81, 400]];
      return pick([make("×", shuffle([25, rand(...mul)])), make("÷", [25 * rand(...div), 25])]);
    },
    fits: (p) => !!factorWith(p, (k, m) => k === 25 && m >= 3) || (twoNums(p, "÷") && p.nums[1] === 25),
    steps(p) {
      if (p.op === "÷") {
        const [n] = p.nums;
        return [
          T("Dividir entre 25 es multiplicar por 4 y dividir entre 100.", "Dividing by 25 means multiplying by 4 and dividing by 100.", "Diviser par 25, c'est multiplier par 4 et diviser par 100."),
          `${f(n)} × 4 = ${f(4 * n)}.`,
          `${f(4 * n)} ÷ 100 = ${f(p.answer)}.`,
        ];
      }
      const { m } = factorWith(p, (k2, m2) => k2 === 25 && m2 >= 3);
      return [
        T("25 es 100 ÷ 4.", "25 is 100 ÷ 4.", "25, c'est 100 ÷ 4."),
        `${f(m)} × 100 = ${f(m * 100)}.`,
        T(`Entre 4 (mitad y otra mitad): ${f(m * 100)} → ${f(m * 50)} → ${f(p.answer)}.`, `Divide by 4 (half, then half again): ${f(m * 100)} → ${f(m * 50)} → ${f(p.answer)}.`, `Divise par 4 (moitié, puis encore moitié) : ${f(m * 100)} → ${f(m * 50)} → ${f(p.answer)}.`),
      ];
    },
  },

  // ===== Bloque 4: trucos para multiplicar y dividir más rápido =====
  {
    id: "square5", block: 3, icon: "5️⃣",
    name: ["Cuadrados que acaban en 5", "Squaring numbers ending in 5", "Carrés des nombres finissant par 5"],
    idea: [
      "Para 35 × 35: quita el 5, multiplica lo que queda por el siguiente (3 × 4 = 12) y pon 25 detrás: 1225.",
      "For 35 × 35: drop the 5, multiply what's left by the next number (3 × 4 = 12) and put 25 after it: 1,225.",
      "Pour 35 × 35 : enlève le 5, multiplie ce qui reste par le suivant (3 × 4 = 12) et écris 25 derrière : 1 225.",
    ],
    why: [
      "35 × 35 = (30 + 5) × (30 + 5) = 30 × 40 + 25. Siempre sale «decenas por la siguiente» y 25 al final.",
      "35 × 35 = (30 + 5) × (30 + 5) = 30 × 40 + 25. It's always “tens times the next one” with 25 at the end.",
      "35 × 35 = (30 + 5) × (30 + 5) = 30 × 40 + 25. On obtient toujours « dizaines fois la suivante » et 25 à la fin.",
    ],
    example: make("×", [35, 35]),
    gen(level) {
      const t = level === 1 ? rand(1, 4) : level === 2 ? rand(5, 9) : rand(10, 19);
      return make("×", [t * 10 + 5, t * 10 + 5]);
    },
    fits: (p) => twoNums(p, "×") && p.nums[0] === p.nums[1] && p.nums[0] % 10 === 5,
    steps(p) {
      const t = (p.nums[0] - 5) / 10;
      return [
        T(`Quita el 5: queda ${f(t)}.`, `Drop the 5: that leaves ${f(t)}.`, `Enlève le 5 : il reste ${f(t)}.`),
        T(`Por el siguiente: ${f(t)} × ${f(t + 1)} = ${f(t * (t + 1))}.`, `Times the next number: ${f(t)} × ${f(t + 1)} = ${f(t * (t + 1))}.`, `Fois le suivant : ${f(t)} × ${f(t + 1)} = ${f(t * (t + 1))}.`),
        T(`Pon 25 detrás: ${f(p.answer)}.`, `Put 25 after it: ${f(p.answer)}.`, `Écris 25 derrière : ${f(p.answer)}.`),
      ];
    },
  },
  {
    id: "same-tens", block: 3, icon: "🔗",
    name: ["Mismas decenas, unidades que suman 10", "Same tens, units adding to 10", "Mêmes dizaines, unités qui font 10"],
    idea: [
      "En 23 × 27 las decenas son iguales y 3 + 7 = 10. Multiplica 2 × 3 = 6, luego 3 × 7 = 21, y júntalos: 621.",
      "In 23 × 27 the tens are the same and 3 + 7 = 10. Multiply 2 × 3 = 6, then 3 × 7 = 21, and put them together: 621.",
      "Dans 23 × 27, les dizaines sont égales et 3 + 7 = 10. Multiplie 2 × 3 = 6, puis 3 × 7 = 21, et colle-les : 621.",
    ],
    why: [
      "Es el mismo truco que el de los cuadrados acabados en 5: las unidades que suman 10 completan una decena más.",
      "It's the same trick as squaring numbers ending in 5: units that add up to 10 make one extra ten.",
      "C'est la même astuce que pour les carrés finissant par 5 : les unités qui font 10 complètent une dizaine de plus.",
    ],
    example: make("×", [23, 27]),
    gen(level) {
      const t = level === 1 ? rand(1, 4) : level === 2 ? rand(5, 9) : rand(10, 19);
      const u = pick([1, 2, 3, 4, 6, 7, 8, 9]);
      return make("×", [t * 10 + u, t * 10 + 10 - u]);
    },
    fits: (p) => twoNums(p, "×") && p.nums[0] !== p.nums[1] && p.nums[0] % 10 !== 0 && p.nums[1] % 10 !== 0
      && Math.floor(p.nums[0] / 10) === Math.floor(p.nums[1] / 10) && (p.nums[0] % 10) + (p.nums[1] % 10) === 10,
    steps(p) {
      const t = Math.floor(p.nums[0] / 10);
      const [u1, u2] = p.nums.map((n) => n % 10);
      const u = String(u1 * u2).padStart(2, "0");
      return [
        T(`Las dos empiezan por ${f(t)} y ${u1} + ${u2} = 10.`, `Both start with ${f(t)} and ${u1} + ${u2} = 10.`, `Les deux commencent par ${f(t)} et ${u1} + ${u2} = 10.`),
        `${f(t)} × ${f(t + 1)} = ${f(t * (t + 1))}.`,
        T(`${u1} × ${u2} = ${u} (siempre con dos cifras).`, `${u1} × ${u2} = ${u} (always two digits).`, `${u1} × ${u2} = ${u} (toujours deux chiffres).`),
        T(`Júntalos: ${f(p.answer)}.`, `Put them together: ${f(p.answer)}.`, `Colle-les : ${f(p.answer)}.`),
      ];
    },
  },
  {
    id: "around", block: 3, icon: "🎪",
    name: ["Alrededor de un número redondo", "Either side of a round number", "Autour d'un nombre rond"],
    idea: [
      "19 × 21 están a 1 de 20, uno por debajo y otro por encima: 20 × 20 = 400, menos 1 × 1 = 399.",
      "19 × 21 are 1 away from 20, one below and one above: 20 × 20 = 400, minus 1 × 1 = 399.",
      "19 × 21 sont à 1 de 20, l'un en dessous, l'autre au-dessus : 20 × 20 = 400, moins 1 × 1 = 399.",
    ],
    why: [
      "(20 − 1) × (20 + 1) = 20 × 20 − 1 × 1. Lo que ganas por un lado casi lo pierdes por el otro; solo sobra el cuadrado de la distancia.",
      "(20 − 1) × (20 + 1) = 20 × 20 − 1 × 1. What you gain on one side you almost lose on the other; only the distance squared is left.",
      "(20 − 1) × (20 + 1) = 20 × 20 − 1 × 1. Ce qu'on gagne d'un côté, on le perd presque de l'autre ; il ne reste que le carré de l'écart.",
    ],
    example: make("×", [19, 21]),
    gen(level) {
      const R = level === 1 ? pick([10, 20, 30]) : level === 2 ? rand(2, 9) * 10 : pick([40, 50, 60, 70, 80, 90, 100, 110, 200]);
      const d = level === 1 ? rand(1, 3) : level === 2 ? rand(1, 6) : rand(1, 9);
      return make("×", shuffle([R - d, R + d]));
    },
    fits(p) {
      if (!twoNums(p, "×") || p.nums[0] === p.nums[1]) return false;
      const sum = p.nums[0] + p.nums[1];
      const d = Math.abs(p.nums[0] - p.nums[1]) / 2;
      return sum % 2 === 0 && (sum / 2) % 10 === 0 && d <= 9;
    },
    steps(p) {
      const R = (p.nums[0] + p.nums[1]) / 2;
      const d = Math.abs(p.nums[0] - p.nums[1]) / 2;
      return [
        T(`${f(p.nums[0])} y ${f(p.nums[1])} están a ${f(d)} de ${f(R)}, uno por debajo y otro por encima.`, `${f(p.nums[0])} and ${f(p.nums[1])} are ${f(d)} away from ${f(R)}, one below and one above.`, `${f(p.nums[0])} et ${f(p.nums[1])} sont à ${f(d)} de ${f(R)}, l'un en dessous, l'autre au-dessus.`),
        `${f(R)} × ${f(R)} = ${f(R * R)}   ·   ${f(d)} × ${f(d)} = ${f(d * d)}`,
        `${f(R * R)} − ${f(d * d)} = ${f(p.answer)}.`,
      ];
    },
  },
  {
    id: "near100", block: 3, icon: "💯",
    name: ["Cerca de 100", "Close to 100", "Près de 100"],
    idea: [
      "Para 97 × 96: les faltan 3 y 4 para 100. Las centenas son 97 − 4 = 93; el final, 3 × 4 = 12. Resultado: 9312.",
      "For 97 × 96: they're 3 and 4 short of 100. The hundreds are 97 − 4 = 93; the end is 3 × 4 = 12. Result: 9,312.",
      "Pour 97 × 96 : il leur manque 3 et 4 pour faire 100. Les centaines : 97 − 4 = 93 ; la fin : 3 × 4 = 12. Résultat : 9 312.",
    ],
    why: [
      "(100 − 3) × (100 − 4) = 100 × (100 − 3 − 4) + 3 × 4. Funciona igual por encima de 100, sumando en vez de restar.",
      "(100 − 3) × (100 − 4) = 100 × (100 − 3 − 4) + 3 × 4. It works the same above 100, adding instead of subtracting.",
      "(100 − 3) × (100 − 4) = 100 × (100 − 3 − 4) + 3 × 4. Ça marche pareil au-dessus de 100, en ajoutant au lieu d'enlever.",
    ],
    example: make("×", [97, 96]),
    gen(level) {
      if (level === 1) return make("×", [rand(95, 99), rand(95, 99)]);
      if (level === 2) return make("×", [rand(88, 99), rand(88, 99)]);
      return pick([make("×", [rand(85, 99), rand(85, 99)]), make("×", [rand(101, 112), rand(101, 112)])]);
    },
    fits: (p) => twoNums(p, "×") && p.nums.every((n) => n >= 85 && n <= 99 || n >= 101 && n <= 115)
      && (p.nums[0] < 100) === (p.nums[1] < 100),
    steps(p) {
      const [a, b] = p.nums;
      const below = a < 100;
      const da = Math.abs(100 - a);
      const db = Math.abs(100 - b);
      const head = below ? a - db : a + db;
      return [
        below
          ? T(`A ${f(a)} le ${da === 1 ? "falta" : "faltan"} ${da} para 100, y a ${f(b)}, ${db}.`, `${f(a)} is ${da} short of 100, and ${f(b)} is ${db} short.`, `Il manque ${da} à ${f(a)} pour faire 100, et ${db} à ${f(b)}.`)
          : T(`${f(a)} pasa de 100 en ${da}, y ${f(b)} en ${db}.`, `${f(a)} is ${da} over 100, and ${f(b)} is ${db} over.`, `${f(a)} dépasse 100 de ${da}, et ${f(b)} de ${db}.`),
        T(`Centenas: ${f(a)} ${below ? "−" : "+"} ${db} = ${f(head)} → ${f(head * 100)}.`, `Hundreds: ${f(a)} ${below ? "−" : "+"} ${db} = ${f(head)} → ${f(head * 100)}.`, `Centaines : ${f(a)} ${below ? "−" : "+"} ${db} = ${f(head)} → ${f(head * 100)}.`),
        `${da} × ${db} = ${f(da * db)}.`,
        `${f(head * 100)} + ${f(da * db)} = ${f(p.answer)}.`,
      ];
    },
  },
  {
    id: "split-divisor", block: 3, icon: "🪜",
    name: ["Dividir por partes del divisor", "Divide in steps", "Diviser en plusieurs étapes"],
    idea: [
      "Si el divisor es 12 = 2 × 6, divide primero entre 2 y luego entre 6. Lo mismo con 15 (3 × 5), 18 (2 × 9) o 24 (4 × 6).",
      "If the divisor is 12 = 2 × 6, divide by 2 first and then by 6. Same with 15 (3 × 5), 18 (2 × 9) or 24 (4 × 6).",
      "Si le diviseur est 12 = 2 × 6, divise d'abord par 2, puis par 6. Pareil avec 15 (3 × 5), 18 (2 × 9) ou 24 (4 × 6).",
    ],
    why: [
      "Repartir entre 12 personas es como repartir entre 2 grupos y luego, dentro de cada grupo, entre 6.",
      "Sharing among 12 people is like sharing between 2 groups and then, within each group, among 6.",
      "Partager entre 12 personnes, c'est partager entre 2 groupes puis, dans chaque groupe, entre 6.",
    ],
    example: make("÷", [96, 12]),
    gen(level) {
      if (level === 1) return make("÷", [12 * rand(4, 15), 12]);
      if (level === 2) { const d = pick([12, 14, 15, 18]); return make("÷", [d * rand(6, 30), d]); }
      const d = pick([16, 24, 36, 45, 48]);
      return make("÷", [d * rand(12, 60), d]);
    },
    fits: (p) => twoNums(p, "÷") && p.nums[1] in DIVISOR_FACTORS,
    steps(p) {
      const [n, d] = p.nums;
      const [f1, f2] = DIVISOR_FACTORS[d];
      return [
        T(`${f(d)} = ${f1} × ${f2}: divide entre ${f1} y luego entre ${f2}.`, `${f(d)} = ${f1} × ${f2}: divide by ${f1}, then by ${f2}.`, `${f(d)} = ${f1} × ${f2} : divise par ${f1}, puis par ${f2}.`),
        `${f(n)} ÷ ${f1} = ${f(n / f1)}.`,
        `${f(n / f1)} ÷ ${f2} = ${f(p.answer)}.`,
      ];
    },
  },
];

const BLOCKS = [
  { icon: "➕", name: ["Sumas y restas", "Adding and subtracting", "Additions et soustractions"] },
  { icon: "✖️", name: ["Multiplicar", "Multiplying", "Multiplier"] },
  { icon: "➗", name: ["Más multiplicación y división", "More multiplying and dividing", "Encore multiplier et diviser"] },
  { icon: "🚀", name: ["Trucos avanzados", "Advanced tricks", "Astuces avancées"] },
];

const strategyById = (id) => STRATEGIES.find((s) => s.id === id);
const strategiesOfBlock = (b) => STRATEGIES.filter((s) => s.block === b);
const showOp = (p) => p.nums.map(f).join(` ${p.op} `);
