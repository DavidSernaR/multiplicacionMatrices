/*
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo

*/

import { strassen_winograd_step } from "../Algoritmos/StrassenWinogradStep.js";

/**
 * Realiza la multiplicación de matrices utilizando el algoritmo de Strassen-Winograd.
 * @param {number[][]} matrizA - La primera matriz a multiplicar.
 * @param {number[][]} matrizB - La segunda matriz a multiplicar.
 * @param {number[][]} matrizResultado - La matriz donde se almacenará el resultado de la multiplicación.
 * @param {number} cantidadFilasMatrices - La cantidad de filas en las matrices A y B.
 * @param {number} cantidadColumnasMatrices - La cantidad de columnas en la matriz B.
 * @param {number} delimitadorMaximaIteracionesFilaColumna - El valor de delimitador máximo de las iteraciones de fila y columna.
 * @returns {number[][]} La matriz resultado de la multiplicación.
 */
export function strassen_winograd(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna) {
    // Determina el tamaño máximo para asegurar que sea potencia de 2 y al menos 16
    let tamanioMaximo = Math.max(cantidadFilasMatrices, delimitadorMaximaIteracionesFilaColumna);
    if (tamanioMaximo < 16) tamanioMaximo = 16;

    // Calcula k y m para ajustar la recursión
    let k = Math.floor(Math.log(tamanioMaximo) / Math.log(2)) - 4;
    let m = Math.floor(tamanioMaximo * Math.pow(2, -k)) + 1;
    let nuevoTamanio = m * Math.pow(2, k);

    let nuevaMatrizA = [];
    let nuevaMatrizB = [];
    let matrizResultadoAuxiliar = [];

    // Asignar memoria para cada fila
    for (let i = 0; i < nuevoTamanio; i++) {
        nuevaMatrizA[i] = new Array(nuevoTamanio).fill(0.0);
        nuevaMatrizB[i] = new Array(nuevoTamanio).fill(0.0);
        matrizResultadoAuxiliar[i] = new Array(nuevoTamanio).fill(0.0);
    }

    // Asigna valores de las matrices A y B a las matrices nuevas
    for (let i = 0; i < cantidadFilasMatrices; i++) {
        for (let j = 0; j < delimitadorMaximaIteracionesFilaColumna; j++) {
            nuevaMatrizA[i][j] = matrizA[i][j];
        }
    }

    for (let i = 0; i < delimitadorMaximaIteracionesFilaColumna; i++) {
        for (let j = 0; j < cantidadColumnasMatrices; j++) {
            nuevaMatrizB[i][j] = matrizB[i][j];
        }
    }

    // Realiza el paso del algoritmo de Strassen-Winograd
    matrizResultadoAuxiliar = strassen_winograd_step(nuevaMatrizA, nuevaMatrizB, matrizResultadoAuxiliar, nuevoTamanio, m);

    // Asigna los valores de la matriz resultado
    for (let i = 0; i < cantidadFilasMatrices; i++) {
        for (let j = 0; j < cantidadColumnasMatrices; j++) {
            matrizResultado[i][j] = matrizResultadoAuxiliar[i][j];
        }
    }

    // Devuelve la matriz resultado
    return matrizResultado;
}
