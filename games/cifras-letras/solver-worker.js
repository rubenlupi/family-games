// Web Worker: busca la solución de una ronda de cifras sin bloquear la pantalla.
importScripts("cifras.js");

self.onmessage = (e) => {
  const { id, numbers, target } = e.data;
  self.postMessage({ id, solution: solve(numbers, target) });
};
