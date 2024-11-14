'''
Algoritmo tomado del artículo http://paper.ijcsns.org/07_book/201202/20120212.pdf y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
'''

import numpy as np
from concurrent.futures import ThreadPoolExecutor, as_completed



"""
    Realiza la multiplicación de matrices por bloques de forma paralela utilizando hilos.

    Args:
        matrizA: La primera matriz a multiplicar.
        matrizB: La segunda matriz a multiplicar.
        matrizResultado: La matriz donde se almacenará el resultado.
        tamanioBloque: El tamaño de los bloques a utilizar.

    Returns:
        La matriz resultado con la multiplicación realizada.
    """

def III4_parallel_block(matrizA, matrizB, matrizResultado, tamanioBloque):
   
    tamanio = len(matrizResultado)
    
   
    
    def task(i1, j1, k1):
        """
        Función que realiza la multiplicación de un bloque de matrices.

        Args:
            i1: Índice de inicio en la dimensión i del bloque.
            j1: Índice de inicio en la dimensión j del bloque.
            k1: Índice de inicio en la dimensión k del bloque.

        Returns:
            El resultado de la multiplicación del bloque.
        """
        resultado = np.zeros_like(matrizResultado) # Inicializa una matriz de ceros del mismo tamaño que la matriz resultado
        # Bucles para recorrer los elementos dentro del bloque

        for i in range(i1, min(i1 + tamanioBloque, tamanio)):
            for j in range(j1, min(j1 + tamanioBloque, tamanio)):
                for k in range(k1, min(k1 + tamanioBloque, tamanio)):
                    resultado[i][j] += matrizA[i][k] * matrizB[k][j]  # Multiplica y acumula en la posición [i][j]
                    
        return resultado # Devuelve el resultado del bloque

    with ThreadPoolExecutor() as executor:
        futures = []
        # Bucles para generar las tareas de multiplicación de bloques
        for i1 in range(0, tamanio, tamanioBloque):
            for j1 in range(0, tamanio, tamanioBloque):
                for k1 in range(0, tamanio, tamanioBloque):
                    futures.append(executor.submit(task, i1, j1, k1))# Envía la tarea al executor y agrega el futuro a la lista
                    

    
    resultado = np.zeros_like(matrizResultado) # Inicializa una matriz de ceros del mismo tamaño que la matriz resultado

    # Procesar resultados de los hilos y almacenar en queueConcat
    for  future in as_completed(futures):
        resultado += future.result() # Suma los resultados de los bloques a la matriz resultado final
        
    return resultado # Devuelve la matriz resultado después de la multiplicación
