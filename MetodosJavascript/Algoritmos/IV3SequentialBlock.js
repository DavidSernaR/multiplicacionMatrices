/*
Algoritmo tomado del libro http://paper.ijcsns.org/07_book/201202/20120212.pdf y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

/**
 * Realiza la multiplicación de matrices utilizando un algoritmo de bloque secuencial.
 *
 * @param {Array<Array<number>>} matrizA - La primera matriz a multiplicar.
 * @param {Array<Array<number>>} matrizB - La segunda matriz a multiplicar.
 * @param {Array<Array<number>>} matrizResultado - La matriz resultado donde se almacenará el producto.
 * @param {number} tamanioBloque - El tamaño del bloque para la multiplicación en bloques.
 * @returns {Array<Array<number>>} - La matriz resultado después de la multiplicación.
 */
export function IV3_sequential_block(matrizA, matrizB, matrizResultado, tamanioBloque) {
  const size = matrizResultado.length; // Suponiendo que todas las matrices tienen el mismo tamaño

  // Itera sobre las matrices en bloques de tamaño 'tamanioBloque'
  for (let i1 = 0; i1 < size; i1 += tamanioBloque) {
    for (let j1 = 0; j1 < size; j1 += tamanioBloque) {
      for (let k1 = 0; k1 < size; k1 += tamanioBloque) {
        for (let i = i1; i < i1 + tamanioBloque && i < size; i++) {
          for (let j = j1; j < j1 + tamanioBloque && j < size; j++) {
            for (let k = k1; k < k1 + tamanioBloque && k < size; k++) {
              // Actualiza el valor de la celda en la matrizResultado
              matrizResultado[i][k] += matrizA[i][j] * matrizB[j][k];
            }
          }
        }
      }
    }
  }

  return matrizResultado;
}
