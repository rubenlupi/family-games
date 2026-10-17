# Diccionarios de «Cifras y letras»

Cada idioma tiene su propio diccionario, sacado de una fuente distinta: ninguno es una traducción
de otro. El juego descarga solo el del idioma elegido para las palabras (`es.txt`, `en.txt` o `fr.txt`).

Los ficheros se generan con [`tools/build-cifras-letras-dicts.py`](../../../tools/build-cifras-letras-dicts.py)
y se prueban con [`tools/test-cifras-letras.js`](../../../tools/test-cifras-letras.js).

| Fichero | Fuente | Versión | Licencia | Formas |
|---|---|---|---|---|
| `es.txt` | Diccionario es_ES de [RLA-ES](https://github.com/sbosio/rla-es) (Santiago Bosio y colaboradores), vía [wooorm/dictionaries](https://github.com/wooorm/dictionaries/tree/main/dictionaries/es) | 2.8 | GPL 3.0, LGPL 3.0 o MPL 1.1, a elegir ([LICENSE-es.txt](LICENSE-es.txt)) | 281 898 |
| `fr.txt` | Diccionario francés de [Grammalecte](https://grammalecte.net/) (Olivier R., Dicollecte), vía [wooorm/dictionaries](https://github.com/wooorm/dictionaries/tree/main/dictionaries/fr) | 7.5 | MPL 2.0 ([LICENSE-fr.txt](LICENSE-fr.txt)) | 183 277 |
| `en.txt` | [SCOWL](http://wordlist.aspell.net/) (Kevin Atkinson y colaboradores) | 2020.12.07 | Licencia propia de SCOWL, permisiva ([LICENSE-en.txt](LICENSE-en.txt)) | 52 822 |

Cada fichero derivado se distribuye con la misma licencia que su fuente. El resto del juego no
incluye texto de estos diccionarios.

## Cómo se han obtenido

- **Castellano y francés:** son diccionarios hunspell (raíces + reglas de afijos). Se han expandido
  con `unmunch` de hunspell 1.7 para obtener todas las formas: plurales, femeninos, conjugaciones,
  pronombres enclíticos («dámelo»)… Las formas con afijos encadenados se expanden en una segunda pasada.
- **Inglés:** listas `english-words`, `american-words`, `british-words` y `british_z-words` de SCOWL
  hasta el tamaño 60 (el recomendado por SCOWL para correctores). Incluyen plurales y formas verbales,
  y tanto la ortografía británica como la estadounidense (colour/color, realise/realize, theatre/theater).
  Están ordenadas de más a menos comunes según el tamaño de SCOWL.

## Qué palabras se aceptan

- Cualquier forma que esté en el diccionario: plurales, femeninos, conjugaciones y demás formas flexionadas.
- Entre 2 y 9 fichas (no puede haber palabras más largas que las fichas de una ronda).
- **Se excluyen** los nombres propios y las siglas (todo lo que lleva mayúsculas en la fuente), las
  abreviaturas y las palabras con espacios, guiones, apóstrofos, puntos o cifras (por ejemplo,
  «aujourd'hui», «c'est», «e-mail»).
- Si una palabra no está en el diccionario, el juego lo indica, pero la familia puede aceptarla a mano.

## Fichas y caracteres

- Las fichas van sin tildes ni diacríticos. Se puede escribir «camion» o «camión», «coeur» o «cœur»;
  al mostrar la palabra se usa la ortografía del diccionario.
- **Castellano:** la Ñ es una ficha propia, distinta de la N («año» no se puede formar con una N).
  La Ü se juega como U.
- **Francés:** œ ocupa dos fichas, O + E (cœur = C O E U R, 5 fichas), y æ ocupa A + E. La Ç se juega
  como C. La misma regla se usa al repartir, al validar y al buscar soluciones.
- Las palabras valen tantos puntos como fichas usan.

## Frecuencia de las letras

Las bolsas de vocales y consonantes de cada idioma (en `letras.js`) son proporcionales a lo que
aparece cada letra en su diccionario, ya normalizado. Se quitan las letras con menos de un 0,15 %
de apariciones para que las rondas sean jugables: K y W en castellano, W en francés.
En las pruebas, más del 98 % de las rondas tienen al menos una palabra de 5 letras en los tres idiomas.

## Limitaciones

- Son listas de correctores ortográficos, no diccionarios de juego: pueden faltar palabras válidas
  (sobre todo regionalismos, términos muy nuevos o muy técnicos) e incluir algunas poco usadas.
- **Castellano:** incluye algunas formas antiguas o raras (futuro de subjuntivo, enclíticos poco
  usados). No trae frecuencias, así que las soluciones de la misma longitud salen en orden alfabético.
- **Francés:** incluye las grafías tradicionales y las de la reforma de 1990 («oignon» y «ognon»).
  No trae frecuencias.
- **Inglés:** el tamaño 60 deja fuera palabras poco comunes que sí aceptan los diccionarios de Scrabble.
- Ninguna lista cubre todas las variantes regionales (por ejemplo, voseo o canadianismos).
