/*
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

import { winograd_original } from "./WinogradOriginal.js"

/**
 * Realiza la multiplicación de matrices utilizando el algoritmo de Winograd escalado.
 * 
 * @param {number[][]} matrizA - La primera matriz a multiplicar.
 * @param {number[][]} matrizB - La segunda matriz a multiplicar.
 * @param {number[][]} matrizResultado - Matriz donde se almacenará el resultado de la multiplicación.
 * @param {number} cantidadFilasMatrices - Número de filas en las matrices de entrada.
 * @param {number} cantidadColumnasMatrices - Número de columnas en las matrices de entrada.
 * @param {number} delimitadorMaximaIteracionesFilaColumna - Límite para el número máximo de iteraciones en filas o columnas.
 * @returns {number[][]} - La matriz resultante de la multiplicación.
 */
export function winograd_scaled(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna) {

    // Copia de las matrices originales
    let copiaMatrizA = matrizA.map(fila => fila.map(() => undefined));
    let copiaMatrizB = matrizB.map(fila => fila.map(() => undefined));

    // Cálculo de la norma infinito para las matrices A y B
    let a = norma_infinito(matrizA);
    let b = norma_infinito(matrizB);

    // Cálculo de lambda
    let lambda = Math.floor(0.5 + Math.log(b / a) / Math.log(4));

    // Escalado de las matrices A y B
    copiaMatrizA = multiplicacion_con_escalar(matrizA, matrizResultado, Math.pow(2, lambda));
    copiaMatrizB = multiplicacion_con_escalar(matrizB, matrizResultado, Math.pow(2, -lambda));

    // Aplicación del algoritmo de Winograd original
    matrizResultado = winograd_original(copiaMatrizA, copiaMatrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna);
    
    // Devuelve la matriz resultado
    return matrizResultado;
}

/**
 * Calcula la norma infinito de una matriz.
 * 
 * @param {number[][]} matriz - La matriz de entrada.
 * @returns {number} - La norma infinito de la matriz.
 */
function norma_infinito(matriz) {
    let norm = 0.0;
    let aux = matriz.reduce((sum, row) => {
        return sum + row.reduce((rowSum, num) => rowSum + Math.abs(num), 0)
    }, 0);
    norm = Math.max(norm, aux);
    return norm;
}

/**
 * Multiplica una matriz por un escalar.
 * 
 * @param {number[][]} matrizA - La matriz a escalar.
 * @param {number[][]} matrizResultado - Matriz donde se almacenará el resultado de la multiplicación por escalar.
 * @param {number} escalar - El escalar por el cual se multiplica la matriz.
 * @returns {number[][]} - La matriz resultante de la multiplicación por escalar.
 */
function multiplicacion_con_escalar(matrizA, matrizResultado, escalar) {
    matrizResultado = matrizA.map(fila => fila.map(valor => valor * escalar));
    return matrizResultado;
}
