// Idiomas de la web (español / inglés) y botón de ayuda.
//
// - Los textos fijos del HTML llevan data-i18n="clave" (texto), data-i18n-html (HTML),
//   data-i18n-aria (aria-label) o data-i18n-placeholder. El HTML trae el texto en español,
//   que es lo que se ve si falta una traducción.
// - Cada juego añade sus textos con I18N.add({ es: {...}, en: {...} }) y usa I18N.t("clave").
// - Si la página tiene un elemento .tools se pintan ahí los botones de ayuda e idioma.
//   La ayuda que se muestra depende de <body data-game="...">.
const I18N = (() => {
  const STORAGE_KEY = "family-games:lang";
  const LANGS = ["es", "en"];

  const strings = {
    es: {
      "tools.help": "Ayuda",
      "tools.lang": "EN",
      "tools.lang.aria": "Switch to English",
      "help.close": "Cerrar",
    },
    en: {
      "tools.help": "Help",
      "tools.lang": "ES",
      "tools.lang.aria": "Cambiar a español",
      "help.close": "Close",
    },
  };

  function detect() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (e) { /* sin almacenamiento */ }
    // Por defecto español; inglés solo si el navegador prefiere inglés y no tiene español.
    const prefs = (navigator.languages || [navigator.language || ""]).map((l) => l.toLowerCase());
    if (prefs.some((l) => l.startsWith("es"))) return "es";
    return prefs[0]?.startsWith("en") ? "en" : "es";
  }

  const lang = detect();
  document.documentElement.lang = lang;

  function add(dict) {
    LANGS.forEach((l) => Object.assign(strings[l], dict[l] || {}));
  }

  // t("clave", { name: "Ana" }) sustituye {name} en el texto.
  function t(key, vars = {}) {
    const text = strings[lang][key] ?? strings.es[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (m, v) => (v in vars ? vars[v] : m));
  }

  function has(key) {
    return key in strings[lang];
  }

  function apply(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      if (has(el.dataset.i18n)) el.textContent = t(el.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-html]").forEach((el) => {
      if (has(el.dataset.i18nHtml)) el.innerHTML = t(el.dataset.i18nHtml);
    });
    root.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      if (has(el.dataset.i18nAria)) el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      if (has(el.dataset.i18nPlaceholder)) el.placeholder = t(el.dataset.i18nPlaceholder);
    });
  }

  function setLang(next) {
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* ignorar */ }
    location.reload();
  }

  // ---------- Botones de ayuda e idioma ----------

  function helpHtml(game) {
    if (game !== "home") return t(`help.${game}`);
    // En el panel se explican todos los juegos.
    return t("help.home") + ["reverse", "impostor", "cripticos"].map((g) => t(`help.${g}`)).join("");
  }

  function buildTools() {
    const tools = document.querySelector(".tools");
    if (!tools) return;
    const game = document.body.dataset.game || "home";

    const dialog = document.createElement("dialog");
    dialog.className = "help-dialog";
    dialog.innerHTML = `
      <div class="help-body">${helpHtml(game)}</div>
      <form method="dialog"><button class="btn big">${t("help.close")}</button></form>`;
    // Tocar fuera del cuadro también lo cierra.
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
    document.body.append(dialog);

    const help = document.createElement("button");
    help.type = "button";
    help.className = "tool";
    help.innerHTML = `<span aria-hidden="true">?</span> ${t("tools.help")}`;
    help.onclick = () => dialog.showModal();

    const switcher = document.createElement("button");
    switcher.type = "button";
    switcher.className = "tool";
    switcher.textContent = t("tools.lang");
    switcher.setAttribute("aria-label", t("tools.lang.aria"));
    switcher.onclick = () => setLang(lang === "es" ? "en" : "es");

    tools.append(help, switcher);
  }

  // Los scripts de los juegos se ejecutan antes, así que sus textos ya están añadidos.
  document.addEventListener("DOMContentLoaded", () => {
    apply();
    buildTools();
  });

  return { lang, t, add, apply };
})();

// ---------- Ayuda de cada juego ----------

I18N.add({
  es: {
    "help.home": `
      <h2>🎲 Family Games</h2>
      <p>Juegos para jugar en familia con un solo móvil. Elige un juego en el panel; dentro de cada uno
        tienes el botón <strong>? Ayuda</strong> con sus reglas. Con el botón <strong>EN</strong> cambias la web a inglés.</p>`,
    "help.reverse": `
      <h2>🔄 Reverse Words</h2>
      <p>Un jugador graba una palabra y el otro la oye <strong>al revés</strong>. Tiene que imitar ese sonido
        tan raro y, cuando la app le da la vuelta a su imitación, adivinar qué palabra era.</p>
      <p><strong>Jugadores:</strong> 2 o más, por parejas. Hace falta dar permiso al micrófono.</p>
      <ol>
        <li><strong>Jugador 1:</strong> toca la tarjeta para ver la palabra (sin que la vea el otro), toca el micro y dila en voz alta. Toca otra vez para parar y pasa el móvil.</li>
        <li><strong>Jugador 2:</strong> escucha la grabación al revés todas las veces que quiera y grábate imitándola lo mejor posible.</li>
        <li>La app le da la vuelta a tu imitación: si la has clavado, ¡suena a la palabra original! Intenta adivinarla y toca para ver la solución.</li>
      </ol>
      <p><strong>Consejos:</strong> habla claro y despacio. Las palabras de 2 a 4 sílabas son las más divertidas.
        Si una palabra no te gusta, usa «Cambiar palabra».</p>`,
    "help.impostor": `
      <h2>🕵️ El Impostor</h2>
      <p>Todos reciben la misma palabra secreta… menos el impostor, que no sabe cuál es.
        Los demás tienen que descubrirle y él tiene que disimular.</p>
      <p><strong>Jugadores:</strong> 3 o más, con un solo móvil.</p>
      <ol>
        <li>Añade los jugadores, elige cuántos impostores habrá y las categorías de palabras.</li>
        <li>Pasad el móvil: cada uno toca «Ver mi palabra», la memoriza y la oculta antes de pasarlo.
          Al impostor le sale «Eres el impostor» (y, si lo activas, la categoría como pista).</li>
        <li>Por turnos, empezando por quien diga la app, cada uno dice <strong>una palabra</strong> relacionada con la secreta.
          Ni muy obvia (el impostor la adivinaría) ni muy rara (parecerás el impostor).</li>
        <li>Tras una o varias vueltas, votad quién creéis que es el impostor y tocad «Revelar impostor».</li>
      </ol>
      <p><strong>Quién gana:</strong> los demás, si pillan al impostor. El impostor, si no le pillan
        o si adivina la palabra secreta.</p>`,
    "help.cripticos": `
      <h2>🧩 Crípticos</h2>
      <p>Pistas de crucigrama críptico: cada frase esconde una palabra. Tiene dos partes: una
        <strong>definición</strong> (al principio o al final) y un <strong>juego de palabras</strong> que lleva a la misma palabra.</p>
      <ul>
        <li><strong>Anagrama:</strong> letras desordenadas («loco», «revuelto», «movido»…).</li>
        <li><strong>Palabra escondida:</strong> la solución está dentro de otras palabras.</li>
        <li><strong>Inversión:</strong> una palabra leída al revés («vuelve», «al revés»…).</li>
        <li><strong>Eliminación:</strong> quitar letras («sin cabeza» = sin la primera).</li>
        <li><strong>Suma de partes:</strong> varias palabras pegadas.</li>
        <li><strong>Doble definición:</strong> dos significados de la misma palabra.</li>
      </ul>
      <p>El número entre paréntesis es cuántas letras tiene la solución. Escríbela con el teclado y toca «Revisar».
        Si te atascas, en «💡 Pistas» puedes marcar la definición, ver el tipo de juego, revelar una letra o ver la solución.
        Tu progreso se guarda en este navegador.</p>`,
  },
  en: {
    "help.home": `
      <h2>🎲 Family Games</h2>
      <p>Games to play as a family with a single phone. Pick a game from the board; inside each one
        the <strong>? Help</strong> button explains its rules. The <strong>ES</strong> button switches the site to Spanish.</p>`,
    "help.reverse": `
      <h2>🔄 Reverse Words</h2>
      <p>One player records a word and the other hears it <strong>backwards</strong>. They have to imitate that strange sound
        and, when the app flips their imitation around, guess what the word was.</p>
      <p><strong>Players:</strong> 2 or more, in pairs. The game needs microphone permission.</p>
      <ol>
        <li><strong>Player 1:</strong> tap the card to see the word (don't let the other player see it), tap the mic and say it out loud. Tap again to stop and pass the phone.</li>
        <li><strong>Player 2:</strong> listen to the reversed recording as many times as you like and record yourself imitating it as closely as you can.</li>
        <li>The app flips your imitation: if you nailed it, it sounds like the original word! Try to guess it, then tap to see the answer.</li>
      </ol>
      <p><strong>Tips:</strong> speak clearly and slowly. Words with 2 to 4 syllables are the most fun.
        If you don't like a word, use “Change word”.</p>`,
    "help.impostor": `
      <h2>🕵️ The Impostor</h2>
      <p>Everyone gets the same secret word… except the impostor, who doesn't know it.
        The others have to find the impostor, and the impostor has to blend in.</p>
      <p><strong>Players:</strong> 3 or more, with a single phone.</p>
      <ol>
        <li>Add the players, choose how many impostors there will be and the word categories.</li>
        <li>Pass the phone around: each player taps “See my word”, memorises it and hides it before passing it on.
          The impostor sees “You are the impostor” (and, if you turn it on, the category as a hint).</li>
        <li>Taking turns, starting with the player the app picks, everyone says <strong>one word</strong> related to the secret word.
          Not too obvious (the impostor would guess it) and not too odd (you'll look like the impostor).</li>
        <li>After one or more rounds, vote for who you think the impostor is and tap “Reveal impostor”.</li>
      </ol>
      <p><strong>Who wins:</strong> everyone else, if they catch the impostor. The impostor, if they aren't caught
        or if they guess the secret word.</p>`,
    "help.cripticos": `
      <h2>🧩 Cryptics</h2>
      <p>Cryptic crossword clues: each sentence hides a word. A clue has two parts: a
        <strong>definition</strong> (at the start or the end) and some <strong>wordplay</strong> that leads to the same word.</p>
      <ul>
        <li><strong>Anagram:</strong> jumbled letters (“mixed up”, “broken”, “wild”…).</li>
        <li><strong>Hidden word:</strong> the answer is hiding inside other words.</li>
        <li><strong>Reversal:</strong> a word read backwards (“sent back”, “returned”…).</li>
        <li><strong>Deletion:</strong> remove letters (“headless” = without the first one).</li>
        <li><strong>Charade:</strong> several words joined together.</li>
        <li><strong>Double definition:</strong> two meanings of the same word.</li>
      </ul>
      <p>The number in brackets is how many letters the answer has. Type it on the keyboard and tap “Check”.
        If you get stuck, “💡 Hints” lets you highlight the definition, see the wordplay type, reveal a letter or see the answer.
        Your progress is saved in this browser.</p>`,
  },
});
