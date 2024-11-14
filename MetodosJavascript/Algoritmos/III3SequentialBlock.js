/*
Algoritmo tomado del artículo http://paper.ijcsns.org/07_book/201202/20120212.pdf y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

/**
 * Realiza la multiplicación de matrices utilizando el algoritmo de bloque secuencial.
 *
 * @param {Array<Array<number>>} matrizA - La primera matriz a multiplicar.
 * @param {Array<Array<number>>} matrizB - La segunda matriz a multiplicar.
 * @param {Array<Array<number>>} matrizResultado - La matriz resultado donde se almacenará el producto.
 * @param {number} tamanioBloque - El tamaño del bloque para la multiplicación en bloques.
 * @returns {Array<Array<number>>} - La matriz resultado después de la multiplicación.
 */
export function III3_sequential_block(matrizA, matrizB, matrizResultado, tamanioBloque) {
    const size = matrizResultado.length; // Se asume que todas las matrices tienen el mismo tamaño

    // Itera sobre las matrices en bloques de tamaño 'tamanioBloque'
    for (let i1 = 0; i1 < size; i1 += tamanioBloque) {
        for (let j1 = 0; j1 < size; j1 += tamanioBloque) {
            for (let k1 = 0; k1 < size; k1 += tamanioBloque) {
                // Bucles internos para iterar sobre los elementos dentro de cada bloque
                for (let i = i1; i < Math.min(i1 + tamanioBloque, size); i++) {
                    for (let j = j1; j < Math.min(j1 + tamanioBloque, size); j++) {
                        for (let k = k1; k < Math.min(k1 + tamanioBloque, size); k++) {
                            matrizResultado[i][j] += matrizA[i][k] * matrizB[k][j];
                        }
                    }
                }
            }
        }
    }

    // Retorna la matriz resultado
    return matrizResultado;
}
