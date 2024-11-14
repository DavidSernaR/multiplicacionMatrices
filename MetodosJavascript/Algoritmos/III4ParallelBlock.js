/*
Algoritmo tomado del artículo http://paper.ijcsns.org/07_book/201202/20120212.pdf y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

import { runWorker } from './WorkerAlgoritmosParallel/Worker.js';

/**
 * Realiza la multiplicación de matrices utilizando un algoritmo de bloque en paralelo.
 *
 * @param {Array<Array<number>>} matrizA - La primera matriz a multiplicar.
 * @param {Array<Array<number>>} matrizB - La segunda matriz a multiplicar.
 * @param {Array<Array<number>>} matrizResultado - La matriz resultado donde se almacenará el producto.
 * @param {number} tamanioBloque - El tamaño del bloque para la multiplicación en bloques.
 * @returns {Promise<Array<Array<number>>>} - Una promesa que se resuelve con la matriz resultado después de la multiplicación.
 */
export async function III4parallel_block(matrizA, matrizB, matrizResultado, tamanioBloque) {

  // Definición del script que será ejecutado por el worker
  const workerScript = `
  const { parentPort } = require('worker_threads');

  parentPort.once('message', (workerData) => {
    const { matrizA, matrizB, matrizResultado, tamanioBloque } = workerData;

    // Itera sobre las matrices en bloques de tamaño 'tamanioBloque'
    for (var i1 = 0; i1 < matrizResultado.length; i1 += tamanioBloque){
      for (var j1 = 0; j1 < matrizResultado.length; j1 += tamanioBloque){
        for (var k1 = 0; k1 < matrizResultado.length; k1 += tamanioBloque){
          for (var i = i1; i < i1 + tamanioBloque && i < matrizResultado.length; i++){
            for (var j = j1; j < j1 + tamanioBloque && j < matrizResultado.length; j++){
              for (var k = k1; k < k1 + tamanioBloque && k < matrizResultado.length; k++){
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

  // Datos que se enviarán al worker
  const data = { matrizA, matrizB, matrizResultado, tamanioBloque };

  try {
    // Ejecuta el worker con el script y los datos proporcionados
    const result = await runWorker(workerScript, data);

    // Actualiza la matrizResultado con el resultado obtenido del worker
    matrizResultado = result.matrizResultado;
    return matrizResultado; //Retorna la matrizResultado
  } catch (error) {
    console.error('Error en el Worker:', error);
    // Manejo de errores en caso de que el worker falle
  }
}
