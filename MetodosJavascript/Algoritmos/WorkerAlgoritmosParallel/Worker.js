/*
Algoritmo realizado con ayuda de la inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

// Importa la clase Worker del módulo worker_threads de Node.js
import { Worker } from 'worker_threads';

/**
 * Ejecuta un script en un hilo separado utilizando Worker Threads.
 *
 * @param {string} workerScript - El script que será ejecutado por el worker.
 * @param {*} workerData - Los datos que se enviarán al worker para su procesamiento.
 * @returns {Promise} - Una promesa que se resuelve con el mensaje del worker o se rechaza con un error.
 */
export async function runWorker(workerScript, workerData) {
  return new Promise((resolve, reject) => {
    // Crea una nueva instancia de Worker y evalúa el workerScript como código
    const worker = new Worker(workerScript, { eval: true });

    // Maneja el evento 'message' del worker, resolviendo la promesa con el mensaje recibido
    worker.on('message', resolve);
    
    // Maneja el evento 'error' del worker, rechazando la promesa con el error recibido
    worker.on('error', reject);
    
    // Maneja el evento 'exit' del worker, verificando el código de salida
    worker.on('exit', (code) => {
      // Si el código de salida no es 0, rechaza la promesa con un error
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });

    // Envía los datos al worker para su procesamiento
    worker.postMessage(workerData);
  });
}