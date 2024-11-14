/*
Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

// Importación de módulos y funciones necesarias
import { III3_sequential_block } from "../Algoritmos/III3SequentialBlock.js";
import { almacenar_tiempo_ejecucion_json } from "../../Json/GenerarTiempoEjecucionMetodos/AlmacenarTiempoEjecucion.js";
import { almacenar_resultados_json } from "../../Json/GenerarResultadosMetodos/AlmacenarResultados.js";
import { cargar_matriz } from "../../CargarMatrices/CargarMatriz.js";

// Ruta de la carpeta de persistencia de datos
const rutaPersistencia = 'Json/PersistenciaDatos';

// Bucle para iterar sobre tamaños de matriz, de 16x16 a 2048x2048
for (let i = 1; i <= 3; i++) {  // Cambiado a 8 iteraciones
    let tamano = 2 ** (i + 3); // Tamaños: 16, 32, 64, ..., 2048
    let rutaCarpeta = `${rutaPersistencia}/Matrices${tamano}x${tamano}`;

    // Carga de matrices A y B desde archivos JSON específicos de cada tamaño
    let matrizA = cargar_matriz(`${rutaCarpeta}/MatrizA${i}.json`, `MatrizA${i}`);
    let matrizB = cargar_matriz(`${rutaCarpeta}/MatrizB${i}.json`, `MatrizB${i}`);


    // Creación de una matriz vacía para almacenar el resultado de la multiplicación
    let matrizResultado = Array.from({ length: matrizA.length }, () => Array(matrizA[0].length).fill(0));

    // Medición del tiempo de ejecución del algoritmo III3SequentialBlock
    let TiempoInicio = performance.now();
    let matrizR = III3_sequential_block(matrizA, matrizB, matrizResultado, matrizA.length / 2);
    let TiempoFinalizacion = (performance.now() - TiempoInicio) / 1000;

    // Almacenamiento del tiempo de ejecución en archivo JSON específico para JavaScript
    almacenar_tiempo_ejecucion_json(
        `${rutaCarpeta}/TiempoEjecucionIII3SequentialBlockJs.json`,
        `A${i}XB${i} JS`,
        TiempoFinalizacion
    );

    // Almacenamiento solo de la matriz resultante en archivo JSON específico para JavaScript
    await almacenar_resultados_json(
        `${rutaCarpeta}/ResultadoIII3SequentialBlockJs.json`,
        `Matriz A${i}xB${i} con método III3SequentialBlock en JS`,
        matrizR
    );
}
