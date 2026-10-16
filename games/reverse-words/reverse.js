const $ = (id) => document.getElementById(id);

let audioCtx = null;
let currentSource = null; // lo que suena ahora mismo (solo uno a la vez)

// Grabaciones de la ronda: buffer normal y buffer al revés de cada jugador.
const takes = { 1: null, 2: null };
let word = null;

function getAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function setMessage(text) {
  $("message").textContent = text;
}

// ---------- Pasos ----------

function goTo(step) {
  stopPlayback();
  [1, 2, 3].forEach((n) => $(`step-${n}`).classList.toggle("hidden", n !== step));
  document.querySelectorAll(".steps li").forEach((li) => {
    const n = +li.dataset.step;
    li.classList.toggle("current", n === step);
    li.classList.toggle("done", n < step);
  });
  setMessage("");
  window.scrollTo(0, 0);
}

// ---------- Palabra ----------

function newWord() {
  let next;
  do { next = WORDS[Math.floor(Math.random() * WORDS.length)]; } while (next === word && WORDS.length > 1);
  word = next;
  cover($("word"), "👀 Toca para ver la palabra");
  cover($("answer"), "Toca para ver la solución");
}

// Mientras está tapada no se pinta la palabra.
function cover(el, text) {
  el.textContent = text;
  el.classList.add("covered");
}

function toggleWord(el, coverText) {
  if (el.classList.contains("covered")) {
    el.textContent = word;
    el.classList.remove("covered");
  } else {
    cover(el, coverText);
  }
}

$("word").onclick = () => toggleWord($("word"), "👀 Toca para ver la palabra");
$("new-word").onclick = newWord;
$("answer").onclick = () => {
  toggleWord($("answer"), "Toca para ver la solución");
  $("play-1").classList.remove("hidden");
};

// ---------- Audio ----------

function reverseBuffer(buffer) {
  const reversed = getAudioContext().createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);
  for (let ch = 0; ch < buffer.numberOfChannels; ch++) {
    const data = Float32Array.from(buffer.getChannelData(ch));
    data.reverse();
    reversed.copyToChannel(data, ch);
  }
  return reversed;
}

function stopPlayback() {
  if (currentSource) {
    currentSource.onended = null;
    try { currentSource.stop(); } catch (e) { /* ya parado */ }
    currentSource = null;
  }
  document.querySelectorAll(".tile.playing").forEach((b) => b.classList.remove("playing"));
}

function play(buffer, button) {
  if (!buffer) return;
  stopPlayback();
  const ctx = getAudioContext();
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.onended = () => {
    button.classList.remove("playing");
    if (currentSource === source) currentSource = null;
  };
  button.classList.add("playing");
  currentSource = source;
  source.start();
}

// ---------- Grabación ----------

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

let active = null; // { recorder, stream, timer, player }

async function startRecording(player) {
  stopPlayback();
  getAudioContext(); // se crea dentro del toque del usuario (necesario en iPhone)

  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    setMessage("Este navegador no permite grabar audio.");
    return;
  }
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) {
    setMessage("No hay permiso para usar el micrófono. Actívalo en los ajustes del navegador.");
    return;
  }

  const mic = $(`rec-${player}`);
  const label = $(`rec-${player}-label`);
  const chunks = [];
  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
  recorder.onstop = async () => {
    stream.getTracks().forEach((t) => t.stop());
    mic.classList.remove("recording");
    try {
      const blob = new Blob(chunks, { type: recorder.mimeType });
      const buffer = await getAudioContext().decodeAudioData(await blob.arrayBuffer());
      takes[player] = { buffer, reversed: reverseBuffer(buffer) };
      label.textContent = `Grabado (${formatTime(buffer.duration * 1000)}) · toca para repetir`;
      onRecorded(player);
    } catch (e) {
      label.textContent = "Toca para grabar";
      setMessage("No se ha podido procesar la grabación. Prueba otra vez.");
    }
  };

  recorder.start();
  mic.classList.add("recording");
  const startedAt = Date.now();
  label.textContent = "Grabando… 00:00 · toca para parar";
  const timer = setInterval(() => {
    label.textContent = `Grabando… ${formatTime(Date.now() - startedAt)} · toca para parar`;
  }, 250);
  active = { recorder, timer, player };
  setMessage("");
}

function stopRecording() {
  if (!active) return;
  clearInterval(active.timer);
  if (active.recorder.state === "recording") active.recorder.stop();
  active = null;
}

function toggleRecording(player) {
  if (active && active.player === player) stopRecording();
  else {
    stopRecording();
    startRecording(player);
  }
}

function onRecorded(player) {
  if (player === 1) {
    $("to-step-2").classList.remove("hidden");
  } else {
    $("play-2").disabled = false;
    $("to-step-3").classList.remove("hidden");
  }
}

$("rec-1").onclick = () => toggleRecording(1);
$("rec-2").onclick = () => toggleRecording(2);

$("play-1-rev").onclick = (e) => play(takes[1]?.reversed, e.currentTarget);
$("play-2").onclick = (e) => play(takes[2]?.buffer, e.currentTarget);
$("play-2-rev").onclick = (e) => play(takes[2]?.reversed, e.currentTarget);
$("play-1").onclick = (e) => play(takes[1]?.buffer, e.currentTarget);

$("to-step-2").onclick = () => { stopRecording(); goTo(2); };
$("to-step-3").onclick = () => {
  stopRecording();
  goTo(3);
  play(takes[2]?.reversed, $("play-2-rev")); // suena directamente al llegar
};

$("new-round").onclick = () => {
  stopRecording();
  takes[1] = takes[2] = null;
  $("rec-1-label").textContent = "Toca para grabar";
  $("rec-2-label").textContent = "Grábate imitando lo que oyes";
  $("to-step-2").classList.add("hidden");
  $("to-step-3").classList.add("hidden");
  $("play-2").disabled = true;
  $("play-1").classList.add("hidden");
  newWord();
  goTo(1);
};

newWord();
goTo(1);
