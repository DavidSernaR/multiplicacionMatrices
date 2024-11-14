/*
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

/**
 * Realiza la multiplicación de matrices utilizando un bucle naive con desenrollado de bucle de 4 iteraciones.
 *
 * @param {Array<Array<number>>} matrizA - La primera matriz a multiplicar.
 * @param {Array<Array<number>>} matrizB - La segunda matriz a multiplicar.
 * @param {Array<Array<number>>} matrizResultado - La matriz donde se almacenará el resultado de la multiplicación.
 * @param {number} cantidadFilasMatrices - La cantidad de filas en las matrices A y Resultado.
 * @param {number} cantidadColumnasMatrices - La cantidad de columnas en las matrices B y Resultado.
 * @param {number} delimitadorMaximaIteracionesFilaColumna - El delimitador para la cantidad máxima de iteraciones en el bucle de fila y columna.
 * @returns {Array<Array<number>>} - La matriz resultado después de la multiplicación.
 */
export function naiv_loop_unrolling_four(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna) {

    let aux;

    // Comprueba el valor del delimitadorMaximaIteracionesFilaColumna para determinar el desenrollado del bucle
    if (delimitadorMaximaIteracionesFilaColumna % 4 == 0) {
        // Realiza la multiplicación de matrices desenrollando el bucle de 4 en 4 iteraciones
        for (let i = 0; i < cantidadFilasMatrices; i++) {
            for (let j = 0; j < cantidadColumnasMatrices; j++) {
                aux = 0.0;
                for (let k = 0; k < delimitadorMaximaIteracionesFilaColumna; k += 4) {
                    aux += matrizA[i][k] * matrizB[k][j] + matrizA[i][k + 1] * matrizB[k + 1][j] + matrizA[i][k + 2] * matrizB[k + 2][j] + matrizA[i][k + 3] * matrizB[k + 3][j];
                }
                matrizResultado[i][j] = aux;
            }
        }
    } else if (delimitadorMaximaIteracionesFilaColumna % 4 == 1) {
        // Realiza la multiplicación de matrices desenrollando el bucle de 4 en 4 iteraciones y calcula la última posición adicional
        delimitadorMaximaIteracionesFilaColumna = delimitadorMaximaIteracionesFilaColumna - 1;
        for (let i = 0; i < cantidadFilasMatrices; i++) {
            for (let j = 0; j < cantidadColumnasMatrices; j++) {
                aux = 0.0;
                for (let k = 0; k < delimitadorMaximaIteracionesFilaColumna; k += 4) {
                    aux += matrizA[i][k] * matrizB[k][j] + matrizA[i][k + 1] * matrizB[k + 1][j] + matrizA[i][k + 2] * matrizB[k + 2][j] + matrizA[i][k + 3] * matrizB[k + 3][j];
                }
                matrizResultado[i][j] = aux + matrizA[i][delimitadorMaximaIteracionesFilaColumna] * matrizB[delimitadorMaximaIteracionesFilaColumna][j];
            }
        }
    } else if (delimitadorMaximaIteracionesFilaColumna % 4 == 2) {
        // Realiza la multiplicación de matrices desenrollando el bucle de 4 en 4 iteraciones y calcula las últimas 2 posiciones adicionales
        let delimitadorMaximaIteracionesFilaColumna1 = delimitadorMaximaIteracionesFilaColumna - 1;
        delimitadorMaximaIteracionesFilaColumna = delimitadorMaximaIteracionesFilaColumna - 2;
        for (let i = 0; i < cantidadFilasMatrices; i++) {
            for (let j = 0; j < cantidadColumnasMatrices; j++) {
                aux = 0.0;
                for (let k = 0; k < delimitadorMaximaIteracionesFilaColumna; k += 4) {
                    aux += matrizA[i][k] * matrizB[k][j] + matrizA[i][k + 1] * matrizB[k + 1][j] + matrizA[i][k + 2] * matrizB[k + 2][j] + matrizA[i][k + 3] * matrizB[k + 3][j];
                }
                matrizResultado[i][j] = aux + matrizA[i][delimitadorMaximaIteracionesFilaColumna] * matrizB[delimitadorMaximaIteracionesFilaColumna][j] + matrizA[i][delimitadorMaximaIteracionesFilaColumna1] * matrizB[delimitadorMaximaIteracionesFilaColumna1][j];
            }
        }
    } else {
        // Realiza la multiplicación de matrices desenrollando el bucle de 4 en 4 iteraciones y calcula las últimas 3 posiciones adicionales
        delimitadorMaximaIteracionesFilaColumna = delimitadorMaximaIteracionesFilaColumna - 3;
        let delimitadorMaximaIteracionesFilaColumna1 = delimitadorMaximaIteracionesFilaColumna - 1;
        let delimitadorMaximaIteracionesFilaColumna2 = delimitadorMaximaIteracionesFilaColumna - 2;
        for (let i = 0; i < cantidadFilasMatrices; i++) {
            for (let j = 0; j < cantidadColumnasMatrices; j++) {
                aux = 0.0;
                for (let k = 0; k < delimitadorMaximaIteracionesFilaColumna; k += 4) {
                    aux += matrizA[i][k] * matrizB[k][j] + matrizA[i][k + 1] * matrizB[k + 1][j] + matrizA[i][k + 2] * matrizB[k + 2][j] + matrizA[i][k + 3] * matrizB[k + 3][j];
                }
                matrizResultado[i][j] = aux + matrizA[i][delimitadorMaximaIteracionesFilaColumna] * matrizB[delimitadorMaximaIteracionesFilaColumna][j] + matrizA[i][
                    delimitadorMaximaIteracionesFilaColumna2] * matrizB[delimitadorMaximaIteracionesFilaColumna2][j] + matrizA[i][delimitadorMaximaIteracionesFilaColumna1] * matrizB[delimitadorMaximaIteracionesFilaColumna1][j];
                }
            }
        }
    
        return matrizResultado;
    }
    