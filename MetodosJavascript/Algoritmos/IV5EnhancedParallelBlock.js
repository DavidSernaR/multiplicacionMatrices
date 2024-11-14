/*
Algoritmo tomado del artículo http://paper.ijcsns.org/07_book/201202/20120212.pdf y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo

*/
import{runWorker} from './WorkerAlgoritmosParallel/Worker.js';

export async   function IV5enhanced_parallel_block(matrizA, matrizB, matrizResultado, tamanioBloque) {

const workerScript1=`
const { parentPort } = require('worker_threads');

  
  parentPort.once('message', (workerData) => {
    const { matrizA, matrizB,matrizResultado, tamanioBloque } = workerData;
  
  
    for (var i1 = 0; i1 < matrizResultado.length/2; i1 += tamanioBloque){
      for (var j1 = 0; j1 < matrizResultado.length; j1 += tamanioBloque){
        for (var k1 = 0; k1 < matrizResultado.length; k1 += tamanioBloque){
          for (var i = i1; i < i1 + tamanioBloque && i < matrizResultado.length; i++){
            for (var j = j1; j < j1 + tamanioBloque && j < matrizResultado.length; j++){
              for (var k = k1; k < k1 + tamanioBloque && k < matrizResultado.length; k++){
                matrizResultado[i][k] += matrizA[i][j] * matrizB[j][k];
              }
            }
          }
        }
      }
    }
  
    // Enviar el bloque actualizado de A de vuelta al hilo principal
    parentPort.postMessage({ matrizResultado });
    //parentPort.close()  //Para terminar ejecución
  });

  `;

  const workerScript2=`
const { parentPort } = require('worker_threads');

  
  parentPort.once('message', (workerData) => {
    const { matrizA, matrizB,matrizResultado, tamanioBloque } = workerData;
  
  
    for (var i1 = matrizResultado.length/2; i1 < matrizResultado.length; i1 += tamanioBloque){
      for (var j1 = 0; j1 < matrizResultado.length; j1 += tamanioBloque){
        for (var k1 = 0; k1 < matrizResultado.length; k1 += tamanioBloque){
          for (var i = i1; i < i1 + tamanioBloque && i < matrizResultado.length; i++){
            for (var j = j1; j < j1 + tamanioBloque && j < matrizResultado.length; j++){
              for (var k = k1; k < k1 + tamanioBloque && k < matrizResultado.length; k++){
                matrizResultado[i][k] += matrizA[i][j] * matrizB[j][k];
              }
            }
          }
        }
      }
    }
  
    // Enviar el bloque actualizado de A de vuelta al hilo principal
    parentPort.postMessage({ matrizResultado });
    //parentPort.close()  //Para terminar ejecución
  });

  `;

  
  
    const data = {matrizA, matrizB,matrizResultado, tamanioBloque};
   
    try {
        const result1= runWorker(workerScript1, data); 
        const result2= runWorker(workerScript2, data); 

        const resultados = await Promise.all([result1, result2]);

            matrizResultado=[...llenar_matriz_con_parte(resultados[0].matrizResultado,0,resultados[0].matrizResultado.length/2,0,resultados[0].matrizResultado.length), ...llenar_matriz_con_parte(resultados[1].matrizResultado,resultados[1].matrizResultado.length/2,resultados[1].matrizResultado.length,0,resultados[1].matrizResultado.length)]
        
      return matrizResultado
    } catch (error) {
      console.error('Error en el Worker:', error);
      // Manejo de errores en caso de que el Worker falle
    }
  

}

function llenar_matriz_con_parte(matriz, filaInicio,filaFinal, colInicio, tamanioSubmatriz) {
    // Obtener la porción de la matriz de origen
    let porcionMatriz = matriz.slice(filaInicio,filaFinal).map(row => row.slice(colInicio, colInicio + tamanioSubmatriz));
    
    // Llenar la matriz de destino con la porción y ceros
    let matrizDestino = Array(tamanioSubmatriz/2).fill().map(() => Array(tamanioSubmatriz).fill(0));
    porcionMatriz.forEach((fila, i) => fila.forEach((valor, j) => matrizDestino[i][j] = valor));
    
    return matrizDestino;
}
