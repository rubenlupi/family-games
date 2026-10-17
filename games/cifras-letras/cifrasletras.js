// Interfaz de «Cifras y letras». La lógica está en letras.js, cifras.js y scoring.js.

I18N.add({
  es: {
    "title.page": "Cifras y Letras · Family Games",
    "players": "Jugadores",
    "name": "Nombre",
    "add": "Añadir",
    "remove": "Quitar a {name}",
    "need-players": "Añade al menos un jugador para jugar una partida.",
    "game-settings": "Partida",
    "mode": "Tipo de partida",
    "mode-mixed": "Mixta",
    "mode-letters": "Letras",
    "mode-numbers": "Cifras",
    "rounds": "Rondas",
    "time": "Tiempo por ronda",
    "time-none": "Sin límite",
    "seconds": "{n} s",
    "word-lang": "Idioma de las palabras",
    "lang-es": "Castellano",
    "lang-en": "Inglés",
    "lang-fr": "Francés",
    "numbers-level": "Nivel de cifras",
    "level-normal": "Normal",
    "level-easy": "Fácil",
    "level-help": "Fácil: números del 1 al 10 y un objetivo que siempre se puede alcanzar.",
    "start": "Empezar partida",
    "continue": "Continuar partida · ronda {n} de {total}",
    "restart": "Reiniciar partida",
    "confirm-restart": "¿Empezar la partida de nuevo? Se perderán los puntos de esta partida.",
    "confirm-new": "Hay una partida a medias. ¿Empezar otra nueva?",
    "practice": "Práctica (sin puntos)",
    "practice-letters": "Practicar letras",
    "practice-numbers": "Practicar cifras",
    "dict-credit": "Diccionario: {source}.",
    "round-n": "Ronda {n} de {total}",
    "letters": "Letras",
    "numbers": "Cifras",
    "menu": "Volver al menú",
    "choose": "Elige: {name}",
    "choose-free": "Elegid vocal o consonante",
    "vowel": "Vocal",
    "consonant": "Consonante",
    "min-rule": "Tiene que haber al menos 3 vocales y 4 consonantes.",
    "how-many-large": "{name}: ¿cuántos números grandes (25, 50, 75, 100)?",
    "how-many-large-free": "¿Cuántos números grandes (25, 50, 75, 100)?",
    "draw": "Sacar números",
    "target": "Objetivo",
    "ready": "Todos preparados",
    "ready-help": "Cuando todos tengáis papel y boli, pulsad «Todos preparados»: empieza el tiempo.",
    "goal-letters": "Formad la palabra más larga con estas letras. Cada ficha se usa una vez.",
    "goal-numbers": "Llegad al objetivo, o lo más cerca posible, con + − × ÷. Cada número se usa una vez.",
    "stop": "Se acabó",
    "times-up": "¡Tiempo!",
    "answers": "Respuestas",
    "answers-help-letters": "Cada jugador dice su palabra. Escribidla aquí (las tildes son opcionales; la ñ no).",
    "answers-help-numbers": "Cada jugador dice su resultado y cómo ha llegado. Tocad su casilla y escribid la operación con el teclado, con paréntesis si hacen falta.",
    "word-placeholder": "Palabra",
    "expr-placeholder": "Ej.: (75 + 25) × 6",
    "check": "Comprobar respuestas",
    "loading-dict": "Cargando el diccionario…",
    "dict-error": "No se ha podido cargar el diccionario. Revisa la conexión.",
    "retry": "Reintentar",
    "results": "Resultados",
    "no-answer": "Sin respuesta",
    "points": "{n} pts",
    "point": "1 pt",
    "st-ok": "✓ Válida · {n} letras",
    "st-letters": "✗ Usa letras que no están: {letters}",
    "st-invalid": "✗ Solo se pueden usar letras",
    "st-unknown": "? No está en el diccionario",
    "st-accepted": "✓ Aceptada por la familia · {n} letras",
    "accept": "Aceptarla",
    "st-exact": "✓ {value}: ¡exacto!",
    "st-close": "✓ {value} · a {d} del objetivo",
    "err-empty": "Sin operación",
    "err-syntax": "✗ La operación no está bien escrita",
    "err-paren": "✗ Faltan o sobran paréntesis",
    "err-char": "✗ Símbolo no válido: {char}",
    "err-missing": "✗ El {n} no está entre los números",
    "err-repeated": "✗ El {n} se usa más veces de las que sale",
    "err-negative": "✗ {a} − {b} no da un número positivo",
    "err-division": "✗ {a} ÷ {b} no es una división exacta",
    "best-words": "Palabras más largas posibles",
    "from-players": "presentada por {names}",
    "words-total": "{n} palabras posibles en total.",
    "no-words": "Con estas letras no hay ninguna palabra en el diccionario.",
    "solution": "Una solución",
    "exact-solution": "Se puede llegar exacto:",
    "closest-solution": "No hay solución exacta. Lo más cerca es {value} (a {d}):",
    "target-in-numbers": "¡El objetivo ya está entre los números!",
    "solving": "Buscando la solución…",
    "scoreboard": "Marcador",
    "round-points": "+{n}",
    "next-round": "Siguiente ronda →",
    "final-standings": "Ver la clasificación final",
    "nobody-scores": "Nadie puntúa en esta ronda.",
    "final": "Clasificación final",
    "winner": "🏆 ¡Gana {names}!",
    "tie": "🏆 Empate entre {names}",
    "and": " y ",
    "rematch": "Otra partida",
    "practice-title-letters": "Práctica de letras",
    "practice-title-numbers": "Práctica de cifras",
    "random-letters": "🎲 Al azar",
    "try-word": "Prueba una palabra",
    "try-expr": "Prueba una operación",
    "try": "Comprobar",
    "hint": "💡 Pista",
    "show-solutions": "Ver soluciones",
    "new": "Nueva ronda",
    "hint-length": "La palabra más larga tiene {n} letras.",
    "hint-first": "Una de las más largas empieza por «{l}».",
    "hint-more": "Ya no hay más pistas: puedes ver las soluciones.",
    "hint-exact": "Se puede llegar exacto.",
    "hint-closest": "No se puede llegar exacto: lo más cerca es {value}.",
    "hint-step": "Prueba a empezar por: {step}",
    "draw-letters-first": "Elige las 9 letras para empezar.",
    "keypad": "Teclado de la operación",
    "keypad-back": "Borrar lo último",
    "keypad-clear": "Borrar todo",
  },
  en: {
    "title.page": "Numbers & Letters · Family Games",
    "back": "← Back to games",
    "title": "🔤 Numbers & Letters",
    "players": "Players",
    "name": "Name",
    "add": "Add",
    "remove": "Remove {name}",
    "need-players": "Add at least one player to play a game.",
    "game-settings": "Game",
    "mode": "Game type",
    "mode-mixed": "Mixed",
    "mode-letters": "Letters",
    "mode-numbers": "Numbers",
    "rounds": "Rounds",
    "time": "Time per round",
    "time-none": "No limit",
    "seconds": "{n} s",
    "word-lang": "Language of the words",
    "lang-es": "Spanish",
    "lang-en": "English",
    "lang-fr": "French",
    "numbers-level": "Numbers level",
    "level-normal": "Normal",
    "level-easy": "Easy",
    "level-help": "Easy: numbers from 1 to 10 and a target you can always reach.",
    "start": "Start game",
    "continue": "Continue game · round {n} of {total}",
    "restart": "Restart game",
    "confirm-restart": "Start the game again? This game's points will be lost.",
    "confirm-new": "There's a game in progress. Start a new one?",
    "practice": "Practice (no points)",
    "practice-letters": "Practise letters",
    "practice-numbers": "Practise numbers",
    "dict-credit": "Dictionary: {source}.",
    "round-n": "Round {n} of {total}",
    "letters": "Letters",
    "numbers": "Numbers",
    "menu": "Back to the menu",
    "choose": "{name} chooses",
    "choose-free": "Choose vowel or consonant",
    "vowel": "Vowel",
    "consonant": "Consonant",
    "min-rule": "There must be at least 3 vowels and 4 consonants.",
    "how-many-large": "{name}: how many large numbers (25, 50, 75, 100)?",
    "how-many-large-free": "How many large numbers (25, 50, 75, 100)?",
    "draw": "Draw numbers",
    "target": "Target",
    "ready": "Everyone ready",
    "ready-help": "When everyone has paper and pen, tap “Everyone ready”: the clock starts.",
    "goal-letters": "Make the longest word you can with these letters. Each tile can be used once.",
    "goal-numbers": "Reach the target, or get as close as you can, with + − × ÷. Each number can be used once.",
    "stop": "Stop",
    "times-up": "Time's up!",
    "answers": "Answers",
    "answers-help-letters": "Each player says their word. Type it here (accents are optional).",
    "answers-help-numbers": "Each player says their result and how they got there. Tap their box and enter the sum with the keypad, with brackets if needed.",
    "word-placeholder": "Word",
    "expr-placeholder": "e.g. (75 + 25) × 6",
    "check": "Check answers",
    "loading-dict": "Loading the dictionary…",
    "dict-error": "The dictionary couldn't be loaded. Check your connection.",
    "retry": "Try again",
    "results": "Results",
    "no-answer": "No answer",
    "points": "{n} pts",
    "point": "1 pt",
    "st-ok": "✓ Valid · {n} letters",
    "st-letters": "✗ Uses letters that aren't there: {letters}",
    "st-invalid": "✗ Only letters can be used",
    "st-unknown": "? Not in the dictionary",
    "st-accepted": "✓ Accepted by the family · {n} letters",
    "accept": "Accept it",
    "st-exact": "✓ {value}: spot on!",
    "st-close": "✓ {value} · {d} away from the target",
    "err-empty": "No sum",
    "err-syntax": "✗ The sum isn't written correctly",
    "err-paren": "✗ Missing or extra brackets",
    "err-char": "✗ Symbol not allowed: {char}",
    "err-missing": "✗ {n} isn't one of the numbers",
    "err-repeated": "✗ {n} is used more times than it appears",
    "err-negative": "✗ {a} − {b} isn't a positive number",
    "err-division": "✗ {a} ÷ {b} isn't an exact division",
    "best-words": "Longest possible words",
    "from-players": "given by {names}",
    "words-total": "{n} possible words in total.",
    "no-words": "There are no dictionary words with these letters.",
    "solution": "A solution",
    "exact-solution": "The target can be reached exactly:",
    "closest-solution": "There's no exact solution. The closest is {value} ({d} away):",
    "target-in-numbers": "The target is already one of the numbers!",
    "solving": "Looking for a solution…",
    "scoreboard": "Scoreboard",
    "round-points": "+{n}",
    "next-round": "Next round →",
    "final-standings": "See the final standings",
    "nobody-scores": "Nobody scores this round.",
    "final": "Final standings",
    "winner": "🏆 {names} wins!",
    "tie": "🏆 It's a tie between {names}",
    "and": " and ",
    "rematch": "Another game",
    "practice-title-letters": "Letters practice",
    "practice-title-numbers": "Numbers practice",
    "random-letters": "🎲 Random",
    "try-word": "Try a word",
    "try-expr": "Try a sum",
    "try": "Check",
    "hint": "💡 Hint",
    "show-solutions": "Show solutions",
    "new": "New round",
    "hint-length": "The longest word has {n} letters.",
    "hint-first": "One of the longest starts with “{l}”.",
    "hint-more": "No more hints: you can show the solutions.",
    "hint-exact": "The target can be reached exactly.",
    "hint-closest": "It can't be reached exactly: the closest is {value}.",
    "hint-step": "Try starting with: {step}",
    "draw-letters-first": "Pick the 9 letters to start.",
    "keypad": "Keypad for the sum",
    "keypad-back": "Delete the last one",
    "keypad-clear": "Clear all",
  },
  fr: {
    "title.page": "Des chiffres et des lettres · Family Games",
    "back": "← Retour aux jeux",
    "title": "🔤 Des chiffres et des lettres",
    "players": "Joueurs",
    "name": "Prénom",
    "add": "Ajouter",
    "remove": "Retirer {name}",
    "need-players": "Ajoutez au moins un joueur pour jouer une partie.",
    "game-settings": "Partie",
    "mode": "Type de partie",
    "mode-mixed": "Mixte",
    "mode-letters": "Lettres",
    "mode-numbers": "Chiffres",
    "rounds": "Manches",
    "time": "Temps par manche",
    "time-none": "Sans limite",
    "seconds": "{n} s",
    "word-lang": "Langue des mots",
    "lang-es": "Espagnol",
    "lang-en": "Anglais",
    "lang-fr": "Français",
    "numbers-level": "Niveau des chiffres",
    "level-normal": "Normal",
    "level-easy": "Facile",
    "level-help": "Facile : nombres de 1 à 10 et un objectif toujours atteignable.",
    "start": "Commencer la partie",
    "continue": "Reprendre la partie · manche {n} sur {total}",
    "restart": "Recommencer la partie",
    "confirm-restart": "Recommencer la partie ? Les points de cette partie seront perdus.",
    "confirm-new": "Une partie est en cours. En commencer une nouvelle ?",
    "practice": "Entraînement (sans points)",
    "practice-letters": "S'entraîner aux lettres",
    "practice-numbers": "S'entraîner aux chiffres",
    "dict-credit": "Dictionnaire : {source}.",
    "round-n": "Manche {n} sur {total}",
    "letters": "Lettres",
    "numbers": "Chiffres",
    "menu": "Retour au menu",
    "choose": "À {name} de choisir",
    "choose-free": "Choisissez voyelle ou consonne",
    "vowel": "Voyelle",
    "consonant": "Consonne",
    "min-rule": "Il faut au moins 3 voyelles et 4 consonnes.",
    "how-many-large": "{name} : combien de grands nombres (25, 50, 75, 100) ?",
    "how-many-large-free": "Combien de grands nombres (25, 50, 75, 100) ?",
    "draw": "Tirer les nombres",
    "target": "Objectif",
    "ready": "Tout le monde est prêt",
    "ready-help": "Quand tout le monde a papier et stylo, touchez « Tout le monde est prêt » : le temps démarre.",
    "goal-letters": "Formez le mot le plus long avec ces lettres. Chaque lettre ne sert qu'une fois.",
    "goal-numbers": "Atteignez l'objectif, ou approchez-vous-en le plus possible, avec + − × ÷. Chaque nombre ne sert qu'une fois.",
    "stop": "Terminé",
    "times-up": "Temps écoulé !",
    "answers": "Réponses",
    "answers-help-letters": "Chaque joueur annonce son mot. Écrivez-le ici (les accents sont facultatifs ; œ peut s'écrire oe).",
    "answers-help-numbers": "Chaque joueur annonce son résultat et comment il l'a obtenu. Touchez sa case et tapez le calcul avec le clavier, avec des parenthèses si besoin.",
    "word-placeholder": "Mot",
    "expr-placeholder": "Ex. : (75 + 25) × 6",
    "check": "Vérifier les réponses",
    "loading-dict": "Chargement du dictionnaire…",
    "dict-error": "Impossible de charger le dictionnaire. Vérifiez la connexion.",
    "retry": "Réessayer",
    "results": "Résultats",
    "no-answer": "Pas de réponse",
    "points": "{n} pts",
    "point": "1 pt",
    "st-ok": "✓ Valide · {n} lettres",
    "st-letters": "✗ Utilise des lettres absentes : {letters}",
    "st-invalid": "✗ Seules les lettres sont permises",
    "st-unknown": "? Absent du dictionnaire",
    "st-accepted": "✓ Accepté par la famille · {n} lettres",
    "accept": "L'accepter",
    "st-exact": "✓ {value} : le compte est bon !",
    "st-close": "✓ {value} · à {d} de l'objectif",
    "err-empty": "Pas de calcul",
    "err-syntax": "✗ Le calcul n'est pas bien écrit",
    "err-paren": "✗ Il manque ou il y a trop de parenthèses",
    "err-char": "✗ Symbole non autorisé : {char}",
    "err-missing": "✗ Le {n} ne fait pas partie des nombres",
    "err-repeated": "✗ Le {n} est utilisé plus de fois qu'il n'apparaît",
    "err-negative": "✗ {a} − {b} ne donne pas un nombre positif",
    "err-division": "✗ {a} ÷ {b} n'est pas une division exacte",
    "best-words": "Mots les plus longs possibles",
    "from-players": "proposé par {names}",
    "words-total": "{n} mots possibles au total.",
    "no-words": "Aucun mot du dictionnaire avec ces lettres.",
    "solution": "Une solution",
    "exact-solution": "Le compte est bon :",
    "closest-solution": "Pas de solution exacte. Le plus proche est {value} (à {d}) :",
    "target-in-numbers": "L'objectif fait déjà partie des nombres !",
    "solving": "Recherche de la solution…",
    "scoreboard": "Classement",
    "round-points": "+{n}",
    "next-round": "Manche suivante →",
    "final-standings": "Voir le classement final",
    "nobody-scores": "Personne ne marque dans cette manche.",
    "final": "Classement final",
    "winner": "🏆 {names} gagne !",
    "tie": "🏆 Égalité entre {names}",
    "and": " et ",
    "rematch": "Une autre partie",
    "practice-title-letters": "Entraînement aux lettres",
    "practice-title-numbers": "Entraînement aux chiffres",
    "random-letters": "🎲 Au hasard",
    "try-word": "Essaie un mot",
    "try-expr": "Essaie un calcul",
    "try": "Vérifier",
    "hint": "💡 Indice",
    "show-solutions": "Voir les solutions",
    "new": "Nouvelle manche",
    "hint-length": "Le mot le plus long a {n} lettres.",
    "hint-first": "L'un des plus longs commence par « {l} ».",
    "hint-more": "Plus d'indices : tu peux voir les solutions.",
    "hint-exact": "Le compte peut être bon.",
    "hint-closest": "Impossible de tomber juste : le plus proche est {value}.",
    "hint-step": "Essaie de commencer par : {step}",
    "draw-letters-first": "Choisis les 9 lettres pour commencer.",
    "keypad": "Clavier du calcul",
    "keypad-back": "Effacer le dernier",
    "keypad-clear": "Tout effacer",
  },
});

const { t, lang: uiLang } = I18N;
document.title = t("title.page");

const STORAGE_KEY = "family-games:cifras-letras";
const DICT_SOURCES = {
  es: "RLA-ES es_ES 2.8 (GPL/LGPL/MPL)",
  en: "SCOWL 2020.12.07",
  fr: "Grammalecte 7.5 (MPL 2.0)",
};
const NUM = new Intl.NumberFormat(uiLang);
const fmt = (n) => NUM.format(n);
const screen = document.getElementById("screen");

// ---------- Estado guardado ----------

const state = loadState();
let view = { screen: "menu" };
let practice = null; // la práctica no se guarda
let timerId = null;

function loadState() {
  const defaults = {
    settings: { players: [], mode: "mixed", rounds: 6, time: 60, wordLang: uiLang, numbersLevel: "normal" },
    game: null,
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.settings) return { ...defaults, ...saved, settings: { ...defaults.settings, ...saved.settings } };
  } catch (e) { /* sin almacenamiento */ }
  return defaults;
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignorar */ }
}

// ---------- Ayudas para pintar ----------

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "value") node.value = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c != null && c !== false) node.append(c.nodeType ? c : String(c));
  }
  return node;
}

const button = (text, onclick, cls = "btn") => el("button", { class: cls, type: "button", onclick }, text);
const pts = (n) => (n === 1 ? t("point") : t("points", { n }));
const joinNames = (names) => names.join(t("and"));

function show(...nodes) {
  stopTimer();
  screen.replaceChildren(...nodes.filter(Boolean));
}

function segmented(options, current, onpick) {
  return el("div", { class: "segmented" }, options.map(([value, label]) => el("button", {
    type: "button",
    "aria-pressed": String(value === current),
    onclick: () => onpick(value),
  }, label)));
}

function field(label, control) {
  return el("div", { class: "field" }, el("span", {}, label), control);
}

function tilesView(tiles, { small = false, used = null, slots = 9 } = {}) {
  const cells = [];
  for (let i = 0; i < slots; i++) {
    const l = tiles[i];
    let cls = "tile";
    if (!l) cls += " empty";
    else if (isVowel(l)) cls += " vowel";
    if (used && l) cls += used.has(i) ? " used" : " dim";
    cells.push(el("li", { class: cls }, l || ""));
  }
  return el("ul", { class: small ? "tiles small" : "tiles", "aria-label": tiles.join(" ") }, cells);
}

function numbersView(numbers, target) {
  return [
    target != null ? el("div", { class: "target", "aria-label": `${t("target")}: ${target}` }, el("small", {}, t("target").toUpperCase()), fmt(target)) : null,
    el("ul", { class: "numbers" }, numbers.map((n) => el("li", { class: n > 10 ? "number large" : "number" }, fmt(n)))),
  ];
}

function stepsView(steps) {
  return el("ol", { class: "steps" }, steps.map((s) => el("li", {}, `${fmt(s.a)} ${s.op} ${fmt(s.b)} = ${fmt(s.value)}`)));
}

function render() {
  ({ menu: renderMenu, round: renderRound, final: renderFinal, "practice-letters": renderPracticeLetters, "practice-numbers": renderPracticeNumbers })[view.screen]();
  window.scrollTo(0, 0);
}

function go(next) {
  view = next;
  render();
}

// ---------- Solucionador en segundo plano ----------

let worker = null;
let workerSeq = 0;
const workerWaiting = new Map();

function solveAsync(numbers, target) {
  try {
    if (!worker) {
      worker = new Worker("solver-worker.js");
      worker.onmessage = (e) => {
        const resolve = workerWaiting.get(e.data.id);
        workerWaiting.delete(e.data.id);
        if (resolve) resolve(e.data.solution);
      };
    }
    const id = ++workerSeq;
    return new Promise((resolve) => {
      workerWaiting.set(id, resolve);
      worker.postMessage({ id, numbers, target });
    });
  } catch (e) {
    // Sin Web Workers (p. ej. abriendo el archivo directamente): se resuelve en la página.
    return new Promise((resolve) => setTimeout(() => resolve(solve(numbers, target)), 0));
  }
}

// ---------- Menú ----------

function renderMenu() {
  const s = state.settings;
  const set = (key) => (value) => { s[key] = value; save(); render(); };

  const players = el("ul", { class: "player-list" }, s.players.map((name, i) =>
    el("li", {}, el("span", {}, name), el("button", {
      type: "button",
      "aria-label": t("remove", { name }),
      onclick: () => { s.players.splice(i, 1); save(); render(); },
    }, "✕"))));
  const input = el("input", { class: "input", placeholder: t("name"), maxlength: 20, autocomplete: "off" });
  const form = el("form", {
    class: "row",
    onsubmit: (e) => {
      e.preventDefault();
      const name = input.value.trim();
      if (name && !s.players.includes(name)) s.players.push(name);
      save();
      render();
      screen.querySelector("input")?.focus();
    },
  }, input, el("button", { class: "btn", type: "submit" }, t("add")));

  const game = state.game;
  const canPlay = s.players.length > 0;

  show(
    el("div", { class: "card" }, el("h2", {}, t("players")), players, form,
      canPlay ? null : el("p", { class: "hint" }, t("need-players"))),
    el("div", { class: "card" },
      el("h2", {}, t("game-settings")),
      field(t("mode"), segmented([["mixed", t("mode-mixed")], ["letters", t("mode-letters")], ["numbers", t("mode-numbers")]], s.mode, set("mode"))),
      field(t("rounds"), segmented([4, 6, 8, 10].map((n) => [n, String(n)]), s.rounds, set("rounds"))),
      field(t("time"), segmented([[30, t("seconds", { n: 30 })], [60, t("seconds", { n: 60 })], [90, t("seconds", { n: 90 })], [0, t("time-none")]], s.time, set("time"))),
      field(t("word-lang"), segmented([["es", t("lang-es")], ["en", t("lang-en")], ["fr", t("lang-fr")]], s.wordLang, set("wordLang"))),
      el("p", { class: "hint" }, t("dict-credit", { source: DICT_SOURCES[s.wordLang] })),
      field(t("numbers-level"), segmented([["normal", t("level-normal")], ["easy", t("level-easy")]], s.numbersLevel, set("numbersLevel"))),
      el("p", { class: "hint" }, t("level-help"))),
    el("div", { class: "menu-actions" },
      game ? button(t("continue", { n: game.index + 1, total: game.types.length }), () => go({ screen: game.finished ? "final" : "round" }), "btn big") : null,
      el("button", { class: game ? "btn big ghost" : "btn big", type: "button", disabled: !canPlay, onclick: () => {
        if (game && !game.finished && !confirm(t("confirm-new"))) return;
        newGame();
      } }, t("start"))),
    el("div", { class: "card" },
      el("h2", {}, t("practice")),
      el("div", { class: "practice-actions" },
        button(t("practice-letters"), () => startPractice("letters"), "btn ghost"),
        button(t("practice-numbers"), () => startPractice("numbers"), "btn ghost"))),
  );
}

// ---------- Partida ----------

function roundTypes(mode, n) {
  if (mode === "letters") return Array(n).fill("letters");
  if (mode === "numbers") return Array(n).fill("numbers");
  return Array.from({ length: n }, (_, i) => (i % 2 === 0 ? "letters" : "numbers"));
}

function newGame() {
  const s = state.settings;
  state.game = {
    players: [...s.players],
    types: roundTypes(s.mode, s.rounds),
    time: s.time,
    wordLang: s.wordLang,
    numbersLevel: s.numbersLevel,
    index: 0,
    scores: Object.fromEntries(s.players.map((p) => [p, 0])),
    round: null,
    finished: false,
  };
  state.game.round = newRound(state.game);
  save();
  go({ screen: "round" });
}

function newRound(game) {
  const type = game.types[game.index];
  const chooser = game.players[game.index % game.players.length];
  if (type === "letters") {
    return { type, phase: "pick", lang: game.wordLang, tiles: [], bags: newBags(game.wordLang), chooser, answers: {}, accepted: {} };
  }
  return { type, phase: "pick", level: game.numbersLevel, numbers: [], target: null, chooser, answers: {} };
}

function currentPicker(round, game) {
  // En letras se va turnando quién elige cada ficha.
  const start = game.players.indexOf(round.chooser);
  return game.players[(start + round.tiles.length) % game.players.length];
}

function roundHeader(game) {
  const r = game.round;
  return el("div", { class: "round-head" },
    el("p", { class: "label" }, `${t("round-n", { n: game.index + 1, total: game.types.length })} · ${r.type === "letters" ? `🔤 ${t("letters")}` : `🔢 ${t("numbers")}`}`),
    el("div", { class: "mini-scores" }, game.players.map((p) => el("span", {}, `${p} · ${game.scores[p] || 0}`))));
}

function footerLinks() {
  return el("div", { class: "footer-links" },
    button(t("menu"), () => go({ screen: "menu" }), "link-btn"),
    button(t("restart"), () => {
      if (!confirm(t("confirm-restart"))) return;
      newGame();
    }, "link-btn"));
}

function setPhase(phase, extra = {}) {
  Object.assign(state.game.round, { phase }, extra);
  save();
  render();
}

function renderRound() {
  const game = state.game;
  if (!game) return go({ screen: "menu" });
  const r = game.round;
  const board = r.type === "letters" ? tilesView(r.tiles) : (r.numbers.length ? numbersView(r.numbers, r.target) : null);
  const goal = el("p", { class: "hint center" }, r.type === "letters" ? t("goal-letters") : t("goal-numbers"));

  if (r.phase === "pick") return show(roundHeader(game), el("div", { class: "card" }, board, goal, pickControls(game, r)), footerLinks());
  if (r.phase === "ready") {
    return show(roundHeader(game),
      el("div", { class: "card" }, board, goal),
      el("p", { class: "hint center" }, t("ready-help")),
      button(t("ready"), () => { unlockAudio(); setPhase("play", { endsAt: game.time ? Date.now() + game.time * 1000 : null }); }, "btn big"),
      footerLinks());
  }
  if (r.phase === "play") return renderPlay(game, r, board);
  if (r.phase === "answers") return renderAnswers(game, r, board);
  return renderResults(game, r, board);
}

// --- Elegir letras o números ---

function pickControls(game, r) {
  if (r.type === "letters") {
    const ok = allowedKinds(r.tiles);
    const pick = (kind) => {
      r.tiles.push(drawTile(r.bags, kind));
      if (r.tiles.length === TILE_COUNT) r.phase = "ready";
      save();
      render();
    };
    return el("div", {},
      el("p", { class: "verdict" }, t("choose", { name: currentPicker(r, game) })),
      el("div", { class: "pick" },
        el("button", { class: "btn", type: "button", disabled: !ok.vowel, onclick: () => pick("vowel") }, t("vowel")),
        el("button", { class: "btn", type: "button", disabled: !ok.consonant, onclick: () => pick("consonant") }, t("consonant"))),
      el("p", { class: "hint center" }, t("min-rule")));
  }
  if (r.level === "easy") {
    return button(t("draw"), () => { Object.assign(r, drawEasyNumbers()); setPhase("ready"); }, "btn big");
  }
  return el("div", {},
    el("p", { class: "verdict" }, t("how-many-large", { name: r.chooser })),
    el("div", { class: "pick five" }, [0, 1, 2, 3, 4].map((n) =>
      button(String(n), () => { Object.assign(r, drawNumbers(n)); setPhase("ready"); }, "btn"))));
}

// --- Tiempo ---

let audioCtx = null;
function unlockAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
  } catch (e) { audioCtx = null; }
}

function beep() {
  if (!audioCtx) return;
  try {
    [0, 0.25, 0.5].forEach((at, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = i === 2 ? 660 : 880;
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime + at);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + at + 0.2);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + at);
      osc.stop(audioCtx.currentTime + at + 0.22);
    });
  } catch (e) { /* sin sonido */ }
  if (navigator.vibrate) navigator.vibrate(300);
}

function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
}

function renderPlay(game, r, board) {
  const timer = el("div", { class: r.endsAt ? "timer" : "timer infinite", role: "timer" }, el("span", {}, r.endsAt ? "" : "∞"));
  const finish = (rang) => {
    if (rang) beep();
    setPhase("answers");
  };
  show(roundHeader(game),
    el("div", { class: "card" }, board, timer),
    button(t("stop"), () => finish(false), "btn big ghost"),
    footerLinks());
  if (r.endsAt) {
    const total = game.time * 1000;
    const tick = () => {
      const left = Math.max(0, r.endsAt - Date.now());
      timer.style.setProperty("--p", left / total);
      timer.classList.toggle("urgent", left <= 10000);
      timer.firstChild.textContent = Math.ceil(left / 1000);
      if (left <= 0) finish(true);
    };
    tick();
    if (r.phase === "play") timerId = setInterval(tick, 200);
  }
}

// --- Teclado para escribir operaciones ---
//
// Un botón por cada número que ha salido (si sale dos veces, dos botones); cada botón se
// apaga cuando ese número ya está en la operación. También se puede escribir con el teclado.

function appendToken(text, token) {
  const base = text.replace(/\s+$/, "");
  if (!base || base.endsWith("(") || token === ")") return base + token;
  return `${base} ${token}`;
}

function removeLastToken(text) {
  return text.replace(/\s*(\d+|\S)\s*$/, "");
}

function numberUses(text) {
  const uses = {};
  for (const n of String(text).match(/\d+/g) || []) uses[Number(n)] = (uses[Number(n)] || 0) + 1;
  return uses;
}

function keypad(numbers, getInput) {
  const pad = el("div", { class: "keypad", role: "group", "aria-label": t("keypad") });
  const set = (value) => {
    const input = getInput();
    input.value = value;
    input.dispatchEvent(new Event("input"));
    refresh();
  };
  const numberButtons = numbers.map((n) => {
    const b = el("button", { type: "button", class: n > 10 ? "key num large" : "key num" }, fmt(n));
    b.addEventListener("click", () => set(appendToken(getInput().value, String(n))));
    return b;
  });
  const key = (label, onclick, cls = "key", aria = null) => el("button", { type: "button", class: cls, onclick, "aria-label": aria }, label);
  pad.append(
    el("div", { class: "keypad-row nums" }, numberButtons),
    el("div", { class: "keypad-row ops" },
      ["+", "−", "×", "÷", "(", ")"].map((op) => key(op, () => set(appendToken(getInput().value, op)), "key op"))),
    el("div", { class: "keypad-row edit" },
      key("⌫", () => set(removeLastToken(getInput().value)), "key edit", t("keypad-back")),
      key(t("keypad-clear"), () => set(""), "key edit")));

  // Apaga los números que ya se han usado tantas veces como salen.
  function refresh() {
    const uses = numberUses(getInput().value);
    const seen = {};
    numbers.forEach((n, i) => {
      seen[n] = (seen[n] || 0) + 1;
      numberButtons[i].disabled = seen[n] <= (uses[n] || 0);
    });
  }
  pad.refresh = refresh;
  refresh();
  return pad;
}

// --- Respuestas ---

function renderAnswers(game, r, board) {
  const letters = r.type === "letters";
  const inputs = {};
  const items = {};
  // Un solo teclado, debajo del jugador que se está rellenando.
  let active = game.players[0];
  let pad = null;
  // Al tocar el campo de otro jugador, el teclado se mueve debajo de él.
  const activate = (p) => {
    if (letters || active === p) return;
    active = p;
    items[p].append(pad);
    pad.refresh();
  };
  const list = el("ul", { class: "answers" }, game.players.map((p, i) => {
    const preview = el("p", { class: "preview" });
    const input = el("input", {
      class: "input",
      id: `ans-${i}`,
      value: r.answers[p] || "",
      placeholder: letters ? t("word-placeholder") : t("expr-placeholder"),
      autocomplete: "off",
      autocapitalize: "off",
      spellcheck: "false",
      // En cifras se usa el teclado de la pantalla, así que no se abre el del móvil.
      inputmode: letters ? null : "none",
      oninput: (e) => {
        r.answers[p] = e.target.value;
        save();
        if (!letters) {
          preview.textContent = previewExpression(e.target.value, r.numbers);
          pad?.refresh();
        }
      },
      onfocus: () => activate(p),
      onclick: () => activate(p),
    });
    inputs[p] = input;
    if (!letters) preview.textContent = previewExpression(r.answers[p] || "", r.numbers);
    const item = el("li", {}, el("label", { for: `ans-${i}` }, p), input, letters ? null : preview);
    items[p] = item;
    return item;
  }));
  if (!letters) {
    pad = keypad(r.numbers, () => inputs[active]);
    items[active].append(pad);
    pad.refresh();
  }

  const status = el("p", { class: "hint" });
  const check = el("button", { class: "btn big", type: "button", onclick: async () => {
    if (letters) {
      check.disabled = true;
      status.textContent = t("loading-dict");
      try {
        await loadDictionary(r.lang);
      } catch (e) {
        status.textContent = t("dict-error");
        check.disabled = false;
        return;
      }
    }
    setPhase("results");
  } }, t("check"));

  show(roundHeader(game),
    el("div", { class: "card" }, board),
    el("div", { class: "card" },
      el("h2", {}, t("answers")),
      el("p", { class: "hint" }, letters ? t("answers-help-letters") : t("answers-help-numbers")),
      list),
    check, status, footerLinks());
  // Precarga el diccionario mientras escriben.
  if (letters) loadDictionary(r.lang).catch(() => {});
  inputs[game.players[0]]?.focus();
}

function previewExpression(text, numbers) {
  if (!String(text).trim()) return "";
  const res = checkExpression(text, numbers);
  return res.ok ? `= ${fmt(res.value)}` : expressionError(res);
}

function expressionError(res) {
  const vars = { ...res, n: res.n != null ? fmt(res.n) : "", a: res.a != null ? fmt(res.a) : "", b: res.b != null ? fmt(res.b) : "" };
  return t(`err-${res.code}`, vars);
}

// --- Resultados ---

function letterResults(r, dict, players) {
  const answers = players.map((p) => {
    const check = checkWord(r.answers[p], r.tiles, dict, r.lang);
    const accepted = check.status === "unknown" && !!r.accepted[p];
    return { name: p, check, accepted, valid: check.status === "ok" || accepted, length: check.length };
  });
  return { answers, score: scoreLetters(answers) };
}

function numberResults(r, players) {
  const answers = players.map((p) => {
    const check = checkExpression(r.answers[p], r.numbers);
    return { name: p, check, valid: check.ok, value: check.ok ? check.value : null };
  });
  return { answers, score: scoreNumbers(answers, r.target) };
}

function renderResults(game, r, board) {
  if (r.type === "letters") {
    loadDictionary(r.lang).then((dict) => showResults(game, r, board, dict)).catch(() => {
      show(roundHeader(game), el("p", { class: "notice" }, t("dict-error")), button(t("retry"), render, "btn big"), footerLinks());
    });
    show(roundHeader(game), el("p", { class: "notice" }, t("loading-dict")));
  } else {
    showResults(game, r, board, null);
  }
}

function showResults(game, r, board, dict) {
  const letters = r.type === "letters";
  const { answers, score } = letters ? letterResults(r, dict, game.players) : numberResults(r, game.players);
  const scored = Object.values(score.points).some((n) => n > 0);

  const rows = el("ul", { class: "results" }, answers.map((a) => {
    const won = score.points[a.name] > 0;
    let what = r.answers[a.name] ? r.answers[a.name].trim() : t("no-answer");
    let status;
    let statusClass = "status";
    if (letters) {
      const c = a.check;
      if (c.status === "ok") { what = c.display; status = t("st-ok", { n: c.length }); statusClass += " ok"; }
      else if (c.status === "unknown") {
        status = el("span", {}, a.accepted ? t("st-accepted", { n: c.length }) : t("st-unknown"),
          el("label", { class: "accept" }, el("input", {
            type: "checkbox",
            checked: a.accepted,
            onchange: (e) => { r.accepted[a.name] = e.target.checked; save(); showResults(game, r, board, dict); },
          }), t("accept")));
        statusClass += a.accepted ? " ok" : " unknown";
      } else if (c.status === "letters") { status = t("st-letters", { letters: c.missing.join(", ") }); statusClass += " bad"; }
      else if (c.status === "invalid") { status = t("st-invalid"); statusClass += " bad"; }
      else status = "";
    } else {
      const c = a.check;
      if (c.ok) {
        const d = Math.abs(c.value - r.target);
        status = d === 0 ? t("st-exact", { value: fmt(c.value) }) : t("st-close", { value: fmt(c.value), d: fmt(d) });
        statusClass += " ok";
      } else if (c.code === "empty") status = "";
      else { status = expressionError(c); statusClass += " bad"; }
    }
    return el("li", {},
      el("span", { class: "who" }, a.name),
      el("span", { class: won ? "pts win" : "pts" }, t("round-points", { n: score.points[a.name] || 0 })),
      el("span", { class: "what" }, what),
      status ? el("span", { class: statusClass }, status) : null);
  }));

  const solutions = el("div", { class: "card" });
  if (letters) fillWordSolutions(solutions, r, dict, answers);
  else fillNumberSolution(solutions, r);

  const last = game.index + 1 >= game.types.length;
  const totals = Object.fromEntries(game.players.map((p) => [p, (game.scores[p] || 0) + (score.points[p] || 0)]));

  show(roundHeader(game),
    el("div", { class: "card" }, board),
    el("div", { class: "card" },
      el("h2", {}, t("results")),
      scored ? null : el("p", { class: "hint" }, t("nobody-scores")),
      rows),
    solutions,
    el("div", { class: "card" }, el("h2", {}, t("scoreboard")), scoresView(game.players, totals)),
    button(last ? t("final-standings") : t("next-round"), () => {
      // Los puntos se apuntan al pasar de ronda, así aún se pueden aceptar palabras.
      for (const p of game.players) game.scores[p] = (game.scores[p] || 0) + (score.points[p] || 0);
      if (last) {
        game.finished = true;
        save();
        go({ screen: "final" });
      } else {
        game.index++;
        game.round = newRound(game);
        save();
        render();
      }
    }, "btn big"),
    footerLinks());
}

function fillWordSolutions(box, r, dict, answers) {
  const found = findWords(r.tiles, dict, 10);
  const byPlayer = {};
  for (const a of answers) {
    if (a.valid && a.check.norm) (byPlayer[a.check.norm] = byPlayer[a.check.norm] || []).push(a.name);
  }
  // Las palabras de los jugadores que no estén entre las mostradas también se enseñan.
  const shown = [...found.words];
  for (const a of answers) {
    if (a.valid && !shown.some((w) => w.norm === a.check.norm)) {
      shown.push({ norm: a.check.norm, forms: [a.check.display || a.check.norm.toLowerCase()], length: a.length });
    }
  }
  shown.sort((x, y) => y.length - x.length);
  box.append(el("h2", {}, t("best-words")));
  if (!found.total && !shown.length) {
    box.append(el("p", { class: "hint" }, t("no-words")));
    return;
  }
  box.append(
    el("ul", { class: "words" }, shown.map((w) => {
      const names = byPlayer[w.norm];
      return el("li", { class: names ? "mine" : null },
        el("span", {}, el("span", { class: "word" }, w.forms.join(" / ")), " ", el("span", { class: "len" }, `${w.length}`),
          names ? el("span", { class: "len" }, ` · ${t("from-players", { names: joinNames(names) })}`) : null),
        tilesView(r.tiles, { small: true, used: usedTileIndexes(w.norm, r.tiles) }));
    })),
    el("p", { class: "hint" }, t("words-total", { n: fmt(found.total) })));
}

function fillNumberSolution(box, r) {
  box.append(el("h2", {}, t("solution")));
  const body = el("div", {}, el("p", { class: "hint" }, t("solving")));
  box.append(body);
  solveAsync(r.numbers, r.target).then((sol) => body.replaceChildren(...solutionView(sol)));
}

function solutionView(sol) {
  if (!sol.steps.length) return [el("p", {}, t("target-in-numbers"))];
  return [
    el("p", {}, sol.distance === 0 ? t("exact-solution") : t("closest-solution", { value: fmt(sol.value), d: fmt(sol.distance) })),
    stepsView(sol.steps),
  ];
}

function scoresView(players, scores) {
  return el("ol", { class: "scores" }, ranking(players, scores).map((r) =>
    el("li", { class: r.place === 1 && r.points > 0 ? "first" : null },
      el("span", { class: "place" }, `${r.place}.`), el("span", {}, r.name), el("span", { class: "pts" }, pts(r.points)))));
}

// ---------- Clasificación final ----------

function renderFinal() {
  const game = state.game;
  if (!game) return go({ screen: "menu" });
  const rank = ranking(game.players, game.scores);
  const winners = rank.filter((r) => r.place === 1).map((r) => r.name);
  show(
    el("div", { class: "card" },
      el("h2", {}, t("final")),
      el("p", { class: "verdict" }, winners.length > 1 ? t("tie", { names: joinNames(winners) }) : t("winner", { names: winners[0] })),
      scoresView(game.players, game.scores)),
    el("div", { class: "menu-actions" },
      button(t("rematch"), () => {
        // Misma configuración que la partida terminada.
        Object.assign(state.settings, { players: [...game.players], time: game.time, wordLang: game.wordLang, numbersLevel: game.numbersLevel });
        newGame();
      }, "btn big"),
      button(t("menu"), () => { state.game = null; save(); go({ screen: "menu" }); }, "btn big ghost")),
  );
}

// ---------- Práctica ----------

function startPractice(type) {
  const s = state.settings;
  if (type === "letters") {
    practice = { lang: s.wordLang, tiles: [], bags: newBags(s.wordLang), hint: 0, revealed: false, tried: null };
    loadDictionary(s.wordLang).catch(() => {});
    go({ screen: "practice-letters" });
  } else {
    practice = { level: s.numbersLevel, numbers: [], target: null, hint: 0, revealed: false, tried: null, solution: null };
    go({ screen: "practice-numbers" });
  }
}

function practiceHeader(title) {
  return el("div", { class: "round-head" }, el("p", { class: "label" }, title),
    button(t("menu"), () => go({ screen: "menu" }), "link-btn"));
}

function renderPracticeLetters() {
  const p = practice;
  const full = p.tiles.length === TILE_COUNT;
  const parts = [practiceHeader(t("practice-title-letters")), el("div", { class: "card" }, tilesView(p.tiles))];

  if (!full) {
    const ok = allowedKinds(p.tiles);
    const pick = (kind) => { p.tiles.push(drawTile(p.bags, kind)); render(); };
    parts.push(el("div", { class: "card" },
      el("p", { class: "hint center" }, t("draw-letters-first")),
      el("div", { class: "pick" },
        el("button", { class: "btn", type: "button", disabled: !ok.vowel, onclick: () => pick("vowel") }, t("vowel")),
        el("button", { class: "btn", type: "button", disabled: !ok.consonant, onclick: () => pick("consonant") }, t("consonant"))),
      button(t("random-letters"), () => {
        while (p.tiles.length < TILE_COUNT) {
          const k = allowedKinds(p.tiles);
          const kind = k.vowel && (!k.consonant || Math.random() < 0.42) ? "vowel" : "consonant";
          p.tiles.push(drawTile(p.bags, kind));
        }
        render();
      }, "link-btn")));
    return show(...parts);
  }

  const box = el("div", { class: "card" }, el("p", { class: "hint" }, t("loading-dict")));
  parts.push(box, el("div", { class: "practice-actions" },
    button(t("new"), () => startPractice("letters"), "btn big"),
    button(t("menu"), () => go({ screen: "menu" }), "btn big ghost")));
  show(...parts);

  loadDictionary(p.lang).then((dict) => {
    const found = findWords(p.tiles, dict, 10);
    const input = el("input", { class: "input", placeholder: t("word-placeholder"), value: p.tried || "", autocomplete: "off", autocapitalize: "off", spellcheck: "false" });
    const result = el("p", { class: "preview" });
    const check = () => {
      p.tried = input.value;
      const c = checkWord(input.value, p.tiles, dict, p.lang);
      const msg = { ok: t("st-ok", { n: c.length }), unknown: t("st-unknown"), invalid: t("st-invalid"), empty: "" };
      result.textContent = c.status === "letters" ? t("st-letters", { letters: c.missing.join(", ") }) : msg[c.status];
      result.className = `preview status ${c.status === "ok" ? "ok" : c.status === "unknown" ? "unknown" : "bad"}`;
      if (c.status === "ok") result.textContent = `${c.display} · ${result.textContent}`;
    };
    const hints = [];
    if (p.hint >= 1) hints.push(found.best ? t("hint-length", { n: found.best }) : t("no-words"));
    if (p.hint >= 2 && found.words[0]) hints.push(t("hint-first", { l: found.words[0].norm[0] }));
    if (p.hint >= 3) hints.push(t("hint-more"));

    box.replaceChildren(
      el("h2", {}, t("try-word")),
      el("form", { class: "row", onsubmit: (e) => { e.preventDefault(); check(); } }, input, el("button", { class: "btn", type: "submit" }, t("try"))),
      result,
      ...hints.map((h) => el("p", { class: "notice" }, h)),
      el("div", { class: "practice-actions", style: "margin-top: 12px" },
        button(t("hint"), () => { p.hint++; p.tried = input.value; render(); }, "btn ghost"),
        button(t("show-solutions"), () => { p.revealed = true; p.tried = input.value; render(); }, "btn ghost")));
    if (p.tried) check();
    if (p.revealed) {
      const sol = el("div", {});
      fillWordSolutions(sol, p, dict, []);
      box.append(sol);
    }
  }).catch(() => box.replaceChildren(el("p", { class: "notice" }, t("dict-error")), button(t("retry"), render, "btn")));
}

function renderPracticeNumbers() {
  const p = practice;
  const parts = [practiceHeader(t("practice-title-numbers"))];

  if (!p.numbers.length) {
    const draw = (res) => {
      Object.assign(p, res);
      p.solution = null;
      solveAsync(p.numbers, p.target).then((sol) => { p.solution = sol; if (view.screen === "practice-numbers" && practice === p) render(); });
      render();
    };
    parts.push(el("div", { class: "card" },
      p.level === "easy"
        ? button(t("draw"), () => draw(drawEasyNumbers()), "btn big")
        : el("div", {},
          el("p", { class: "verdict" }, t("how-many-large-free")),
          el("div", { class: "pick five" }, [0, 1, 2, 3, 4].map((n) => button(String(n), () => draw(drawNumbers(n)), "btn"))))));
    return show(...parts);
  }

  const input = el("input", { class: "input", placeholder: t("expr-placeholder"), value: p.tried || "", autocomplete: "off", autocapitalize: "off", spellcheck: "false", inputmode: "none", oninput: () => { pad.refresh(); check(); } });
  const result = el("p", { class: "preview" });
  const check = () => {
    p.tried = input.value;
    const c = checkExpression(input.value, p.numbers);
    if (c.ok) {
      const d = Math.abs(c.value - p.target);
      result.textContent = d === 0 ? t("st-exact", { value: fmt(c.value) }) : t("st-close", { value: fmt(c.value), d: fmt(d) });
      result.className = "preview status ok";
    } else {
      result.textContent = c.code === "empty" ? "" : expressionError(c);
      result.className = "preview status bad";
    }
  };

  const pad = keypad(p.numbers, () => input);
  const sol = p.solution;
  const hints = [];
  if (p.hint >= 1) hints.push(sol ? (sol.distance === 0 ? t("hint-exact") : t("hint-closest", { value: fmt(sol.value) })) : t("solving"));
  if (p.hint >= 2 && sol && sol.steps[0]) hints.push(t("hint-step", { step: `${fmt(sol.steps[0].a)} ${sol.steps[0].op} ${fmt(sol.steps[0].b)} = ${fmt(sol.steps[0].value)}` }));
  if (p.hint >= 3) hints.push(t("hint-more"));

  parts.push(
    el("div", { class: "card" }, numbersView(p.numbers, p.target)),
    el("div", { class: "card" },
      el("h2", {}, t("try-expr")),
      el("form", { class: "row", onsubmit: (e) => { e.preventDefault(); check(); } }, input, el("button", { class: "btn", type: "submit" }, t("try"))),
      result,
      pad,
      hints.map((h) => el("p", { class: "notice" }, h)),
      el("div", { class: "practice-actions", style: "margin-top: 12px" },
        button(t("hint"), () => { p.hint++; p.tried = input.value; render(); }, "btn ghost"),
        button(t("show-solutions"), () => { p.revealed = true; p.tried = input.value; render(); }, "btn ghost")),
      p.revealed ? el("div", {}, el("h2", { style: "margin-top: 16px" }, t("solution")), sol ? solutionView(sol) : el("p", { class: "hint" }, t("solving"))) : null),
    el("div", { class: "practice-actions" },
      button(t("new"), () => startPractice("numbers"), "btn big"),
      button(t("menu"), () => go({ screen: "menu" }), "btn big ghost")));
  show(...parts);
  if (p.tried) check();
}

// Siempre se empieza en el menú; desde ahí se puede continuar la partida guardada
// (si había una ronda con el tiempo en marcha, el tiempo sigue contando).
render();
