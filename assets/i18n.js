// Idiomas de la web (español / inglés / francés) y botón de ayuda.
//
// - Los textos fijos del HTML llevan data-i18n="clave" (texto), data-i18n-html (HTML),
//   data-i18n-aria (aria-label) o data-i18n-placeholder. El HTML trae el texto en español,
//   que es lo que se ve si falta una traducción.
// - Cada juego añade sus textos con I18N.add({ es: {...}, en: {...}, fr: {...} }) y usa I18N.t("clave").
// - Si la página tiene un elemento .tools se pintan ahí el botón de ayuda y el selector de idioma.
//   La ayuda que se muestra depende de <body data-game="...">.
const I18N = (() => {
  const STORAGE_KEY = "family-games:lang";
  const LANGS = ["es", "en", "fr"];

  const strings = {
    es: {
      "tools.help": "Ayuda",
      "tools.lang": "Idioma",
      "help.close": "Cerrar",
    },
    en: {
      "tools.help": "Help",
      "tools.lang": "Language",
      "help.close": "Close",
    },
    fr: {
      "tools.help": "Aide",
      "tools.lang": "Langue",
      "help.close": "Fermer",
    },
  };

  function detect() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (e) { /* sin almacenamiento */ }
    // Por defecto español; si el navegador no tiene español, el primero que tenga de los otros.
    const prefs = (navigator.languages || [navigator.language || ""]).map((l) => l.toLowerCase().slice(0, 2));
    if (prefs.includes("es")) return "es";
    return prefs.find((l) => LANGS.includes(l)) || "es";
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

    const switcher = document.createElement("select");
    switcher.className = "tool";
    switcher.setAttribute("aria-label", t("tools.lang"));
    LANGS.forEach((l) => switcher.add(new Option(l.toUpperCase(), l, false, l === lang)));
    switcher.onchange = () => setLang(switcher.value);

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
        tienes el botón <strong>? Ayuda</strong> con sus reglas. Con el selector <strong>ES</strong> cambias el idioma (español, inglés o francés).</p>`,
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
        the <strong>? Help</strong> button explains its rules. The <strong>EN</strong> selector changes the language (Spanish, English or French).</p>`,
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

I18N.add({
  fr: {
    "help.home": `
      <h2>🎲 Family Games</h2>
      <p>Des jeux à jouer en famille avec un seul téléphone. Choisissez un jeu sur le panneau ; dans chacun,
        le bouton <strong>? Aide</strong> explique les règles. Le sélecteur <strong>FR</strong> change la langue (espagnol, anglais ou français).</p>`,
    "help.reverse": `
      <h2>🔄 Reverse Words</h2>
      <p>Un joueur enregistre un mot et l'autre l'écoute <strong>à l'envers</strong>. Il doit imiter ce son bizarre
        et, quand l'appli retourne son imitation, deviner quel était le mot.</p>
      <p><strong>Joueurs :</strong> 2 ou plus, par deux. Il faut autoriser le micro.</p>
      <ol>
        <li><strong>Joueur 1 :</strong> touchez la carte pour voir le mot (sans que l'autre le voie), touchez le micro et dites-le à voix haute. Touchez encore pour arrêter et passez le téléphone.</li>
        <li><strong>Joueur 2 :</strong> écoutez l'enregistrement à l'envers autant de fois que vous voulez et enregistrez-vous en l'imitant le mieux possible.</li>
        <li>L'appli retourne votre imitation : si vous l'avez bien imitée, on entend le mot d'origine ! Essayez de le deviner, puis touchez pour voir la réponse.</li>
      </ol>
      <p><strong>Conseils :</strong> parlez clairement et lentement. Les mots de 2 à 4 syllabes sont les plus amusants.
        Si un mot ne vous plaît pas, utilisez « Changer de mot ».</p>`,
    "help.impostor": `
      <h2>🕵️ L'Imposteur</h2>
      <p>Tout le monde reçoit le même mot secret… sauf l'imposteur, qui ne le connaît pas.
        Les autres doivent le démasquer, et l'imposteur doit passer inaperçu.</p>
      <p><strong>Joueurs :</strong> 3 ou plus, avec un seul téléphone.</p>
      <ol>
        <li>Ajoutez les joueurs, choisissez le nombre d'imposteurs et les catégories de mots.</li>
        <li>Faites passer le téléphone : chacun touche « Voir mon mot », le mémorise et le cache avant de passer.
          L'imposteur voit « Tu es l'imposteur » (et, si vous l'activez, la catégorie comme indice).</li>
        <li>Chacun son tour, en commençant par le joueur choisi par l'appli, chacun dit <strong>un mot</strong> lié au mot secret.
          Ni trop évident (l'imposteur le devinerait), ni trop bizarre (vous aurez l'air de l'imposteur).</li>
        <li>Après un ou plusieurs tours, votez pour celui que vous pensez être l'imposteur et touchez « Révéler l'imposteur ».</li>
      </ol>
      <p><strong>Qui gagne :</strong> les autres, s'ils démasquent l'imposteur. L'imposteur, s'il n'est pas démasqué
        ou s'il devine le mot secret.</p>`,
    "help.cripticos": `
      <h2>🧩 Cryptiques</h2>
      <p>Des définitions de mots croisés cryptiques : chaque phrase cache un mot. Elle a deux parties : une
        <strong>définition</strong> (au début ou à la fin) et un <strong>jeu de mots</strong> qui mène au même mot.</p>
      <ul>
        <li><strong>Anagramme :</strong> lettres mélangées (« en désordre », « bousculé », « en vrac »…).</li>
        <li><strong>Mot caché :</strong> la réponse se cache à l'intérieur d'autres mots.</li>
        <li><strong>Inversion :</strong> un mot lu à l'envers (« retourné », « à l'envers »…).</li>
        <li><strong>Suppression :</strong> enlever des lettres (« étêté » = sans la première).</li>
        <li><strong>Charade :</strong> plusieurs mots collés.</li>
        <li><strong>Double définition :</strong> deux sens du même mot.</li>
      </ul>
      <p>Le nombre entre parenthèses indique combien de lettres a la réponse (sans accents ni tirets). Tapez-la au clavier et touchez « Vérifier ».
        Si vous bloquez, « 💡 Indices » permet de surligner la définition, voir le type de jeu, révéler une lettre ou voir la réponse.
        Votre progression est enregistrée dans ce navigateur.</p>`,
  },
});
