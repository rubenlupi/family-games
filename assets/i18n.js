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
    return t("help.home") + ["reverse", "impostor", "cripticos", "cifras", "calculo", "cifrasletras"].map((g) => t(`help.${g}`)).join("");
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
    "help.cifras": `
      <h2>🌡️ Sin Pasarse</h2>
      <p>Preguntas cuya respuesta es una cifra: años, habitantes, distancias, animales que quedan en libertad…
        Gana quien más se acerque <strong>sin pasarse</strong> del número real.</p>
      <p><strong>Jugadores:</strong> 2 o más, con un solo móvil.</p>
      <ol>
        <li>Añade los jugadores y toca «Empezar partida». Se lee la pregunta en voz alta para todos.</li>
        <li>Pasad el móvil: cada uno, en secreto, sube o baja la rayita del termómetro hasta su número.
          Para afinar usa ▲▼ (mantenlos pulsados para ir más rápido) o toca el número para escribirlo.</li>
        <li>Al confirmar, el número queda oculto y el móvil pasa al siguiente.</li>
        <li>Cuando todos han marcado, se revela la respuesta con una curiosidad y quién gana la ronda.</li>
      </ol>
      <p><strong>Puntos:</strong> el que más se acerca sin pasarse gana 1 punto (si hay empate, todos los empatados).
        Si todos se pasan, nadie puntúa. ¡Ojo, que pasarse por 1 es perder!</p>`,
    "help.calculo": `
      <h2>🧮 Cálculo Mental</h2>
      <p>Para jugar en familia mirando la misma pantalla y respondiendo en voz alta. Primero aprendéis trucos de cálculo mental
        y luego competís para ver quién los usa más rápido.</p>
      <p><strong>Jugadores:</strong> 1 o más (mejor 2 o más), con una sola pantalla.</p>
      <ol>
        <li><strong>Aprender:</strong> cada estrategia se explica con un ejemplo paso a paso y por qué funciona.</li>
        <li><strong>Practicar:</strong> 5 ejercicios guiados, sin puntos. Podéis pedir una pista o ver la solución con todos los pasos.</li>
        <li>Tras 5 estrategias (un bloque), llega la <strong>ronda de competición</strong>: sale una operación cada vez y quien diga
          primero la respuesta correcta gana el punto. Un jugador toca «Ver solución» y marca quién ha ganado (o «Nadie»).
          «Pasar» salta la operación.</li>
        <li>No se dice qué estrategia usar: reconocerla es parte del juego, y cualquier forma de llegar a la respuesta vale.
          Al ver la solución aparecen las formas rápidas de resolverla.</li>
        <li>Después viene el siguiente bloque. Las rondas mezclan lo nuevo con todo lo aprendido antes.</li>
      </ol>
      <p>Hay 4 bloques: sumas y restas, multiplicar, más multiplicación y división, y trucos avanzados.
        La <strong>dificultad</strong> (fácil desde 10 años, media o difícil para adultos) se puede cambiar en cualquier momento.
        El progreso y el marcador se guardan en este navegador para continuar otro día, y en «Repasar estrategias» podéis elegir
        las que queráis practicar o usar en una ronda.</p>
      <h3>Fuentes</h3>
      <p class="sources">Las estrategias se han contrastado con
        <a href="https://en.wikibooks.org/wiki/Mental_Math" target="_blank" rel="noopener">Mental Math</a> (Wikibooks, CC BY-SA),
        <a href="https://github.com/Open-Apps-Studio/mental-math" target="_blank" rel="noopener">Open-Apps-Studio/mental-math</a> (MIT) y
        <a href="https://worldmentalcalculation.com/learning-training/" target="_blank" rel="noopener">World Mental Calculation</a>.
        Los textos, ejemplos y ejercicios de este juego son propios: no se ha copiado contenido de estas fuentes.</p>`,
    "help.cifrasletras": `
      <h2>🔤 Cifras y Letras</h2>
      <p>Nuestra versión familiar del concurso. Se juega con una sola pantalla y cada uno apunta en papel.
        Podéis elegir partidas de letras, de cifras o mixtas, el número de rondas y el tiempo (30, 60, 90 segundos o sin límite).</p>
      <h3>Letras</h3>
      <ol>
        <li>Por turnos, pedís vocal o consonante hasta tener 9 letras (al menos 3 vocales y 4 consonantes).
          Las letras salen según lo frecuentes que son en el idioma elegido.</li>
        <li>Pulsad «Todos preparados» y empieza el tiempo. Buscad la palabra más larga usando cada ficha una vez.</li>
        <li>Al acabar, cada uno dice su palabra y se escribe en la pantalla. Gana los puntos quien tenga la palabra válida más larga:
          tantos puntos como letras. Si hay empate, puntúan todos los empatados.</li>
        <li>Se aceptan todas las formas del diccionario: plurales, femeninos y conjugaciones. No valen nombres propios, siglas,
          abreviaturas ni palabras con espacios, guiones o apóstrofos.</li>
        <li>Si una palabra no está en el diccionario, la familia puede aceptarla a mano.</li>
      </ol>
      <p>Las tildes son opcionales al escribir («camion» vale por «camión»). En castellano la <strong>ñ</strong> es una letra distinta de la n.
        En francés, la <strong>œ</strong> ocupa dos fichas (O + E) y la æ también (A + E).</p>
      <h3>Cifras</h3>
      <ol>
        <li>Elegís cuántos números grandes (25, 50, 75, 100) queréis; el resto son del 1 al 10. Sale un objetivo entre 100 y 999.</li>
        <li>Hay que llegar al objetivo, o lo más cerca posible, con + − × ÷. Cada número se usa una vez y no hace falta usarlos todos.
          Todos los resultados intermedios tienen que ser enteros positivos.</li>
        <li>Al acabar, cada uno dice su resultado y se escribe la operación, por ejemplo <code>(75 + 25) × 6 − 3</code>.</li>
        <li>Puntúa quien quede más cerca: 10 puntos si es exacto, 7 si se queda a 1–5 y 5 si se queda a 6–10. Más lejos no puntúa nadie.</li>
      </ol>
      <p>Después de cada ronda se ven las respuestas, los puntos, las palabras más largas posibles o una solución paso a paso.
        El nivel fácil de cifras usa números del 1 al 10 y un objetivo que siempre se puede alcanzar. La partida se guarda para continuar otro día.
        En la <strong>práctica</strong> no hay puntos y podéis pedir pistas o ver las soluciones.</p>
      <h3>Diccionarios</h3>
      <p class="sources">Cada idioma usa su propio diccionario: <a href="https://github.com/sbosio/rla-es" target="_blank" rel="noopener">RLA-ES</a> (es_ES 2.8, GPL/LGPL/MPL),
        <a href="http://wordlist.aspell.net/" target="_blank" rel="noopener">SCOWL</a> (2020.12.07) y
        <a href="https://grammalecte.net/" target="_blank" rel="noopener">Grammalecte</a> (7.5, MPL 2.0).
        Son listas de correctores ortográficos: puede faltar alguna palabra válida.</p>`,
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
    "help.cifras": `
      <h2>🌡️ Don't Go Over</h2>
      <p>Questions whose answer is a number: years, populations, distances, animals left in the wild…
        The player who gets closest <strong>without going over</strong> the real number wins.</p>
      <p><strong>Players:</strong> 2 or more, with a single phone.</p>
      <ol>
        <li>Add the players and tap “Start game”. Read the question out loud to everyone.</li>
        <li>Pass the phone around: each player, in secret, moves the line on the thermometer up or down to their number.
          Fine-tune with ▲▼ (hold them to go faster) or tap the number to type it.</li>
        <li>When you confirm, your number is hidden and the phone goes to the next player.</li>
        <li>Once everyone has marked, the answer is revealed with a fun fact, along with who wins the round.</li>
      </ol>
      <p><strong>Points:</strong> whoever gets closest without going over wins 1 point (all tied players if there's a tie).
        If everyone goes over, nobody scores. Careful: going over by 1 is a loss!</p>`,
    "help.calculo": `
      <h2>🧮 Mental Maths</h2>
      <p>For playing as a family looking at the same screen and answering out loud. First you learn mental maths tricks,
        then you compete to see who uses them fastest.</p>
      <p><strong>Players:</strong> 1 or more (best with 2 or more), on a single screen.</p>
      <ol>
        <li><strong>Learn:</strong> each strategy is explained with a step-by-step example and why it works.</li>
        <li><strong>Practise:</strong> 5 guided exercises, no points. You can ask for a hint or show the answer with every step.</li>
        <li>After 5 strategies (one block) comes the <strong>competition round</strong>: one sum at a time, and whoever says the
          right answer first wins the point. One player taps “Show answer” and marks who won (or “Nobody”).
          “Skip” moves on to the next sum.</li>
        <li>Nobody tells you which strategy to use: spotting it is part of the game, and any way of getting the answer counts.
          When the answer is shown, you'll see quick ways to solve it.</li>
        <li>Then comes the next block. Rounds mix the new strategies with everything learned before.</li>
      </ol>
      <p>There are 4 blocks: adding and subtracting, multiplying, more multiplying and dividing, and advanced tricks.
        The <strong>difficulty</strong> (easy from age 10, medium, or hard for adults) can be changed at any time.
        Progress and the scoreboard are saved in this browser so you can carry on another day, and in “Review strategies” you can
        pick the ones you want to practise or use in a round.</p>
      <h3>Sources</h3>
      <p class="sources">The strategies were checked against
        <a href="https://en.wikibooks.org/wiki/Mental_Math" target="_blank" rel="noopener">Mental Math</a> (Wikibooks, CC BY-SA),
        <a href="https://github.com/Open-Apps-Studio/mental-math" target="_blank" rel="noopener">Open-Apps-Studio/mental-math</a> (MIT) and
        <a href="https://worldmentalcalculation.com/learning-training/" target="_blank" rel="noopener">World Mental Calculation</a>.
        The texts, examples and exercises in this game are original: no content was copied from these sources.</p>`,
    "help.cifrasletras": `
      <h2>🔤 Numbers & Letters</h2>
      <p>Our family version of the TV quiz. You play on one screen and everyone writes on paper.
        Choose letters, numbers or mixed games, the number of rounds and the time (30, 60, 90 seconds or no limit).</p>
      <h3>Letters</h3>
      <ol>
        <li>Taking turns, ask for a vowel or a consonant until there are 9 letters (at least 3 vowels and 4 consonants).
          Letters come up according to how common they are in the chosen language.</li>
        <li>Tap “Everyone ready” and the clock starts. Find the longest word using each tile once.</li>
        <li>Then everyone says their word and it's typed in. The longest valid word scores as many points as it has letters.
          If there's a tie, all the tied players score.</li>
        <li>Every form in the dictionary counts: plurals and verb forms. Proper nouns, acronyms, abbreviations and words with spaces,
          hyphens or apostrophes don't count.</li>
        <li>If a word isn't in the dictionary, the family can accept it by hand.</li>
      </ol>
      <p>Accents are optional when typing. In Spanish, <strong>ñ</strong> is a different letter from n.
        In French, <strong>œ</strong> takes two tiles (O + E), and so does æ (A + E).</p>
      <h3>Numbers</h3>
      <ol>
        <li>Choose how many large numbers (25, 50, 75, 100) you want; the rest are from 1 to 10. A target from 100 to 999 appears.</li>
        <li>Reach the target, or get as close as you can, with + − × ÷. Each number can be used once and you don't have to use them all.
          Every intermediate result must be a positive whole number.</li>
        <li>Then everyone says their result and the sum is typed in, for example <code>(75 + 25) × 6 − 3</code>.</li>
        <li>The closest scores: 10 points if exact, 7 if 1–5 away and 5 if 6–10 away. Further away, nobody scores.</li>
      </ol>
      <p>After each round you'll see the answers, the points, the longest possible words or a step-by-step solution.
        Easy numbers use only 1 to 10 and a target that can always be reached. The game is saved so you can carry on another day.
        In <strong>practice</strong> there are no points, and you can ask for hints or show the solutions.</p>
      <h3>Dictionaries</h3>
      <p class="sources">Each language has its own dictionary: <a href="https://github.com/sbosio/rla-es" target="_blank" rel="noopener">RLA-ES</a> (es_ES 2.8, GPL/LGPL/MPL),
        <a href="http://wordlist.aspell.net/" target="_blank" rel="noopener">SCOWL</a> (2020.12.07) and
        <a href="https://grammalecte.net/" target="_blank" rel="noopener">Grammalecte</a> (7.5, MPL 2.0).
        They are spell-checker word lists, so a valid word may occasionally be missing.</p>`,
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
    "help.cifras": `
      <h2>🌡️ Sans Dépasser</h2>
      <p>Des questions dont la réponse est un nombre : années, habitants, distances, animaux encore sauvages…
        Le joueur le plus proche <strong>sans dépasser</strong> le vrai nombre gagne.</p>
      <p><strong>Joueurs :</strong> 2 ou plus, avec un seul téléphone.</p>
      <ol>
        <li>Ajoutez les joueurs et touchez « Commencer la partie ». Lisez la question à voix haute pour tout le monde.</li>
        <li>Faites passer le téléphone : chacun, en secret, monte ou descend le trait du thermomètre jusqu'à son nombre.
          Pour affiner, utilisez ▲▼ (restez appuyé pour aller plus vite) ou touchez le nombre pour l'écrire.</li>
        <li>Une fois validé, le nombre est caché et le téléphone passe au suivant.</li>
        <li>Quand tout le monde a marqué, la réponse s'affiche avec une anecdote et le gagnant de la manche.</li>
      </ol>
      <p><strong>Points :</strong> le plus proche sans dépasser gagne 1 point (tous les ex æquo en cas d'égalité).
        Si tout le monde dépasse, personne ne marque. Attention : dépasser de 1, c'est perdre !</p>`,
    "help.calculo": `
      <h2>🧮 Calcul Mental</h2>
      <p>Pour jouer en famille devant le même écran en répondant à voix haute. D'abord, vous apprenez des astuces de calcul mental,
        puis vous faites la course pour voir qui les utilise le plus vite.</p>
      <p><strong>Joueurs :</strong> 1 ou plus (idéalement 2 ou plus), sur un seul écran.</p>
      <ol>
        <li><strong>Apprendre :</strong> chaque stratégie est expliquée avec un exemple pas à pas et pourquoi elle marche.</li>
        <li><strong>S'entraîner :</strong> 5 exercices guidés, sans points. On peut demander un indice ou voir la réponse avec toutes les étapes.</li>
        <li>Après 5 stratégies (un bloc) vient la <strong>manche de compétition</strong> : un calcul à la fois, et le premier qui dit
          la bonne réponse gagne le point. Un joueur touche « Voir la réponse » et indique qui a gagné (ou « Personne »).
          « Passer » saute le calcul.</li>
        <li>On ne dit pas quelle stratégie utiliser : la repérer fait partie du jeu, et toutes les façons d'arriver au résultat sont valables.
          Avec la réponse, on voit les façons rapides de le résoudre.</li>
        <li>Ensuite vient le bloc suivant. Les manches mélangent les nouveautés avec tout ce qui a été appris.</li>
      </ol>
      <p>Il y a 4 blocs : additions et soustractions, multiplier, encore multiplier et diviser, et astuces avancées.
        La <strong>difficulté</strong> (facile dès 10 ans, moyenne ou difficile pour adultes) peut changer à tout moment.
        La progression et le classement sont enregistrés dans ce navigateur pour continuer un autre jour, et dans « Réviser les stratégies »
        vous pouvez choisir celles à travailler ou à utiliser dans une manche.</p>
      <h3>Sources</h3>
      <p class="sources">Les stratégies ont été vérifiées à partir de
        <a href="https://en.wikibooks.org/wiki/Mental_Math" target="_blank" rel="noopener">Mental Math</a> (Wikibooks, CC BY-SA),
        <a href="https://github.com/Open-Apps-Studio/mental-math" target="_blank" rel="noopener">Open-Apps-Studio/mental-math</a> (MIT) et
        <a href="https://worldmentalcalculation.com/learning-training/" target="_blank" rel="noopener">World Mental Calculation</a>.
        Les textes, exemples et exercices de ce jeu sont originaux : aucun contenu de ces sources n'a été copié.</p>`,
    "help.cifrasletras": `
      <h2>🔤 Des chiffres et des lettres</h2>
      <p>Notre version familiale du jeu télévisé. On joue sur un seul écran et chacun note sur papier.
        Choisissez des parties de lettres, de chiffres ou mixtes, le nombre de manches et le temps (30, 60, 90 secondes ou sans limite).</p>
      <h3>Lettres</h3>
      <ol>
        <li>Chacun son tour, demandez voyelle ou consonne jusqu'à avoir 9 lettres (au moins 3 voyelles et 4 consonnes).
          Les lettres sortent selon leur fréquence dans la langue choisie.</li>
        <li>Touchez « Tout le monde est prêt » et le temps démarre. Cherchez le mot le plus long en utilisant chaque lettre une fois.</li>
        <li>Ensuite, chacun annonce son mot et on l'écrit. Le mot valide le plus long rapporte autant de points que de lettres.
          En cas d'égalité, tous les ex æquo marquent.</li>
        <li>Toutes les formes du dictionnaire sont acceptées : pluriels, féminins et conjugaisons. Pas de noms propres, sigles,
          abréviations ni mots avec espaces, traits d'union ou apostrophes.</li>
        <li>Si un mot n'est pas dans le dictionnaire, la famille peut l'accepter à la main.</li>
      </ol>
      <p>Les accents sont facultatifs à la saisie (« coeur » vaut « cœur »). En français, <strong>œ</strong> occupe deux lettres (O + E),
        tout comme æ (A + E). En espagnol, le <strong>ñ</strong> est une lettre différente du n.</p>
      <h3>Chiffres</h3>
      <ol>
        <li>Choisissez combien de grands nombres (25, 50, 75, 100) vous voulez ; les autres vont de 1 à 10. Un objectif de 100 à 999 s'affiche.</li>
        <li>Il faut atteindre l'objectif, ou s'en approcher le plus possible, avec + − × ÷. Chaque nombre ne sert qu'une fois et on n'est pas obligé de tous les utiliser.
          Chaque résultat intermédiaire doit être un entier positif.</li>
        <li>Ensuite, chacun annonce son résultat et on écrit le calcul, par exemple <code>(75 + 25) × 6 − 3</code>.</li>
        <li>Le plus proche marque : 10 points si le compte est bon, 7 à 1–5 près et 5 à 6–10 près. Plus loin, personne ne marque.</li>
      </ol>
      <p>Après chaque manche, on voit les réponses, les points, les mots les plus longs possibles ou une solution pas à pas.
        Le niveau facile utilise les nombres de 1 à 10 et un objectif toujours atteignable. La partie est enregistrée pour la reprendre un autre jour.
        À l'<strong>entraînement</strong>, il n'y a pas de points et on peut demander des indices ou voir les solutions.</p>
      <h3>Dictionnaires</h3>
      <p class="sources">Chaque langue a son propre dictionnaire : <a href="https://github.com/sbosio/rla-es" target="_blank" rel="noopener">RLA-ES</a> (es_ES 2.8, GPL/LGPL/MPL),
        <a href="http://wordlist.aspell.net/" target="_blank" rel="noopener">SCOWL</a> (2020.12.07) et
        <a href="https://grammalecte.net/" target="_blank" rel="noopener">Grammalecte</a> (7.5, MPL 2.0).
        Ce sont des listes de correcteurs orthographiques : il peut manquer un mot valide.</p>`,
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
