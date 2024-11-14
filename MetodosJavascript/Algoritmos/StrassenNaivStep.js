/*
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

import { naiv_standard } from "../Algoritmos/NaivStandard.js";

/**
 * Realiza un paso del algoritmo de Strassen de manera naiva.
 *
 * @param {Array<Array<number>>} matrizA - La primera matriz involucrada en la multiplicación.
 * @param {Array<Array<number>>} matrizB - La segunda matriz involucrada en la multiplicación.
 * @param {Array<Array<number>>} matrizResultado - La matriz donde se almacenará el resultado de la multiplicación.
 * @param {number} cantidadFilasMatrices - La cantidad de filas en las matrices A y B.
 * @param {number} m - Parámetro de ajuste para la recursión.
 * @returns {Array<Array<number>>} - La matriz resultado después de este paso del algoritmo de Strassen.
 */
export function strassen_naiv_step(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, m) {
    let nuevoTamanio;

    // Verificar si la cantidad de filas de las matrices es par y mayor que m
    if (cantidadFilasMatrices % 2 === 0 && cantidadFilasMatrices > m) {
        nuevoTamanio = cantidadFilasMatrices / 2;

        // Declaración de matrices para las subdivisiones de A, B y el resultado
        let matrizA11 = [];
        let matrizA12 = [];
        let matrizA21 = [];
        let matrizA22 = [];
        let matrizB11 = [];
        let matrizB12 = [];
        let matrizB21 = [];
        let matrizB22 = [];
        let matrizResultadoParte11 = [];
        let matrizResultadoParte12 = [];
        let matrizResultadoParte21 = [];
        let matrizResultadoParte22 = [];
        let ayudante1 = [];
        let ayudante2 = [];
        let auxiliar1 = [];
        let auxiliar2 = [];
        let auxiliar3 = [];
        let auxiliar4 = [];
        let auxiliar5 = [];
        let auxiliar6 = [];
        let auxiliar7 = [];

        // Inicialización de las matrices con ceros
        matrizA11 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizA12 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizA21 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizA22 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizB11 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizB12 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizB21 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizB22 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizResultadoParte11 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizResultadoParte12 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizResultadoParte21 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizResultadoParte22 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        ayudante1 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        ayudante2 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        auxiliar1 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        auxiliar2 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        auxiliar3 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        auxiliar4 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        auxiliar5 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        auxiliar6 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        auxiliar7 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));

        // Llenado de las matrices con valores correspondientes de A y B
        for (let i = 0; i < nuevoTamanio; i++) {
            for (let j = 0; j < nuevoTamanio; j++) {
                matrizA11[i][j] = matrizA[i][j];
                matrizA12[i][j] = matrizA[i][nuevoTamanio + j];
                matrizA21[i][j] = matrizA[nuevoTamanio + i][j];
                matrizA22[i][j] = matrizA[nuevoTamanio + i][nuevoTamanio + j];
                matrizB11[i][j] = matrizB[i][j];
                matrizB12[i][j] = matrizB[i][nuevoTamanio + j];
                matrizB21[i][j] = matrizB[nuevoTamanio + i][j];
                matrizB22[i][j] = matrizB[nuevoTamanio + i][nuevoTamanio + j];
            }
        }

        // Cálculo de las siete variables auxiliares
        ayudante1 = matrizA11.map((fila, i) => fila.map((valor, j) => valor + matrizA22[i][j]));
        ayudante2 = matrizB11.map((fila, i) => fila.map((valor, j) => valor + matrizB22[i][j]));
        auxiliar1 = strassen_naiv_step(ayudante1, ayudante2, auxiliar1, nuevoTamanio, m);

        ayudante1 = matrizA21.map((fila, i) => fila.map((valor, j) => valor + matrizA22[i][j]));
        auxiliar2 = strassen_naiv_step(ayudante1, matrizB11, auxiliar2, nuevoTamanio, m);

        ayudante1 = matrizB12.map((fila, i) => fila.map((valor, j) => valor - matrizB22[i][j]));
        auxiliar3 = strassen_naiv_step(matrizA11, ayudante1, auxiliar3, nuevoTamanio, m);

        ayudante1 = matrizB21.map((fila, i) => fila.map((valor, j) => valor - matrizB11[i][j]));
        auxiliar4 = strassen_naiv_step(matrizA22, ayudante1, auxiliar4, nuevoTamanio, m);

        ayudante1 = matrizA11.map((fila, i) => fila.map((valor, j) => valor + matrizA12[i][j]));
        auxiliar5 = strassen_naiv_step(ayudante1, matrizB22, auxiliar5, nuevoTamanio, m);

        ayudante1 = matrizA21.map((fila, i) => fila.map((valor, j) => valor - matrizA11[i][j]));
        ayudante2 = matrizB11.map((fila, i) => fila.map((valor, j) => valor + matrizB12[i][j]));
        auxiliar6 = strassen_naiv_step(ayudante1, ayudante2, auxiliar6, nuevoTamanio, m);

        ayudante1 = matrizA12.map((fila, i) => fila.map((valor, j) => valor - matrizA22[i][j]));
        ayudante2 = matrizB21.map((fila, i) => fila.map((valor, j) => valor + matrizB22[i][j]));
        auxiliar7 = strassen_naiv_step(ayudante1, ayudante2, auxiliar7, nuevoTamanio, m);

        // Cálculo de las partes del resultado
        matrizResultadoParte11 = auxiliar1.map((fila, i) => fila.map((valor, j) => valor + auxiliar4[i][j]));
        matrizResultadoParte11 = matrizResultadoParte11.map((fila, i) => fila.map((valor, j) => valor - auxiliar5[i][j]));
        matrizResultadoParte11 = matrizResultadoParte11.map((fila, i) => fila.map((valor, j) => valor + auxiliar7[i][j]));

        matrizResultadoParte12 = auxiliar3.map((fila, i) => fila.map((valor, j) => valor + auxiliar5[i][j]));

        matrizResultadoParte21 = auxiliar2.map((fila, i) => fila.map((valor, j) => valor + auxiliar4[i][j]));

        matrizResultadoParte22 = auxiliar1.map((fila, i) => fila.map((valor, j) => valor + auxiliar3[i][j]));
        matrizResultadoParte22 = matrizResultadoParte22.map((fila, i) => fila.map((valor, j) => valor - auxiliar2[i][j]));
        matrizResultadoParte22 = matrizResultadoParte22.map((fila, i) => fila.map((valor, j) => valor + auxiliar6[i][j]));

        // Almacenamiento de los resultados en la matriz resultado final
        for (let i = 0; i < nuevoTamanio; i++) {
            for (let j = 0; j < nuevoTamanio; j++) {
                matrizResultado[i][j] = matrizResultadoParte11[i][j];
                matrizResultado[i][nuevoTamanio + j] = matrizResultadoParte12[i][j];
                matrizResultado[nuevoTamanio + i][j] = matrizResultadoParte21[i][j];
                matrizResultado[nuevoTamanio + i][nuevoTamanio + j] = matrizResultadoParte22[i][j];
            }
        }
    } else {
        // En caso contrario, se utiliza el algoritmo naive estándar
        matrizResultado = naiv_standard(matrizA, matrizB, matrizResultado, matrizA.length, matrizB.length, matrizResultado.length);
    }

    // Se devuelve la matriz resultado
    return matrizResultado;
}