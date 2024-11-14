/*
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo

*/
import { naiv_standard } from "../Algoritmos/NaivStandard.js";

/**
 * Realiza un paso del algoritmo de Strassen-Winograd para la multiplicación de matrices.
 * @param {number[][]} matrizA - La primera submatriz de la matriz A.
 * @param {number[][]} matrizB - La primera submatriz de la matriz B.
 * @param {number[][]} matrizResultado - La matriz donde se almacenará el resultado de la multiplicación.
 * @param {number} cantidadFilasMatrices - La cantidad de filas en las submatrices.
 * @param {number} m - El parámetro 'm' para ajustar la recursión.
 * @returns {number[][]} La matriz resultado de la multiplicación.
 */
export function strassen_winograd_step(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, m) {
    let nuevoTamanio;

    // Verifica si la cantidad de filas es par y mayor que 'm'
    if (cantidadFilasMatrices % 2 == 0 && cantidadFilasMatrices > m) {
        nuevoTamanio = cantidadFilasMatrices / 2;

        // Declaración de matrices y variables auxiliares
        let matrizA11 = [], matrizA12 = [], matrizA21 = [], matrizA22 = [];
        let matrizB11 = [], matrizB12 = [], matrizB21 = [], matrizB22 = [];
        let matrizA1 = [], matrizA2 = [], matrizB1 = [], matrizB2 = [];
        let matrizResultadoParte11 = [], matrizResultadoParte12 = [], matrizResultadoParte21 = [], matrizResultadoParte22 = [];
        let ayudante1 = [], ayudante2 = [];
        let auxiliar1 = [], auxiliar2 = [], auxiliar3 = [], auxiliar4 = [], auxiliar5 = [], auxiliar6 = [], auxiliar7 = [], auxiliar8 = [], auxiliar9 = [];

        // Inicialización de las matrices y variables auxiliares
        matrizA11 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizA12 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizA21 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizA22 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizB11 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizB12 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizB21 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizB22 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));

        matrizA1 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizA2 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizB1 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        matrizB2 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));

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
        auxiliar8 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));
        auxiliar9 = Array.from({ length: nuevoTamanio }, () => Array(nuevoTamanio).fill(0));

        // Llenado de las submatrices
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

        // Cálculo de las variables auxiliares
        matrizA1 = matrizA11.slice(0, nuevoTamanio).map((fila, i) => {
            return fila.slice(0, nuevoTamanio).map((valor, j) => {
                return valor - matrizA21[i][j];
              });
          });
  
          matrizA2 = matrizA22.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor - matrizA1[i][j];
              });
          });
  
          matrizB1 = matrizB22.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor - matrizB12[i][j];
              });
          });
  
          matrizB2 = matrizB1.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor + matrizB11[i][j];
              });
          });
  
          auxiliar1 = strassen_winograd_step(matrizA11, matrizB11, auxiliar1, nuevoTamanio, m);
          auxiliar2 = strassen_winograd_step(matrizA12, matrizB21, auxiliar2, nuevoTamanio, m);
          auxiliar3 = strassen_winograd_step(matrizA2, matrizB2, auxiliar3, nuevoTamanio, m);
  
          ayudante1 = matrizA21.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor + matrizA22[i][j];
              });
          });
  
          ayudante2 = matrizB12.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor - matrizB11[i][j];
              });
          });
  
          auxiliar4 = strassen_winograd_step(ayudante1, ayudante2, auxiliar4, nuevoTamanio, m);
          auxiliar5 = strassen_winograd_step(matrizA1, matrizB1, auxiliar5, nuevoTamanio, m);
  
          ayudante1 = matrizA12.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor - matrizA2[i][j];
              });
          });
  
          auxiliar6 = strassen_winograd_step(ayudante1, matrizB22, auxiliar6, nuevoTamanio, m);
  
          ayudante1 = matrizB21.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor - matrizB2[i][j];
              });
          });
  
          auxiliar7 = strassen_winograd_step(matrizA22, ayudante1, auxiliar7, nuevoTamanio, m);
  
          auxiliar8 = auxiliar1.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor + auxiliar3[i][j];
              });
          });
  
          auxiliar9 = auxiliar8.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor + auxiliar4[i][j];
              });
          });
  
          // Cálculo de las partes del resultado
          matrizResultadoParte11 = auxiliar1.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor + auxiliar2[i][j];
              });
          });
  
          matrizResultadoParte12 = auxiliar9.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor + auxiliar6[i][j];
              });
          });
  
          ayudante1 = auxiliar8.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor + auxiliar5[i][j];
              });
          });
  
          matrizResultadoParte21 = ayudante1.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor + auxiliar7[i][j];
              });
          });
  
          matrizResultadoParte22 = auxiliar9.slice(0, nuevoTamanio).map((fila, i) => {
              return fila.slice(0, nuevoTamanio).map((valor, j) => {
                  return valor + auxiliar5[i][j];
              });
          });
  
          // Almacenamiento de los resultados en la matriz de resultado
          for (let i = 0; i < nuevoTamanio; i++) {
              for (let j = 0; j < nuevoTamanio; j++) {
                  matrizResultado[i][j] = matrizResultadoParte11[i][j];
              }
          }
  
          for (let i = 0; i < nuevoTamanio; i++) {
              for (let j = 0; j < nuevoTamanio; j++) {
                  matrizResultado[i][nuevoTamanio + j] = matrizResultadoParte12[i][j];
              }
          }
  
          for (let i = 0; i < nuevoTamanio; i++) {
              for (let j = 0; j < nuevoTamanio; j++) {
                  matrizResultado[nuevoTamanio + i][j] = matrizResultadoParte21[i][j];
              }
          }
  
          for (let i = 0; i < nuevoTamanio; i++) {
              for (let j = 0; j < nuevoTamanio; j++) {
                  matrizResultado[nuevoTamanio + i][nuevoTamanio + j] = matrizResultadoParte22[i][j];
              }
          }
      } else {
          // Utiliza el algoritmo naiv_standard
          matrizResultado = naiv_standard(matrizA, matrizB, matrizResultado, matrizA.length, matrizB.length, matrizResultado.length);
      }
      return matrizResultado;
  }
  
