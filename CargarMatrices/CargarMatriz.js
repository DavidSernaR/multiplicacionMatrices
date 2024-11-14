/*
Algoritmo implementado con la ayuda de inteligencia artificial


Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
*/

import * as fs from "fs";// Importa el módulo fs para manipulación de archivos

/**
 * Carga una matriz desde un archivo JSON y la convierte en una matriz de números.
 * @param {string} nombreArchivo - Nombre del archivo JSON que contiene la matriz.
 * @param {string} valorLlave - Nombre de la llave que contiene la matriz en el archivo JSON.
 * @returns {number[][]} - La matriz convertida en una matriz de números.
 */

export function cargar_matriz(nombreArchivo,valorLlave){
      // Lee el contenido del archivo
    let variable = fs.readFileSync(nombreArchivo,"utf8");
    
    // Convierte el contenido del archivo JSON en un objeto JavaScript

    variable = JSON.parse(variable);
    // Extrae la matriz del objeto usando el valor de la llave proporcionada

    let matriz = variable[valorLlave];
    
 // Reemplazar [] por Array()
let cadena = matriz.replace(/\[/g,'Array('); 
cadena = cadena.replace(/\]/g,')');

    // Evalúa la cadena como código JavaScript para obtener la matriz
    const nuevaMatriz = eval(cadena);
      
    // Mapea cada elemento de la matriz a números, esto debido a que en el json son strings

const map1 = nuevaMatriz.map((subArray) => {
    return subArray.map((x) => Number(x));
  });
  
    return map1 //Retorna la matriz
   
}

