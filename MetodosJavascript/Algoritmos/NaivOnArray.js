/*
Algoritmo tomado y adaptado del artículo https://arxiv.org/abs/1106.1347

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

/**
 * Realiza la multiplicación de matrices utilizando un algoritmo naivo sobre matrices representadas como arrays.
 *
 * @param {Array<Array<number>>} matrizA - La primera matriz a multiplicar.
 * @param {Array<Array<number>>} matrizB - La segunda matriz a multiplicar.
 * @param {Array<Array<number>>} matrizResultado - La matriz donde se almacenará el resultado de la multiplicación.
 * @param {number} cantidadFilasMatrices - La cantidad de filas en las matrices A y Resultado.
 * @param {number} cantidadColumnasMatrices - La cantidad de columnas en las matrices B y Resultado.
 * @param {number} cantidadMaximaIteracionesFilaColumna - La cantidad máxima de iteraciones en el bucle de fila y columna.
 * @returns {Array<Array<number>>} - La matriz resultado después de la multiplicación.
 */
export function naiv_on_array(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, cantidadMaximaIteracionesFilaColumna) {
    // Recorre cada fila de la matrizA
    for (var i = 0; i < cantidadFilasMatrices; i++) {
        // Recorre cada columna de la matrizB
        for (var j = 0; j < cantidadColumnasMatrices; j++) {
            // Inicializa el elemento [i][j] de la matrizResultado como cero
            matrizResultado[i][j] = 0.0;
            // Recorre cada posición de la fila i y columna j
            for (var k = 0; k < cantidadMaximaIteracionesFilaColumna; k++) {
                // Acumula la suma de la multiplicación de los elementos correspondientes de matrizA y matrizB
                matrizResultado[i][j] += matrizA[i][k] * matrizB[k][j];
            }
        }
    }
    // Retorna la matriz resultado después de completar la multiplicación de matrices
    return matrizResultado;
}
