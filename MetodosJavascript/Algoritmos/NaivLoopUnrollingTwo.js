/*
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

/**
 * Realiza la multiplicación de matrices utilizando un bucle naive con desenrollado de bucle de 2 iteraciones.
 *
 * @param {Array<Array<number>>} matrizA - La primera matriz a multiplicar.
 * @param {Array<Array<number>>} matrizB - La segunda matriz a multiplicar.
 * @param {Array<Array<number>>} matrizResultado - La matriz donde se almacenará el resultado de la multiplicación.
 * @param {number} cantidadFilasMatrices - La cantidad de filas en las matrices A y Resultado.
 * @param {number} cantidadColumnasMatrices - La cantidad de columnas en las matrices B y Resultado.
 * @param {number} delimitadorMaximaIteracionesFilaColumna - El delimitador para la cantidad máxima de iteraciones en el bucle de fila y columna.
 * @returns {Array<Array<number>>} - La matriz resultado después de la multiplicación.
 */
export function naiv_loop_unrolling_two(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna) {

    let aux;

    // Comprueba si el delimitador es par o impar para determinar la lógica de desenrollado del bucle
    if (delimitadorMaximaIteracionesFilaColumna % 2 == 0) {
        // Caso: delimitadorMaximaIteracionesFilaColumna par
        for (var i = 0; i < cantidadFilasMatrices; i++) {
            for (var j = 0; j < cantidadColumnasMatrices; j++) {
                aux = 0.0;
                // Realiza la multiplicación de matrices desenrollando el bucle de 2 en 2 iteraciones
                for (var k = 0; k < delimitadorMaximaIteracionesFilaColumna; k += 2) {
                    aux += matrizA[i][k] * matrizB[k][j] + matrizA[i][k + 1] * matrizB[k + 1][j];
                }
                matrizResultado[i][j] = aux;
            }
        }
    } else {
        // Caso: delimitadorMaximaIteracionesFilaColumna impar
        // Se ajusta el delimitador para asegurar que el bucle termine en un índice par
        delimitadorMaximaIteracionesFilaColumna = delimitadorMaximaIteracionesFilaColumna - 1;
        for (var i = 0; i < cantidadFilasMatrices; i++) {
            for (var j = 0; j < cantidadColumnasMatrices; j++) {
                aux = 0.0;
                // Realiza la multiplicación de matrices desenrollando el bucle de 2 en 2 iteraciones
                for (var k = 0; k < delimitadorMaximaIteracionesFilaColumna; k += 2) {
                    aux += matrizA[i][k] * matrizB[k][j] + matrizA[i][k + 1] * matrizB[k + 1][j];
                }
                // Añade el producto de la última columna de A y la última fila de B
                matrizResultado[i][j] = aux + matrizA[i][delimitadorMaximaIteracionesFilaColumna] * matrizB[delimitadorMaximaIteracionesFilaColumna][j];
            }
        }
    }

    return matrizResultado;
}
