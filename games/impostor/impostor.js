I18N.add({
  es: {
    "title.page": "El Impostor · Family Games",
    "remove": "Quitar a {name}",
    "progress": "Jugador {n} de {total}",
    "turn-of": "Turno de",
    "pass-to": "Pásale el móvil a",
    "you-impostor": "Eres el impostor",
    "hint": "Pista: {category}",
    "blend-in": "Disimula y descubre la palabra.",
    "category": "Categoría: {category}",
    "impostor-was": "El impostor era",
    "impostors-were": "Los impostores eran",
    "and": " y ",
  },
  en: {
    "title.page": "The Impostor · Family Games",
    "back": "← Back to games",
    "title": "🕵️ The Impostor",
    "players": "Players",
    "name": "Name",
    "add": "Add",
    "min-players": "At least 3 players.",
    "impostors": "Impostors",
    "imp-less": "Fewer impostors",
    "imp-more": "More impostors",
    "categories": "Categories",
    "hint-toggle": "The impostor sees the category as a hint",
    "start": "Start game",
    "deal-show": "See my word",
    "deal-next": "Hide and pass",
    "first": "Starting player",
    "play-hint": "Taking turns, everyone says one word related to the secret word. Then vote for who you think the impostor is.",
    "reveal": "Reveal impostor",
    "word-was": "The word was",
    "again": "Another round",
    "settings": "Change settings",
    "remove": "Remove {name}",
    "progress": "Player {n} of {total}",
    "turn-of": "Your turn,",
    "pass-to": "Pass the phone to",
    "you-impostor": "You are the impostor",
    "hint": "Hint: {category}",
    "blend-in": "Blend in and figure out the word.",
    "category": "Category: {category}",
    "impostor-was": "The impostor was",
    "impostors-were": "The impostors were",
    "and": " and ",
  },
  fr: {
    "title.page": "L'Imposteur · Family Games",
    "back": "← Retour aux jeux",
    "title": "🕵️ L'Imposteur",
    "players": "Joueurs",
    "name": "Prénom",
    "add": "Ajouter",
    "min-players": "3 joueurs minimum.",
    "impostors": "Imposteurs",
    "imp-less": "Moins d'imposteurs",
    "imp-more": "Plus d'imposteurs",
    "categories": "Catégories",
    "hint-toggle": "L'imposteur voit la catégorie comme indice",
    "start": "Commencer la partie",
    "deal-show": "Voir mon mot",
    "deal-next": "Cacher et passer",
    "first": "Commence",
    "play-hint": "Chacun son tour, chacun dit un mot lié au mot secret. Ensuite, votez pour celui que vous pensez être l'imposteur.",
    "reveal": "Révéler l'imposteur",
    "word-was": "Le mot était",
    "again": "Nouvelle manche",
    "settings": "Modifier les réglages",
    "remove": "Retirer {name}",
    "progress": "Joueur {n} sur {total}",
    "turn-of": "À toi,",
    "pass-to": "Passe le téléphone à",
    "you-impostor": "Tu es l'imposteur",
    "hint": "Indice : {category}",
    "blend-in": "Passe inaperçu et devine le mot.",
    "category": "Catégorie : {category}",
    "impostor-was": "L'imposteur était",
    "impostors-were": "Les imposteurs étaient",
    "and": " et ",
  },
});

const { t } = I18N;
document.title = t("title.page");

// Las palabras van en el idioma elegido.
const CATEGORIES = { es: CATEGORIES_ES, en: CATEGORIES_EN, fr: CATEGORIES_FR }[I18N.lang];

const STORAGE_KEY = "family-games:impostor";
const MIN_PLAYERS = 3;

const $ = (id) => document.getElementById(id);

const settings = loadSettings();
let round = null;

// ---------- Ajustes guardados en este navegador ----------

function loadSettings() {
  const defaults = {
    players: [],
    impostors: 1,
    categories: Object.keys(CATEGORIES),
    hint: false,
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      const categories = (saved.categories || []).filter((c) => c in CATEGORIES);
      return { ...defaults, ...saved, categories: categories.length ? categories : defaults.categories };
    }
  } catch (e) { /* sin almacenamiento: usamos los valores por defecto */ }
  return defaults;
}

function saveSettings() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (e) { /* ignorar */ }
}

function maxImpostors() {
  // Siempre tiene que haber más jugadores normales que impostores.
  return Math.max(1, Math.floor((settings.players.length - 1) / 2));
}

// ---------- Pantalla de ajustes ----------

function renderSetup() {
  const list = $("player-list");
  list.innerHTML = "";
  settings.players.forEach((name, i) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = name;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "✕";
    remove.setAttribute("aria-label", t("remove", { name }));
    remove.onclick = () => {
      settings.players.splice(i, 1);
      update();
    };
    li.append(span, remove);
    list.append(li);
  });

  settings.impostors = Math.min(settings.impostors, maxImpostors());
  $("imp-count").textContent = settings.impostors;
  $("imp-less").disabled = settings.impostors <= 1;
  $("imp-more").disabled = settings.impostors >= maxImpostors();

  const chips = $("category-list");
  chips.innerHTML = "";
  Object.keys(CATEGORIES).forEach((cat) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.textContent = cat;
    chip.setAttribute("aria-pressed", settings.categories.includes(cat));
    chip.onclick = () => {
      if (settings.categories.includes(cat)) {
        if (settings.categories.length === 1) return; // al menos una categoría
        settings.categories = settings.categories.filter((c) => c !== cat);
      } else {
        settings.categories.push(cat);
      }
      update();
    };
    chips.append(chip);
  });

  $("hint-toggle").checked = settings.hint;
  $("start").disabled = settings.players.length < MIN_PLAYERS;
}

function update() {
  saveSettings();
  renderSetup();
}

$("add-player").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("player-name");
  const name = input.value.trim();
  if (name && !settings.players.includes(name)) {
    settings.players.push(name);
    update();
  }
  input.value = "";
  input.focus();
});

$("imp-less").onclick = () => { settings.impostors--; update(); };
$("imp-more").onclick = () => { settings.impostors++; update(); };
$("hint-toggle").onchange = (e) => { settings.hint = e.target.checked; update(); };

// ---------- Ronda ----------

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newRound() {
  const category = pick(settings.categories);
  const impostors = shuffle(settings.players).slice(0, settings.impostors);
  const innocents = settings.players.filter((p) => !impostors.includes(p));
  round = {
    category,
    word: pick(CATEGORIES[category]),
    impostors,
    first: pick(innocents), // empieza alguien que conoce la palabra
    turn: 0,
  };
  showDealTurn();
  show("screen-deal");
}

function show(screenId) {
  ["screen-setup", "screen-deal", "screen-play", "screen-result"].forEach((id) => {
    $(id).classList.toggle("hidden", id !== screenId);
  });
  window.scrollTo(0, 0);
}

function showDealTurn() {
  const name = settings.players[round.turn];
  $("deal-progress").textContent = t("progress", { n: round.turn + 1, total: settings.players.length });
  // El primero ya tiene el móvil: no tiene sentido decirle que se lo pase.
  $("deal-label").textContent = t(round.turn === 0 ? "turn-of" : "pass-to");
  $("deal-name").textContent = name;
  $("deal-pass").classList.remove("hidden");
  $("deal-secret").classList.add("hidden");
}

$("start").onclick = newRound;

$("deal-show").onclick = () => {
  const name = settings.players[round.turn];
  const isImpostor = round.impostors.includes(name);
  const word = $("deal-word");
  word.textContent = isImpostor ? t("you-impostor") : round.word;
  word.classList.toggle("impostor", isImpostor);

  let extra = "";
  if (isImpostor && settings.hint) extra = t("hint", { category: round.category });
  else if (isImpostor) extra = t("blend-in");
  else extra = t("category", { category: round.category });
  $("deal-extra").textContent = extra;

  $("deal-pass").classList.add("hidden");
  $("deal-secret").classList.remove("hidden");
};

$("deal-next").onclick = () => {
  round.turn++;
  if (round.turn < settings.players.length) {
    showDealTurn();
  } else {
    $("first-player").textContent = round.first;
    show("screen-play");
  }
};

$("reveal").onclick = () => {
  $("result-label").textContent = t(round.impostors.length > 1 ? "impostors-were" : "impostor-was");
  $("result-impostors").textContent = round.impostors.join(t("and"));
  $("result-word").textContent = round.word;
  show("screen-result");
};

$("again").onclick = newRound;
$("settings").onclick = () => show("screen-setup");

renderSetup();
