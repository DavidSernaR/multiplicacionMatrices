'''
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo

'''
"""

    Parámetros:
        matrizA : La primera matriz de entrada.
        matrizB : La segunda matriz de entrada.
        matrizResultado : La matriz donde se almacenará el resultado de la multiplicación.
        cantidadFilasMatrices (int): La cantidad de filas en las matrices de entrada y salida.
        cantidadColumnasMatrices (int): La cantidad de columnas en las matrices de entrada y salida.
        cantidadMaximaIteracionesFilaColumna (int): La cantidad máxima de iteraciones permitida para cada fila y columna.

    Retorna:
        matriz: La matriz resultado de la multiplicación.
    """
#El valor de delimitadorMaximaIteracionesFilaColumna debe ser igual al tamaño de las matrices o un valor por debajo
def naiv_loop_unrolling_two(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna):
    if delimitadorMaximaIteracionesFilaColumna % 2 == 0:
        # Caso delimitadorMaximaIteracionesFilaColumna par
        for i in range(cantidadFilasMatrices):
            for j in range(cantidadColumnasMatrices):
                aux = 0.0
                for k in range(0, delimitadorMaximaIteracionesFilaColumna, 2):
                    aux += matrizA[i][k] * matrizB[k][j] + matrizA[i][k + 1] * matrizB[k + 1][j]
                matrizResultado[i][j] = aux #Se asigna aux en la posición [i][j]
    else:
        # Caso delimitadorMaximaIteracionesFilaColumna impar
        delimitadorMaximaIteracionesFilaColumna = delimitadorMaximaIteracionesFilaColumna - 1
        for i in range(cantidadFilasMatrices):
            for j in range(cantidadColumnasMatrices):
                aux = 0.0
                for k in range(0, delimitadorMaximaIteracionesFilaColumna, 2):
                    aux += matrizA[i][k] * matrizB[k][j] + matrizA[i][k + 1] * matrizB[k + 1][j]
                # Calcula los productos adicionales de los elementos que no se pudieron incluir en el bucle principal

                matrizResultado[i][j] = aux + matrizA[i][delimitadorMaximaIteracionesFilaColumna] * matrizB[delimitadorMaximaIteracionesFilaColumna][j]
    
    return matrizResultado  #Retorna la matriz resultado