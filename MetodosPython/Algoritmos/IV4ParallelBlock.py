'''
Algoritmo tomado del artículo http://paper.ijcsns.org/07_book/201202/20120212.pdf y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
'''

import numpy as np
from concurrent.futures import ThreadPoolExecutor, as_completed

def IV4parallel_block(matrizA, matrizB, matrizResultado, tamanioBloque):
    """
    Realiza la multiplicación de matrices por bloques de forma paralela.

    Args:
        matrizA: La primera matriz a multiplicar.
        matrizB: La segunda matriz a multiplicar.
        matrizResultado: La matriz donde se almacenará el resultado.
        tamanioBloque: El tamaño de los bloques a utilizar.

    Returns:
        La matriz resultado con la multiplicación realizada.
    """
    tamanio = len(matrizResultado)

    def task(i1, j1, k1):
        """
        Función interna que realiza la multiplicación de matrices en un bloque específico.

        Args:
            i1: Índice de inicio de las filas en el bloque.
            j1: Índice de inicio de las columnas en el bloque.
            k1: Índice de inicio de las columnas en la segunda matriz en el bloque.

        Returns:
            La matriz resultado parcial del bloque.
        """
        resultado = np.zeros_like(matrizResultado)# Matriz resultado inicializada con ceros
         # Bucles para recorrer los elementos dentro del bloque
        for i in range(i1, min(i1 + tamanioBloque, tamanio)):
            for j in range(j1, min(j1 + tamanioBloque, tamanio)):
                for k in range(k1, min(k1 + tamanioBloque, tamanio)):
                    resultado[i] [k] += matrizA[i][j] * matrizB[j][k]   # Multiplicación y acumula en la posición [i][k]
        return resultado # Devuelve el resultado del bloque

    with ThreadPoolExecutor() as executor:
        futures = []
        # Bucle para dividir la multiplicación en bloques y ejecutar en paralelo

        for i1 in range(0, tamanio, tamanioBloque):
            for j1 in range(0, tamanio, tamanioBloque):
                for k1 in range(0, tamanio, tamanioBloque):
                    futures.append(executor.submit(task, i1, j1, k1)) # Envía la tarea al executor y agrega el futuro a la lista

        resultado = np.zeros_like(matrizResultado) # Matriz resultado inicializada con ceros
        for future in as_completed(futures):
            resultado += future.result() # Suma los resultados de los bloques a la matriz resultado final

    return resultado # Devuelve la matriz resultado después de la multiplicación