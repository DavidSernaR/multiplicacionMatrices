
'''
Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
'''

import os
import numpy as np
import sys
sys.path.insert(0, 'C:/MultiplicacionMatricesGrandesProyectoFinal/Json/GenerarResultadosMetodos')
from AlmacenarResultados import almacenar_resultados_json

# Guardar la matriz en la carpeta correspondiente
def guardar_matriz_en_carpeta(tamano, nombre_matriz, matriz):
    ruta_carpeta = f"Json/PersistenciaDatos/Matrices{tamano}x{tamano}"
    os.makedirs(ruta_carpeta, exist_ok=True)
    ruta_archivo = f"{ruta_carpeta}/{nombre_matriz}.json"
    almacenar_resultados_json(ruta_archivo, nombre_matriz, matriz)

# Generación de matrices de prueba
for i, tamano in enumerate([2**n for n in range(4, 12)], start=1):
    matrizA = np.random.randint(100000, 999999, size=(tamano, tamano))
    matrizB = np.random.randint(100000, 999999, size=(tamano, tamano))
    guardar_matriz_en_carpeta(tamano, f"MatrizA{i}", matrizA)
    guardar_matriz_en_carpeta(tamano, f"MatrizB{i}", matrizB)
