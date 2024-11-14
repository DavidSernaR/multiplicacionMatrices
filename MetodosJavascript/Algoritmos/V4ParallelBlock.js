/*
Algoritmo tomado del artículo http://paper.ijcsns.org/07_book/201202/20120212.pdf y adaptado con la ayuda de inteligencia artificial

Este algoritmo implementa una versión paralela del método de multiplicación de matrices utilizando bloques y Web Workers.
Divide las matrices de entrada en bloques de tamaño especificado y utiliza Web Workers para realizar la multiplicación de bloques de manera paralela.
Esto puede ayudar a mejorar la eficiencia al aprovechar el procesamiento paralelo disponible en los navegadores modernos.

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

import { runWorker } from './WorkerAlgoritmosParallel/Worker.js';

export async function V4_parallel_block(matrizA, matrizB, matrizResultado, tamanioBloque) {
    // Script que se ejecutará en el Worker
    const workerScript = `
        const { parentPort } = require('worker_threads');

        // Función principal que realiza la multiplicación de matrices en bloques
        parentPort.once('message', (workerData) => {
            const { matrizA, matrizB, matrizResultado, tamanioBloque } = workerData;

            for (var i1 = 0; i1 < matrizResultado.length; i1 += tamanioBloque) {
                for (var j1 = 0; j1 < matrizResultado.length; j1 += tamanioBloque) {
                    for (var k1 = 0; k1 < matrizResultado.length; k1 += tamanioBloque) {
                        for (var i = i1; i < i1 + tamanioBloque && i < matrizResultado.length; i++) {
                            for (var j = j1; j < j1 + tamanioBloque && j < matrizResultado.length; j++) {
                                for (var k = k1; k < k1 + tamanioBloque && k < matrizResultado.length; k++) {
                                    matrizResultado[k][i] += matrizA[k][j] * matrizB[j][i];
                                }
                            }
                        }
                    }
                }
            }

            // Enviar el bloque actualizado de la matriz resultado de vuelta al hilo principal
            parentPort.postMessage({ matrizResultado });
        });
    `;

    // Datos que se enviarán al Worker
    const data = { matrizA, matrizB, matrizResultado, tamanioBloque };

    try {
        // Ejecutar el Worker y esperar el resultado
        const result = await runWorker(workerScript, data);
        // Actualizar la matriz resultado con el resultado del Worker
        matrizResultado = result.matrizResultado;
        return matrizResultado; //Retorna la matriz Resultado
    } catch (error) {
        // Manejo de errores en caso de que el Worker falle
        console.error('Error en el Worker:', error);
    }
}
