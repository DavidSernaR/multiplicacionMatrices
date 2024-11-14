/*
Algoritmo tomado del artículo http://paper.ijcsns.org/07_book/201202/20120212.pdf y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

import { runWorker } from './WorkerAlgoritmosParallel/Worker.js';

/**
 * Realiza la multiplicación de matrices utilizando un algoritmo de bloque en paralelo mejorado.
 *
 * @param {Array<Array<number>>} matrizA - La primera matriz a multiplicar.
 * @param {Array<Array<number>>} matrizB - La segunda matriz a multiplicar.
 * @param {Array<Array<number>>} matrizResultado - La matriz resultado donde se almacenará el producto.
 * @param {number} tamanioBloque - El tamaño del bloque para la multiplicación en bloques.
 * @returns {Promise<Array<Array<number>>>} - Una promesa que se resuelve con la matriz resultado después de la multiplicación.
 */
export async function III5enhanced_parallel_block(matrizA, matrizB, matrizResultado, tamanioBloque) {

  // Definición del primer script que será ejecutado por el worker
  const workerScript1 = `
  const { parentPort } = require('worker_threads');

  parentPort.once('message', (workerData) => {
    const { matrizA, matrizB, matrizResultado, tamanioBloque } = workerData;

    // Itera sobre la primera mitad de la matrizResultado en bloques de tamaño 'tamanioBloque'
    for (var i1 = 0; i1 < matrizResultado.length / 2; i1 += tamanioBloque) {
      for (var j1 = 0; j1 < matrizResultado.length; j1 += tamanioBloque) {
        for (var k1 = 0; k1 < matrizResultado.length; k1 += tamanioBloque) {
          for (var i = i1; i < i1 + tamanioBloque && i < matrizResultado.length; i++) {
            for (var j = j1; j < j1 + tamanioBloque && j < matrizResultado.length; j++) {
              for (var k = k1; k < k1 + tamanioBloque && k < matrizResultado.length; k++) {
                matrizResultado[i][j] += matrizA[i][k] * matrizB[k][j];
              }
            }
          }
        }
      }
    }

    // Envía el bloque actualizado de vuelta al hilo principal
    parentPort.postMessage({ matrizResultado });
  });
  `;

  // Definición del segundo script que será ejecutado por el worker
  const workerScript2 = `
  const { parentPort } = require('worker_threads');

  parentPort.once('message', (workerData) => {
    const { matrizA, matrizB, matrizResultado, tamanioBloque } = workerData;

    // Itera sobre la segunda mitad de la matrizResultado en bloques de tamaño 'tamanioBloque'
    for (var i1 = matrizResultado.length / 2; i1 < matrizResultado.length; i1 += tamanioBloque) {
      for (var j1 = 0; j1 < matrizResultado.length; j1 += tamanioBloque) {
        for (var k1 = 0; k1 < matrizResultado.length; k1 += tamanioBloque) {
          for (var i = i1; i < i1 + tamanioBloque && i < matrizResultado.length; i++) {
            for (var j = j1; j < j1 + tamanioBloque && j < matrizResultado.length; j++) {
              for (var k = k1; k < k1 + tamanioBloque && k < matrizResultado.length; k++) {
                matrizResultado[i][j] += matrizA[i][k] * matrizB[k][j];
              }
            }
          }
        }
      }
    }

    // Envía el bloque actualizado de vuelta al hilo principal
    parentPort.postMessage({ matrizResultado });
  });
  `;

  // Datos que se enviarán a los workers
  const data = { matrizA, matrizB, matrizResultado, tamanioBloque };

  try {
    // Ejecuta los workers con los scripts y datos proporcionados
    const result1 = runWorker(workerScript1, data);
    const result2 = runWorker(workerScript2, data);

    // Espera a que ambos workers completen su trabajo
    const resultados = await Promise.all([result1, result2]);

    // Combina los resultados de ambos workers en la matrizResultado
    matrizResultado = [
      ...llenar_matriz_con_parte(resultados[0].matrizResultado, 0, resultados[0].matrizResultado.length / 2, 0, resultados[0].matrizResultado.length),
      ...llenar_matriz_con_parte(resultados[1].matrizResultado, resultados[1].matrizResultado.length / 2, resultados[1].matrizResultado.length, 0, resultados[1].matrizResultado.length)
    ];

    return matrizResultado;
  } catch (error) {
    console.error('Error en el Worker:', error);
    // Manejo de errores en caso de que el worker falle
  }
}

/**
 * Llena una matriz de destino con una porción de otra matriz.
 *
 * @param {Array<Array<number>>} matriz - La matriz de origen.
 * @param {number} filaInicio - La fila inicial de la porción.
 * @param {number} filaFinal - La fila final de la porción.
 * @param {number} colInicio - La columna inicial de la porción.
 * @param {number} tamanioSubmatriz - El tamaño de la submatriz.
 * @returns {Array<Array<number>>} - La matriz de destino llena con la porción de la matriz de origen.
 */
function llenar_matriz_con_parte(matriz, filaInicio, filaFinal, colInicio, tamanioSubmatriz) {
  // Obtener la porción de la matriz de origen
  let porcionMatriz = matriz.slice(filaInicio, filaFinal).map(row => row.slice(colInicio, colInicio + tamanioSubmatriz));

  // Llenar la matriz de destino con la porción y ceros
  let matrizDestino = Array(tamanioSubmatriz / 2).fill().map(() => Array(tamanioSubmatriz).fill(0));
  porcionMatriz.forEach((fila, i) => fila.forEach((valor, j) => matrizDestino[i][j] = valor));

  return matrizDestino;
}
