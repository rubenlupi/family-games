// Puntuación de «Cifras y letras» (versión familiar). Sin interfaz.

// Letras: answers = [{ name, valid, length }]. Puntúan los que presentan la palabra válida más
// larga, tantos puntos como fichas tenga. Si nadie tiene una palabra válida, nadie puntúa.
function scoreLetters(answers) {
  const valid = answers.filter((a) => a.valid && a.length > 0);
  const best = valid.length ? Math.max(...valid.map((a) => a.length)) : 0;
  const points = {};
  for (const a of answers) points[a.name] = a.valid && best > 0 && a.length === best ? best : 0;
  return { best, points };
}

// Cifras: answers = [{ name, valid, value }]. Puntúan los que quedan más cerca del objetivo:
// 10 si es exacta, 7 si están a 1–5, 5 si están a 6–10. Más lejos no puntúa nadie.
function numbersPointsFor(distance) {
  if (distance === 0) return 10;
  if (distance <= 5) return 7;
  if (distance <= 10) return 5;
  return 0;
}

function scoreNumbers(answers, target) {
  const valid = answers.filter((a) => a.valid);
  const best = valid.length ? Math.min(...valid.map((a) => Math.abs(a.value - target))) : null;
  const award = best === null ? 0 : numbersPointsFor(best);
  const points = {};
  for (const a of answers) points[a.name] = a.valid && Math.abs(a.value - target) === best ? award : 0;
  return { best, points };
}

// Clasificación con empates: 10, 10, 7 → puestos 1, 1, 3.
function ranking(players, scores) {
  const sorted = [...players].sort((a, b) => (scores[b] || 0) - (scores[a] || 0));
  let place = 0;
  return sorted.map((name, i) => {
    if (i === 0 || (scores[name] || 0) !== (scores[sorted[i - 1]] || 0)) place = i + 1;
    return { name, points: scores[name] || 0, place };
  });
}

if (typeof module !== "undefined") {
  module.exports = { scoreLetters, scoreNumbers, numbersPointsFor, ranking };
}
