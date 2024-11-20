/*
Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

// Importación de módulos y funciones necesarias
import { IV3_sequential_block } from "../Algoritmos/IV3SequentialBlock.js"; // Importa la función IV3_sequential_block desde el archivo IV3SequentialBlock.js
import { almacenar_tiempo_ejecucion_json } from "../../Json/GenerarTiempoEjecucionMetodos/AlmacenarTiempoEjecucion.js"; // Importa la función almacenar_tiempo_ejecucion_json desde el archivo AlmacenarTiempoEjecucion.js
import { almacenar_resultados_json } from "../../Json/GenerarResultadosMetodos/AlmacenarResultados.js"; // Importa la función almacenar_resultados_json desde el archivo AlmacenarResultados.js
import { cargar_matriz } from "../../CargarMatrices/CargarMatriz.js"; // Importa la función cargar_matriz desde el archivo CargarMatriz.js

// Ruta de la carpeta de persistencia de datos
const rutaPersistencia = 'Json/PersistenciaDatos';
const NombreAlgoritmo = "IV3SequentialBlock";

// Bucle para iterar sobre los tamaños de las matrices (de 16x16 a 64x64)
for (let i = 1; i <= 8; i++) { // Cambiado a iterar 8 veces, como en el código Python
    let tamano = 2 ** (i + 3); // Tamaños: 16, 32, 64
    let rutaCarpeta = `${rutaPersistencia}/Matrices${tamano}x${tamano}`;

    // Carga de matrices A y B desde archivos JSON específicos de cada tamaño
    let matrizA = cargar_matriz(`${rutaCarpeta}/MatrizA${i}.json`, `MatrizA${i}`);
    let matrizB = cargar_matriz(`${rutaCarpeta}/MatrizB${i}.json`, `MatrizB${i}`);
  
    // Creación de una matriz vacía para almacenar el resultado de la multiplicación
    let matrizResultado = Array.from({ length: matrizA.length }, () => Array(matrizA[0].length).fill(0.0));

    // Medición del tiempo de ejecución del algoritmo III4ParallelBlock
    let TiempoInicio = performance.now(); // Marca de tiempo de inicio
    let matrizR = IV3_sequential_block(matrizA, matrizB, matrizResultado, matrizA.length/2); // Ejecución del algoritmo
    let TiempoFinalizacion = (performance.now() - TiempoInicio) / 1000; // Cálculo del tiempo transcurrido en segundos
  
    // Almacenamiento del tiempo de ejecución en archivo JSON específico para JavaScript
    almacenar_tiempo_ejecucion_json(
        `${rutaCarpeta}/TiempoEjecucion${NombreAlgoritmo}Js.json`,
        `A${i}XB${i} JS`,
        TiempoFinalizacion
    );
  
    // Almacenamiento de las matrices A y B, y el resultado de la multiplicación en archivos JSON específicos para JavaScript
    almacenar_resultados_json(
        `${rutaCarpeta}/Resultado${NombreAlgoritmo}Js.json`,
        `Matriz A${i}xB${i} con método  en JS`,
        matrizR
    );
}