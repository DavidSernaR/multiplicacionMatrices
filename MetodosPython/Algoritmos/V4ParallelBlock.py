'''
Algoritmo tomado del artículo http://paper.ijcsns.org/07_book/201202/20120212.pdf y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
'''
"""
    Multiplicación paralela de matrices utilizando bloque de tamaño variable (Versión 4).
    
    Args:
    - matrizA (numpy.ndarray): Matriz de entrada A.
    - matrizB (numpy.ndarray): Matriz de entrada B.
    - matrizResultado (numpy.ndarray): Matriz donde se almacenará el resultado de la multiplicación.
    - tamanioBloque (int): Tamaño del bloque para la división de las matrices.
    
    Returns:
    - numpy.ndarray: Matriz resultado de la multiplicación de A y B.
    """
import numpy as np
from concurrent.futures import ThreadPoolExecutor, as_completed

def V4parallel_block(matrizA, matrizB, matrizResultado, tamanioBloque):
    tamanio = len(matrizResultado)

    def task(i1, j1, k1):
        """
        Función para realizar la multiplicación de matrices en un bloque específico.
        
        Args:
        - i1 (int): Índice inicial de filas.
        - j1 (int): Índice inicial de columnas.
        - k1 (int): Índice inicial de la dimensión de bloque.
        
        Returns:
        - numpy.ndarray: Matriz resultado del bloque específico.
        """
        resultado = np.zeros_like(matrizResultado)# Matriz resultado inicializada con ceros
         # Bucles para recorrer los elementos dentro del bloque
        for i in range(i1, min(i1 + tamanioBloque, tamanio)):
            for j in range(j1, min(j1 + tamanioBloque, tamanio)):
                for k in range(k1, min(k1 + tamanioBloque, tamanio)):
                    resultado[k][i] += matrizA[k][j] * matrizB[j][i] # Multiplicación y acumula en la posición [k][i]
        return resultado # Devuelve el resultado del bloque

    with ThreadPoolExecutor() as executor:
        futures = []
         # Bucle para dividir la multiplicación en bloques y ejecutar en paralelo

        for i1 in range(0, tamanio, tamanioBloque):
            for j1 in range(0, tamanio, tamanioBloque):
                for k1 in range(0, tamanio, tamanioBloque):
                    futures.append(executor.submit(task, i1, j1, k1)) # Envía la tarea al executor y agrega el futuro a la lista

        resultado = np.zeros_like(matrizResultado)# Matriz resultado inicializada con ceros
        for future in as_completed(futures):
            resultado += future.result()# Suma los resultados de los bloques a la matriz resultado final

    return resultado # Devuelve la matriz resultado después de la multiplicación