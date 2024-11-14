/*
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Función para realizar la multiplicación de matrices utilizando el algoritmo de Winograd.

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/
/**
 * 
 * @param {number[][]} matrizA  - matrizA: La primera matriz a multiplicar.
 * @param {number[][]} matrizB  - matrizB: La segunda matriz a multiplicar.
 * @param {number[][]} MatrizResultado - MatrizResultado: Matriz donde se almacenará el resultado de la multiplicación.
 * @param {number} cantidadFilasMatrices - cantidadFilasMatrices: Número de filas en las matrices de entrada.
 * @param {number} cantidadColumnasMatrices - cantidadColumnasMatrices: Número de columnas en las matrices de entrada.
 * @param {number} delimitadorMaximaIteracionesFilaColumna - delimitadorMaximaIteracionesFilaColumna: Límite para el número máximo de iteraciones en filas o columnas.
 * @returns  {number[][]} - MatrizResultado: retorna la matriz resultante.
 */
export function winograd_original(matrizA, matrizB, MatrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna) {

    // Variables auxiliares
    let aux;
    // Calculando epsilon y gamma
    let epsilon = delimitadorMaximaIteracionesFilaColumna % 2;
    let gamma = delimitadorMaximaIteracionesFilaColumna - epsilon;

    // Vectores para almacenar resultados intermedios
    let y = [];
    let z = [];

    // Computando y
    for (let i = 0; i < cantidadColumnasMatrices; i++) {
        aux = 0.0;
        for (let j = 0; j < gamma; j += 2) {
            aux += matrizA[i][j] * matrizA[i][j + 1];
        }
        y[i] = aux;
    }

    // Computando z
    for (let i = 0; i < cantidadFilasMatrices; i++) {
        aux = 0.0;
        for (let j = 0; j < gamma; j += 2) {
            aux += matrizB[j][i] * matrizB[j + 1][i];
        }
        z[i] = aux;
    }

    // Verificando si epsilon es igual a 1
    if (epsilon == 1) {
        // epsilon es impar
        // Se excluye el término matrizA[i][delimitadorMaximaIteracionesFilaColumna-1]*matrizB[delimitadorMaximaIteracionesFilaColumna-1][k] en todas las sumas auxiliares
        delimitadorMaximaIteracionesFilaColumna = delimitadorMaximaIteracionesFilaColumna - 1;
        for (let i = 0; i < cantidadColumnasMatrices; i++) {
            for (let k = 0; k < cantidadFilasMatrices; k++) {
                aux = 0.0;
                for (let j = 0; j < gamma; j += 2) {
                    aux += (matrizA[i][j] + matrizB[j + 1][k]) * (matrizA[i][j + 1] + matrizB[j][k]);
                }
                MatrizResultado[i][k] = aux - y[i] - z[k] + matrizA[i][delimitadorMaximaIteracionesFilaColumna] * matrizB[delimitadorMaximaIteracionesFilaColumna][k];
            }
        }
    } else {
        // epsilon es par
        // El resultado puede ser calculado con las sumas auxiliares
        for (let i = 0; i < cantidadColumnasMatrices; i++) {
            for (let k = 0; k < cantidadFilasMatrices; k++) {
                aux = 0.0;
                for (let j = 0; j < gamma; j += 2) {
                    aux += (matrizA[i][j] + matrizB[j + 1][k]) * (matrizA[i][j + 1] + matrizB[j][k]);
                }
                MatrizResultado[i][k] = aux - y[i] - z[k];
            }
        }
    }
    // Devuelve la matriz resultado
    return MatrizResultado;
}
