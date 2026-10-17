I18N.add({
  es: {
    "title.page": "Sin Pasarse · Family Games",
    "remove": "Quitar a {name}",
    "round": "Pregunta {n}",
    "progress": "Jugador {n} de {total}",
    "turn-of": "Turno de",
    "pass-to": "Pásale el móvil a",
    "winner": "🏆 Gana {names}",
    "winners": "🏆 Empate: ganan {names}",
    "exact": "🎯 ¡Exacto! Gana {names}",
    "nobody": "😅 Todos os habéis pasado: nadie gana esta ronda",
    "over": "se pasa",
    "and": " y ",
    "points": "{n} pts",
    "point": "1 pt",
  },
  en: {
    "title.page": "Don't Go Over · Family Games",
    "back": "← Back to games",
    "title": "🌡️ Don't Go Over",
    "players": "Players",
    "name": "Name",
    "add": "Add",
    "min-players": "At least 2 players.",
    "start": "Start game",
    "rule": "Closest wins… without going over!",
    "to-deal": "Start marking",
    "deal-show": "Mark my number",
    "type-number": "Type the number",
    "your-number": "Your number",
    "up": "Up",
    "down": "Down",
    "deal-next": "Confirm and pass",
    "answer-was": "The answer is",
    "scoreboard": "Scoreboard",
    "next-question": "Next question",
    "settings": "Change players",
    "remove": "Remove {name}",
    "round": "Question {n}",
    "progress": "Player {n} of {total}",
    "turn-of": "Your turn,",
    "pass-to": "Pass the phone to",
    "winner": "🏆 {names} wins",
    "winners": "🏆 It's a tie: {names} win",
    "exact": "🎯 Spot on! {names} wins",
    "nobody": "😅 Everyone went over: nobody wins this round",
    "over": "over",
    "and": " and ",
    "points": "{n} pts",
    "point": "1 pt",
  },
  fr: {
    "title.page": "Sans Dépasser · Family Games",
    "back": "← Retour aux jeux",
    "title": "🌡️ Sans Dépasser",
    "players": "Joueurs",
    "name": "Prénom",
    "add": "Ajouter",
    "min-players": "2 joueurs minimum.",
    "start": "Commencer la partie",
    "rule": "Le plus proche gagne… sans dépasser !",
    "to-deal": "Commencer à marquer",
    "deal-show": "Marquer mon nombre",
    "type-number": "Écrire le nombre",
    "your-number": "Ton nombre",
    "up": "Monter",
    "down": "Descendre",
    "deal-next": "Valider et passer",
    "answer-was": "La réponse est",
    "scoreboard": "Classement",
    "next-question": "Question suivante",
    "settings": "Changer les joueurs",
    "remove": "Retirer {name}",
    "round": "Question {n}",
    "progress": "Joueur {n} sur {total}",
    "turn-of": "À toi,",
    "pass-to": "Passe le téléphone à",
    "winner": "🏆 {names} gagne",
    "winners": "🏆 Égalité : {names} gagnent",
    "exact": "🎯 Pile poil ! {names} gagne",
    "nobody": "😅 Tout le monde a dépassé : personne ne gagne cette manche",
    "over": "dépasse",
    "and": " et ",
    "points": "{n} pts",
    "point": "1 pt",
  },
});

const { t, lang } = I18N;
document.title = t("title.page");

const STORAGE_KEY = "family-games:sin-pasarse";
const MIN_PLAYERS = 2;
const LANG_INDEX = { es: 0, en: 1, fr: 2 }[lang];

const $ = (id) => document.getElementById(id);
const fmt = new Intl.NumberFormat(lang, { maximumFractionDigits: 3 });
const fmtYear = new Intl.NumberFormat(lang, { useGrouping: false });
const fmtCompact = new Intl.NumberFormat(lang, { notation: "compact", maximumFractionDigits: 1 });

const state = loadState();
let round = null; // { question, guesses: {nombre: número}, turn, value }

// ---------- Guardado en este navegador ----------

function loadState() {
  const defaults = { players: [], scores: {}, used: [], count: 0 };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) return { ...defaults, ...saved };
    // La primera vez, aprovechamos los jugadores de El Impostor si los hay.
    const impostor = JSON.parse(localStorage.getItem("family-games:impostor"));
    if (impostor?.players?.length) defaults.players = impostor.players;
  } catch (e) { /* sin almacenamiento */ }
  return defaults;
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignorar */ }
}

// ---------- Textos de cada pregunta ----------

const text = (q, key) => q[key][LANG_INDEX];
const isYear = (q) => q.year || (q.min >= 1000 && q.max <= 3000);
const format = (q, n) => (isYear(q) ? fmtYear : fmt).format(n);
const withUnit = (q, n) => `${format(q, n)} ${text(q, "unit")}`.trim();

// ---------- Rango de cada pregunta ----------

// Número fijo a partir del id, para que el rango no dependa del azar pero tampoco
// deje la respuesta siempre en el mismo sitio del termómetro.
function hash(id) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

function niceCeil(v) {
  const mag = 10 ** Math.floor(Math.log10(v));
  return [1, 2, 5, 10].map((m) => m * mag).find((n) => n >= v);
}

function decimals(n) {
  return (String(n).split(".")[1] || "").length;
}

// Las preguntas que no traen min/max los calculan aquí:
// - años: escala normal hasta 2030, empezando unos siglos antes;
// - cifras grandes: escala logarítmica de varias potencias de 10;
// - cifras pequeñas: escala normal desde 0, con los decimales de la respuesta (máx. 2).
function fillRange(q) {
  if (q.min !== undefined) return;
  const h = hash(q.id);
  const a = q.answer;
  if (q.year) {
    q.min = Math.max(0, Math.floor((a - 200 - (h % 6) * 100) / 100) * 100);
    q.max = 2030;
    q.step = 1;
  } else if (a >= 200) {
    const e = Math.floor(Math.log10(a));
    q.min = 10 ** Math.max(0, e - 2 - (h % 2));
    q.max = 10 ** (e + 1 + ((h >>> 1) % 3));
  } else {
    q.min = 0;
    q.max = Math.max(10, niceCeil(a * (2 + (h % 4))));
    q.step = 10 ** -Math.min(2, decimals(a));
  }
}

QUESTIONS.forEach(fillRange);

// ---------- Escala del termómetro ----------

const isLog = (q) => q.min > 0 && q.max / q.min >= 1000;

// Redondea a 2 cifras significativas (4.567 → 4.600) para que el arrastre dé números redondos.
function roundSig(v) {
  if (v < 100) return Math.round(v);
  const p = 10 ** (Math.floor(Math.log10(v)) - 1);
  return Math.round(v / p) * p;
}

function linearStep(q) {
  return q.step || 1;
}

function fromPos(q, p) {
  if (isLog(q)) return roundSig(q.min * (q.max / q.min) ** p);
  const step = linearStep(q);
  return Number((Math.round((q.min + p * (q.max - q.min)) / step) * step).toFixed(decimals(step)));
}

function toPos(q, v) {
  if (isLog(q)) return v <= q.min ? 0 : Math.min(1, Math.log(v / q.min) / Math.log(q.max / q.min));
  return Math.min(1, Math.max(0, (v - q.min) / (q.max - q.min)));
}

// Salto de ▲▼: en escala logarítmica cambia la segunda cifra (4.500 → 4.600).
function nudgeStep(q, v, dir) {
  if (!isLog(q)) return linearStep(q);
  const base = dir > 0 ? v : v - 1e-9;
  if (base < 100) return 1;
  return 10 ** (Math.floor(Math.log10(base)) - 1);
}

function clamp(q, v) {
  return Math.min(q.max, Math.max(q.min, v));
}

function ticks(q) {
  if (isLog(q)) {
    const out = [];
    for (let e = Math.ceil(Math.log10(q.min)); 10 ** e <= q.max; e++) out.push(10 ** e);
    return out;
  }
  // Unas 4–6 marcas en números redondos (1.000, 1.250, 1.500…).
  const raw = (q.max - q.min) / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw * 0.8);
  const out = [];
  for (let v = Math.ceil(q.min / step) * step; v <= q.max; v += step) out.push(v);
  return out;
}

function tickLabel(q, v) {
  if (isYear(q)) return fmtYear.format(v);
  return v >= 10000 ? fmtCompact.format(v) : fmt.format(v);
}

// ---------- Pantallas ----------

function show(screenId) {
  ["screen-setup", "screen-question", "screen-deal", "screen-result"].forEach((id) => {
    $(id).classList.toggle("hidden", id !== screenId);
  });
  window.scrollTo(0, 0);
}

function renderSetup() {
  const list = $("player-list");
  list.innerHTML = "";
  state.players.forEach((name, i) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = name;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "✕";
    remove.setAttribute("aria-label", t("remove", { name }));
    remove.onclick = () => {
      state.players.splice(i, 1);
      saveState();
      renderSetup();
    };
    li.append(span, remove);
    list.append(li);
  });
  $("start").disabled = state.players.length < MIN_PLAYERS;
}

$("add-player").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("player-name");
  const name = input.value.trim();
  if (name && !state.players.includes(name)) {
    state.players.push(name);
    saveState();
    renderSetup();
  }
  input.value = "";
  input.focus();
});

$("start").onclick = () => {
  state.scores = {};
  state.count = 0;
  newQuestion();
};

// Elige una pregunta que no haya salido; cuando se acaban, vuelve a empezar.
function pickQuestion() {
  let pending = QUESTIONS.filter((q) => !state.used.includes(q.id));
  if (!pending.length) {
    state.used = [];
    pending = QUESTIONS;
  }
  const q = pending[Math.floor(Math.random() * pending.length)];
  state.used.push(q.id);
  return q;
}

function newQuestion() {
  const question = pickQuestion();
  state.count++;
  saveState();
  round = { question, guesses: {}, turn: 0, value: question.min };
  $("round-label").textContent = t("round", { n: state.count });
  $("q-icon").textContent = question.icon;
  $("q-text").textContent = text(question, "q");
  show("screen-question");
}

$("to-deal").onclick = () => {
  showDealTurn();
  show("screen-deal");
};

function showDealTurn() {
  const name = state.players[round.turn];
  $("deal-progress").textContent = t("progress", { n: round.turn + 1, total: state.players.length });
  $("deal-label").textContent = t(round.turn === 0 ? "turn-of" : "pass-to");
  $("deal-name").textContent = name;
  $("deal-pass").classList.remove("hidden");
  $("deal-pick").classList.add("hidden");
}

$("deal-show").onclick = () => {
  const q = round.question;
  round.value = q.min; // cada uno empieza desde abajo, sin ver lo que marcó el anterior
  $("pick-question").textContent = `${q.icon} ${text(q, "q")}`;
  $("unit").textContent = text(q, "unit");
  buildTicks();
  closeInput();
  renderValue();
  $("deal-pass").classList.add("hidden");
  $("deal-pick").classList.remove("hidden");
};

$("deal-next").onclick = () => {
  commitInput();
  round.guesses[state.players[round.turn]] = round.value;
  round.turn++;
  if (round.turn < state.players.length) showDealTurn();
  else showResult();
};

// ---------- Termómetro ----------

function buildTicks() {
  const q = round.question;
  const box = $("thermo-ticks");
  box.innerHTML = "";
  ticks(q).forEach((v) => {
    const span = document.createElement("span");
    span.textContent = tickLabel(q, v);
    span.style.bottom = `calc(6px + (100% - 12px) * ${toPos(q, v)})`;
    box.append(span);
  });
}

function renderValue() {
  const q = round.question;
  const p = toPos(q, round.value);
  $("value").textContent = format(q, round.value);
  $("thermo-fill").style.height = `calc((100% - 12px) * ${p})`;
  $("thermo-mark").style.bottom = `calc(6px + (100% - 12px) * ${p})`;
  const thermo = $("thermo");
  thermo.setAttribute("aria-valuenow", round.value);
  thermo.setAttribute("aria-valuetext", withUnit(q, round.value));
}

function setFromPointer(e) {
  const rect = $("thermo").getBoundingClientRect();
  const p = 1 - (e.clientY - rect.top - 6) / (rect.height - 12);
  round.value = fromPos(round.question, Math.min(1, Math.max(0, p)));
  renderValue();
}

const thermo = $("thermo");
thermo.addEventListener("pointerdown", (e) => {
  closeInput();
  thermo.setPointerCapture(e.pointerId);
  setFromPointer(e);
});
thermo.addEventListener("pointermove", (e) => {
  if (thermo.hasPointerCapture(e.pointerId)) setFromPointer(e);
});

function nudge(dir) {
  const q = round.question;
  commitInput();
  const step = nudgeStep(q, round.value, dir);
  // Primero se ajusta al múltiplo del salto, para que 4.567 ▲ dé 4.600 y no 4.667.
  const snapped = dir > 0 ? Math.floor(round.value / step + 1e-9) * step : Math.ceil(round.value / step - 1e-9) * step;
  round.value = clamp(q, Number((snapped + dir * step).toPrecision(12)));
  renderValue();
}

thermo.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") { nudge(1); e.preventDefault(); }
  if (e.key === "ArrowDown") { nudge(-1); e.preventDefault(); }
});

// Mantener pulsado ▲▼ repite, cada vez más rápido.
function holdToRepeat(button, dir) {
  let timer = null;
  const stop = () => { clearTimeout(timer); timer = null; };
  button.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    nudge(dir);
    let delay = 400;
    const tick = () => {
      nudge(dir);
      delay = Math.max(40, delay * 0.8);
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, delay);
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => button.addEventListener(ev, stop));
}

holdToRepeat($("up"), 1);
holdToRepeat($("down"), -1);

// Tocar el número permite escribirlo directamente.
$("value").onclick = () => {
  const input = $("value-input");
  input.value = round.value;
  $("value").classList.add("hidden");
  input.classList.remove("hidden");
  input.focus();
  input.select();
};

function commitInput() {
  const input = $("value-input");
  if (input.classList.contains("hidden")) return;
  const n = parseFloat(input.value);
  if (Number.isFinite(n)) round.value = clamp(round.question, n);
  closeInput();
  renderValue();
}

function closeInput() {
  $("value-input").classList.add("hidden");
  $("value").classList.remove("hidden");
}

$("value-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") { e.preventDefault(); commitInput(); }
});
$("value-input").addEventListener("blur", commitInput);

// ---------- Resultado ----------

function showResult() {
  const q = round.question;
  const answer = q.answer;
  const entries = state.players.map((name) => ({ name, value: round.guesses[name] }));

  // Gana quien más se acerca sin pasarse; si hay empate, ganan todos los empatados.
  const valid = entries.filter((g) => g.value <= answer);
  const best = valid.length ? Math.max(...valid.map((g) => g.value)) : null;
  const winners = valid.filter((g) => g.value === best).map((g) => g.name);
  winners.forEach((name) => { state.scores[name] = (state.scores[name] || 0) + 1; });
  saveState();

  $("result-answer").textContent = withUnit(q, answer);
  $("result-note").textContent = text(q, "note");

  const names = winners.join(t("and"));
  let verdict = t("nobody");
  if (winners.length && best === answer) verdict = t("exact", { names });
  else if (winners.length > 1) verdict = t("winners", { names });
  else if (winners.length) verdict = t("winner", { names });
  $("verdict").textContent = verdict;

  // De más cerca a más lejos; los que se pasan, al final.
  const sorted = [...entries].sort((a, b) => {
    const overA = a.value > answer;
    const overB = b.value > answer;
    if (overA !== overB) return overA ? 1 : -1;
    return overA ? a.value - b.value : b.value - a.value;
  });
  const list = $("guesses");
  list.innerHTML = "";
  sorted.forEach((g) => {
    const li = document.createElement("li");
    const who = document.createElement("span");
    who.textContent = g.name;
    const num = document.createElement("span");
    num.className = "num";
    num.textContent = format(q, g.value);
    if (g.value > answer) {
      num.classList.add("over");
      who.textContent = `${g.name} · ${t("over")}`;
    }
    if (winners.includes(g.name)) li.classList.add("winner");
    li.append(who, num);
    list.append(li);
  });

  renderScores();
  show("screen-result");
}

function renderScores() {
  const list = $("scores");
  list.innerHTML = "";
  [...state.players]
    .sort((a, b) => (state.scores[b] || 0) - (state.scores[a] || 0))
    .forEach((name) => {
      const pts = state.scores[name] || 0;
      const li = document.createElement("li");
      const who = document.createElement("span");
      who.textContent = name;
      const n = document.createElement("span");
      n.className = "pts";
      n.textContent = pts === 1 ? t("point") : t("points", { n: pts });
      li.append(who, n);
      list.append(li);
    });
}

$("next-question").onclick = newQuestion;
$("settings").onclick = () => {
  renderSetup();
  show("screen-setup");
};

renderSetup();
