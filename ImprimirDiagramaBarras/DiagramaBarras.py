'''
Algoritmo implementado con la ayuda de inteligencia artificial


Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
'''

import os
import matplotlib.pyplot as plt
import json
import numpy as np

def obtener_mayor_tamano_carpeta():
    carpetas = [f for f in os.listdir('Json/PersistenciaDatos') if f.startswith('Matrices')]
    return sorted(carpetas, key=lambda x: int(x.replace("Matrices", "").replace("x", "")))[-1]

# Determinar la carpeta de mayor tamaño
carpeta_grande = obtener_mayor_tamano_carpeta()

# Lista de métodos para recorrer y cargar tiempos de ejecución
matrix_methods = [
    'NaivOnArray', 'NaivLoopUnrollingTwo', 'NaivLoopUnrollingFour', 'WinogradOriginal', 'WinogradScaled',
    'StrassenNaiv', 'StrassenWinograd', 'III3SequentialBlock', 'III4ParallelBlock', 'III5EnhancedParallelBlock',
    'IV3SequentialBlock', 'IV4ParallelBlock', 'IV5EnhancedParallelBlock', 'V3SequentialBlock', 'V4ParallelBlock'
]

# Diccionarios para almacenar los tiempos de ejecución más altos por lenguaje
proyectarjs, proyectarpy = {}, {}

# Extraer tiempos de ejecución desde archivos separados por lenguaje
for method in matrix_methods:
    path_js = f"Json/PersistenciaDatos/{carpeta_grande}/TiempoEjecucion{method}Js.json"
    path_py = f"Json/PersistenciaDatos/{carpeta_grande}/TiempoEjecucion{method}Py.json"

    # Carga del tiempo de ejecución para JavaScript, si el archivo existe
    if os.path.exists(path_js):
        with open(path_js, 'r', encoding='utf-8') as f_js:
            data_js = json.load(f_js)
        # Obtener el tiempo máximo de ejecución en JavaScript
        proyectarjs[method] = max(data_js.values(), default=0)

    # Carga del tiempo de ejecución para Python, si el archivo existe
    if os.path.exists(path_py):
        with open(path_py, 'r', encoding='utf-8') as f_py:
            data_py = json.load(f_py)
        # Obtener el tiempo máximo de ejecución en Python
        proyectarpy[method] = max(data_py.values(), default=0)

# Configuración del gráfico
x_pos_py = np.arange(len(matrix_methods)) + 0.2
bar_width = 0.4
bar_colors = ['#8B0000', '#000080']

fig, ax = plt.subplots()
fig.canvas.manager.set_window_title('Tiempo de ejecución más alto por algoritmo')

# Creación de barras para tiempos de JavaScript y Python
ax.bar(matrix_methods, proyectarjs.values(), width=bar_width, label='JavaScript', color=bar_colors[0])
ax.bar(x_pos_py, proyectarpy.values(), width=bar_width, label='Python', color=bar_colors[1])

# Configuración de etiquetas y título del gráfico
ax.set_ylabel('Tiempo (en segundos)')
ax.set_title(f'Tiempo de ejecución para el tamaño de matriz {carpeta_grande}')
ax.set_xlabel('Algoritmo')
ax.legend(title='Lenguaje', loc='upper left')
plt.xticks(rotation=90)
plt.tight_layout()
plt.show()