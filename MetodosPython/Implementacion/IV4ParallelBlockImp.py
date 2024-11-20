'''
Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo

'''

import os
import numpy as np
import time
import sys

# Insertar rutas para importar los módulos necesarios
sys.path.insert(0, 'C:/MultiplicacionMatricesGrandesProyectoFinal/MetodosPython/Algoritmos')
from IV4ParallelBlock import  IV4parallel_block
sys.path.insert(0, 'C:/MultiplicacionMatricesGrandesProyectoFinal/CargarMatrices')
from CargarMatriz import cargar_matriz
sys.path.insert(0, 'C:/MultiplicacionMatricesGrandesProyectoFinal/Json/GenerarTiempoEjecucionMetodos')
from AlmacenarTiempoEjecucion import almacenar_tiempo_ejecucion_json
sys.path.insert(0, 'C:/MultiplicacionMatricesGrandesProyectoFinal/Json/GenerarResultadosMetodos')
from AlmacenarResultados import almacenar_resultados_json

# Ruta de la carpeta de persistencia de datos
ruta_persistencia = 'C:/MultiplicacionMatricesGrandesProyectoFinal/Json/PersistenciaDatos'

# Bucle para cargar matrices y realizar la multiplicación
for i in range(1, 9):
    tamano = 2 ** (i + 3)  # Tamaños: 16, 32, 64, ...
    ruta_carpeta = f"{ruta_persistencia}/Matrices{tamano}x{tamano}"

    # Carga de matrices A y B desde archivos JSON específicos de cada tamaño
    matrizA = cargar_matriz(f"{ruta_carpeta}/MatrizA{i}.json", f"MatrizA{i}")
    matrizB = cargar_matriz(f"{ruta_carpeta}/MatrizB{i}.json", f"MatrizB{i}")

    # Creación de una matriz vacía para almacenar el resultado de la multiplicación
    matrizResultado = [[0.0 for _ in range(len(matrizA[0]))] for _ in range(len(matrizA))]

    # Medición del tiempo de ejecución del algoritmo IV4ParallelBlock
    tiempo_inicio = time.time()
    matrizR =  IV4parallel_block(matrizA, matrizB, matrizResultado, len(matrizA) // 2)
    tiempo_finalizacion = time.time() - tiempo_inicio

    # Almacenamiento del tiempo de ejecución en un archivo JSON específico para Python
    almacenar_tiempo_ejecucion_json(
        f"{ruta_carpeta}/TiempoEjecucionIV4ParallelBlockPy.json",
        f"A{i}XB{i} Py",
        tiempo_finalizacion
    )

    # Almacenamiento de la matriz resultante en un archivo JSON específico para Python
    almacenar_resultados_json(
        f"{ruta_carpeta}/ResultadoIV4ParallelBlockPy.json",
        f"Matriz A{i}xB{i} con método IV4ParallelBlock en Python",
        matrizR
    )
