/*
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

import { strassen_naiv_step } from "../Algoritmos/StrassenNaivStep.js";

/**
 * Realiza la multiplicación de matrices utilizando el algoritmo de Strassen de manera naiva.
 *
 * @param {Array<Array<number>>} matrizA - La primera matriz a multiplicar.
 * @param {Array<Array<number>>} matrizB - La segunda matriz a multiplicar.
 * @param {Array<Array<number>>} matrizResultado - La matriz donde se almacenará el resultado de la multiplicación.
 * @param {number} cantidadFilasMatrices - La cantidad de filas en las matrices A y Resultado.
 * @param {number} cantidadColumnasMatrices - La cantidad de columnas en las matrices B y Resultado.
 * @param {number} delimitadorMaximaIteracionesFilaColumna - La cantidad máxima de iteraciones en el bucle de fila y columna.
 * @returns {Array<Array<number>>} - La matriz resultado después de la multiplicación.
 */
export function strassen_naiv(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna) {
    // Calcular el tamaño máximo para las matrices
    let tamanioMaximo = Math.max(cantidadFilasMatrices, delimitadorMaximaIteracionesFilaColumna);
    tamanioMaximo = Math.max(tamanioMaximo, cantidadFilasMatrices);

    // Ajustar el tamaño máximo para garantizar que sea potencia de 2
    if (tamanioMaximo < 16) tamanioMaximo = 16; // Si no, no es posible computar K

    // Calcular k y m
    let k = Math.floor(Math.log(tamanioMaximo) / Math.log(2)) - 4;
    let m = Math.floor(tamanioMaximo * Math.pow(2, -k)) + 1; // reducir la recursión; idea de Strassen
    let nuevoTamanio = m * Math.pow(2, k);

    // Crear nuevas matrices para almacenar los valores de matrizA, matrizB y matrizResultado
    let nuevaMatrizA = [];
    let nuevaMatrizB = [];
    let matrizResultadoAuxiliar = [];

    // Asignar memoria para cada fila de las nuevas matrices
    for (let i = 0; i < nuevoTamanio; i++) {
        nuevaMatrizA[i] = [];
        nuevaMatrizB[i] = [];
        matrizResultadoAuxiliar[i] = [];
    }

    // Inicializar cada elemento de las nuevas matrices A y B con ceros
    for (let i = 0; i < nuevoTamanio; i++) {
        for (let j = 0; j < nuevoTamanio; j++) {
            nuevaMatrizA[i][j] = 0.0;
            nuevaMatrizB[i][j] = 0.0;
        }
    }

    // Asignar valores de las matrices A y B a las nuevas matrices
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

    // Realizar la multiplicación de matrices utilizando el algoritmo de Strassen naivo
    matrizResultadoAuxiliar = strassen_naiv_step(nuevaMatrizA, nuevaMatrizB, matrizResultadoAuxiliar, nuevoTamanio, m);

    // Copiar los resultados a la matriz resultado original
    for (let i = 0; i < cantidadFilasMatrices; i++) {
        for (let j = 0; j < cantidadColumnasMatrices; j++) {
            matrizResultado[i][j] = matrizResultadoAuxiliar[i][j];
        }
    }

    // Retorna la matriz resultado después de completar la multiplicación de matrices
    return matrizResultado;
}
