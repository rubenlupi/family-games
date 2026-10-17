I18N.add({
  es: {
    "title.page": "Crípticos · Family Games",
    "letter": "Letra {n}",
    "no-hints": "sin pistas 🤯",
    "one-hint": "con 1 pista",
    "n-hints": "con {n} pistas",
    "solution": "Solución",
    "correct": "¡Correcto! Resuelta {hints}",
    "missing": "Faltan letras.",
    "wrong": "No es correcto. ¡Sigue intentándolo!",
    "confirm-solution": "¿Seguro que quieres ver la solución?",
    "delete": "Borrar",
  },
  en: {
    "title.page": "Cryptics · Family Games",
    "back": "← Back to games",
    "title": "🧩 Cryptics",
    "prev": "Previous clue",
    "next": "Next clue",
    "random": "Random unsolved clue",
    "hints": "💡 Hints",
    "check": "Check",
    "hint.definition": "Highlight the definition",
    "hint.type": "Wordplay type",
    "hint.letter": "Reveal a letter",
    "hint.solution": "See the answer",
    "go-next": "Next clue →",
    "letter": "Letter {n}",
    "no-hints": "without hints 🤯",
    "one-hint": "with 1 hint",
    "n-hints": "with {n} hints",
    "solution": "Answer",
    "correct": "Correct! Solved {hints}",
    "missing": "Some letters are missing.",
    "wrong": "Not quite. Keep trying!",
    "confirm-solution": "Are you sure you want to see the answer?",
    "delete": "Delete",
  },
});

const { t } = I18N;
const EN = I18N.lang === "en";
document.title = t("title.page");

// Cada idioma tiene sus propias pistas, teclado y progreso guardado.
const CLUES = EN ? CLUES_EN : CLUES_ES;
const STORAGE_KEY = EN ? "family-games:cripticos:en" : "family-games:cripticos";
const KEY_ROWS = ["QWERTYUIOP", EN ? "ASDFGHJKL" : "ASDFGHJKLÑ", "ZXCVBNM"];
const LETTER = EN ? /^[A-Z]$/ : /^[A-ZÑ]$/;

const $ = (id) => document.getElementById(id);

// progress[id] = { solved, hints, revealed: [índices], showDefinition, showType }
const state = loadState();
let current = null; // { clue, letters, cursor }

// ---------- Progreso guardado en este navegador ----------

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && saved.progress) return saved;
  } catch (e) { /* sin almacenamiento */ }
  return { index: 0, progress: {} };
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* ignorar */ }
}

function progressOf(clue) {
  if (!state.progress[clue.id]) {
    state.progress[clue.id] = { solved: false, hints: 0, revealed: [], showDefinition: false, showType: false };
  }
  return state.progress[clue.id];
}

// ---------- Pintar la pista ----------

function escapeHtml(text) {
  return text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function renderClueText(clue, showDefinition) {
  let html = escapeHtml(clue.clue);
  if (showDefinition) {
    clue.definition.forEach((d) => {
      html = html.replace(escapeHtml(d), `<mark>${escapeHtml(d)}</mark>`);
    });
  }
  $("clue").innerHTML = html;
}

function loadClue(index) {
  state.index = (index + CLUES.length) % CLUES.length;
  saveState();

  const clue = CLUES[state.index];
  const p = progressOf(clue);
  const letters = clue.answer.split("").map((ch, i) => (p.solved || p.revealed.includes(i) ? ch : ""));
  current = { clue, letters, cursor: 0 };
  moveCursor(0);

  $("hint-menu").classList.add("hidden");
  $("message").textContent = "";
  render();
}

function render() {
  const { clue, letters, cursor } = current;
  const p = progressOf(clue);

  // Ver la solución no cuenta como resuelta.
  const solvedCount = CLUES.filter((c) => state.progress[c.id]?.solved && !state.progress[c.id].gaveUp).length;
  $("counter").textContent = `${state.index + 1} / ${CLUES.length} · ✓ ${solvedCount}`;

  renderClueText(clue, p.showDefinition || p.solved);

  const type = $("clue-type");
  type.textContent = clue.type;
  type.classList.toggle("hidden", !(p.showType || p.solved));

  const boxes = $("boxes");
  boxes.innerHTML = "";
  boxes.classList.toggle("solved", p.solved);
  boxes.style.setProperty("--n", letters.length);
  letters.forEach((ch, i) => {
    const box = document.createElement("button");
    box.type = "button";
    box.className = "box";
    box.textContent = ch;
    box.setAttribute("aria-label", t("letter", { n: i + 1 }));
    if (p.revealed.includes(i)) box.classList.add("revealed");
    if (i === cursor && !p.solved) box.classList.add("active");
    box.onclick = () => {
      if (!p.solved && !p.revealed.includes(i)) {
        current.cursor = i;
        render();
      }
    };
    boxes.append(box);
  });

  $("explanation").textContent = clue.explanation;
  $("explanation").classList.toggle("hidden", !p.solved);
  $("actions").classList.toggle("hidden", p.solved);
  $("go-next").classList.toggle("hidden", !p.solved);
  $("keyboard").classList.toggle("hidden", p.solved);

  if (p.solved) {
    $("hint-menu").classList.add("hidden");
    const hints = p.hints === 0 ? t("no-hints") : p.hints === 1 ? t("one-hint") : t("n-hints", { n: p.hints });
    $("message").textContent = p.gaveUp ? t("solution") : t("correct", { hints });
  }

  // Las ayudas ya usadas (o que ya no aportan nada) se desactivan.
  const free = freeIndexes();
  document.querySelectorAll("[data-hint]").forEach((btn) => {
    const kind = btn.dataset.hint;
    btn.disabled =
      (kind === "definition" && p.showDefinition) ||
      (kind === "type" && p.showType) ||
      (kind === "letter" && free.length <= 1);
  });
}

// ---------- Escribir ----------

function freeIndexes() {
  const p = progressOf(current.clue);
  return current.letters.map((_, i) => i).filter((i) => !p.revealed.includes(i));
}

// Coloca el cursor en la primera casilla libre a partir de `from`, en la dirección `step`.
function moveCursor(from, step = 1) {
  const free = freeIndexes();
  if (!free.length) return;
  let i = from;
  for (let n = 0; n < current.letters.length; n++) {
    if (free.includes(i)) { current.cursor = i; return; }
    i += step;
    if (i < 0 || i >= current.letters.length) break;
  }
}

function typeLetter(ch) {
  const p = progressOf(current.clue);
  if (p.solved) return;
  current.letters[current.cursor] = ch;
  moveCursor(Math.min(current.cursor + 1, current.letters.length - 1));
  $("message").textContent = "";
  render();
}

function backspace() {
  const p = progressOf(current.clue);
  if (p.solved) return;
  if (current.letters[current.cursor] === "") {
    moveCursor(Math.max(current.cursor - 1, 0), -1);
  }
  if (!p.revealed.includes(current.cursor)) current.letters[current.cursor] = "";
  render();
}

function check() {
  const p = progressOf(current.clue);
  const guess = current.letters.join("");
  if (guess.length < current.clue.answer.length) {
    $("message").textContent = t("missing");
    return;
  }
  if (guess === current.clue.answer) {
    p.solved = true;
    saveState();
    render();
  } else {
    $("message").textContent = t("wrong");
    const boxes = $("boxes");
    boxes.classList.remove("wrong");
    void boxes.offsetWidth; // reinicia la animación
    boxes.classList.add("wrong");
  }
}

// ---------- Ayudas ----------

function useHint(kind) {
  const p = progressOf(current.clue);
  if (kind === "definition") {
    p.showDefinition = true;
  } else if (kind === "type") {
    p.showType = true;
  } else if (kind === "letter") {
    // Revela la primera letra que esté vacía o mal escrita.
    const answer = current.clue.answer;
    const free = freeIndexes();
    const target = free.find((i) => current.letters[i] !== answer[i]) ?? free[0];
    p.revealed.push(target);
    current.letters[target] = answer[target];
    moveCursor(current.cursor);
  } else if (kind === "solution") {
    if (!confirm(t("confirm-solution"))) return;
    p.solved = true;
    p.gaveUp = true;
    current.letters = current.clue.answer.split("");
  }
  p.hints++;
  saveState();
  render();
}

// ---------- Teclado ----------

function buildKeyboard() {
  const kb = $("keyboard");
  KEY_ROWS.forEach((row, r) => {
    const div = document.createElement("div");
    div.className = "kb-row";
    row.split("").forEach((ch) => {
      const key = document.createElement("button");
      key.type = "button";
      key.textContent = ch;
      key.onclick = () => typeLetter(ch);
      div.append(key);
    });
    if (r === KEY_ROWS.length - 1) {
      const del = document.createElement("button");
      del.type = "button";
      del.className = "wide";
      del.textContent = "⌫";
      del.setAttribute("aria-label", t("delete"));
      del.onclick = backspace;
      div.append(del);
    }
    kb.append(div);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const key = e.key.toUpperCase();
  if (LETTER.test(key)) { typeLetter(key); e.preventDefault(); }
  else if (e.key === "Backspace") { backspace(); e.preventDefault(); }
  else if (e.key === "Enter") {
    if (progressOf(current.clue).solved) loadClue(state.index + 1);
    else check();
  }
  else if (e.key === "ArrowLeft") { moveCursor(Math.max(current.cursor - 1, 0), -1); render(); }
  else if (e.key === "ArrowRight") { moveCursor(Math.min(current.cursor + 1, current.letters.length - 1)); render(); }
});

$("check").onclick = check;
$("hints-toggle").onclick = () => $("hint-menu").classList.toggle("hidden");
document.querySelectorAll("[data-hint]").forEach((btn) => {
  btn.onclick = () => useHint(btn.dataset.hint);
});
$("prev").onclick = () => loadClue(state.index - 1);
$("next").onclick = () => loadClue(state.index + 1);
$("go-next").onclick = () => loadClue(state.index + 1);
$("random").onclick = () => {
  const pending = CLUES.map((c, i) => i).filter((i) => i !== state.index && !state.progress[CLUES[i].id]?.solved);
  if (pending.length) loadClue(pending[Math.floor(Math.random() * pending.length)]);
};

buildKeyboard();
loadClue(state.index);
