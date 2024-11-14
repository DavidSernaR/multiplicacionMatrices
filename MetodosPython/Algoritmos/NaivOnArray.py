'''
Algoritmo tomado y adaptado del artículo https://arxiv.org/abs/1106.1347

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
def naiv_on_array(matrizA,matrizB,matrizResultado,cantidadFilasMatrices,cantidadColumnasMatrices,cantidadMaximaIteracionesFilaColumna):

    for i in range(cantidadFilasMatrices):
     for j in range(cantidadColumnasMatrices):
       #Inicializamos el elemento [i][j] de matrizResultado con un cero
        matrizResultado[i][j] = 0.0
        for k in range(cantidadMaximaIteracionesFilaColumna):
            # Recorremos cada posición de la matriz [i][j] y asignamos su valor como la suma de la 
            # multiplicación del elemento en la matrizA[i][k] con el de la matrizB[k][j]
            matrizResultado[i][j] += matrizA[i][k]*matrizB[k][j]         
    return matrizResultado #Retorna la matriz resultado