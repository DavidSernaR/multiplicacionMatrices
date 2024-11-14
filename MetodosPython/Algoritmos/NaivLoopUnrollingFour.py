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
def naiv_loop_unrolling_four(matriz_a, matriz_b, matriz_resultado, cantidad_filas_matrices, cantidad_columnas_matrices, delimitador_maxima_iteraciones_fila_columna):
    # Verifica si la cantidad de iteraciones es divisible por 4

    if delimitador_maxima_iteraciones_fila_columna % 4 == 0:
        # Los va calculando de 4 en 4
        for i in range(cantidad_filas_matrices):
            for j in range(cantidad_columnas_matrices):
                aux = 0.0
                # Itera de 4 en 4 para calcular los productos de las matrices

                for k in range(0, delimitador_maxima_iteraciones_fila_columna, 4):
                  # Realiza las multiplicaciones de manera desenrollada

                    aux += matriz_a[i][k] * matriz_b[k][j] + matriz_a[i][k + 1] * matriz_b[k + 1][j] + matriz_a[i][k + 2] * matriz_b[k + 2][j] + matriz_a[i][k + 3] * matriz_b[k + 3][j]
                matriz_resultado[i][j] = aux #Se asigna aux en la posición [i][j]

    elif delimitador_maxima_iteraciones_fila_columna % 4 == 1:
        # Los va calculando de 4 en 4 y añade al final la posición en A y B que no se pudo calcular dentro del bucle de K
        delimitador_maxima_iteraciones_fila_columna -= 1
        for i in range(cantidad_filas_matrices):
            for j in range(cantidad_columnas_matrices):
                aux = 0.0
                for k in range(0, delimitador_maxima_iteraciones_fila_columna, 4):
                    aux += matriz_a[i][k] * matriz_b[k][j] + matriz_a[i][k + 1] * matriz_b[k + 1][j] + matriz_a[i][k + 2] * matriz_b[k + 2][j] + matriz_a[i][k + 3] * matriz_b[k + 3][j]
                
                # Calcula los productos adicionales de los elementos que no se pudieron incluir en el bucle principal

                matriz_resultado[i][j] = aux + matriz_a[i][delimitador_maxima_iteraciones_fila_columna] * matriz_b[delimitador_maxima_iteraciones_fila_columna][j]

    elif delimitador_maxima_iteraciones_fila_columna % 4 == 2:
        # Los va calculando de 4 en 4 y añade al final las dos posiciones en A y B que no se pudo calcular dentro del bucle de K
        delimitador_maxima_iteraciones_fila_columna1 = delimitador_maxima_iteraciones_fila_columna - 1
        delimitador_maxima_iteraciones_fila_columna -= 2
        for i in range(cantidad_filas_matrices):
            for j in range(cantidad_columnas_matrices):
                aux = 0.0
                for k in range(0, delimitador_maxima_iteraciones_fila_columna, 4):
                    aux += matriz_a[i][k] * matriz_b[k][j] + matriz_a[i][k + 1] * matriz_b[k + 1][j] + matriz_a[i][k + 2] * matriz_b[k + 2][j] + matriz_a[i][k + 3] * matriz_b[k + 3][j]
            
                # Calcula los productos adicionales de los elementos que no se pudieron incluir en el bucle principal

                matriz_resultado[i][j] = aux + matriz_a[i][delimitador_maxima_iteraciones_fila_columna] * matriz_b[delimitador_maxima_iteraciones_fila_columna][j] + matriz_a[i][delimitador_maxima_iteraciones_fila_columna1] * matriz_b[delimitador_maxima_iteraciones_fila_columna1][j]

    else:
        # Los va calculando de 4 en 4 y añade al final las tres posiciones en A y B que no se pudo calcular dentro del bucle de K
        delimitador_maxima_iteraciones_fila_columna -= 3
        delimitador_maxima_iteraciones_fila_columna1 = delimitador_maxima_iteraciones_fila_columna + 1
        delimitador_maxima_iteraciones_fila_columna2 = delimitador_maxima_iteraciones_fila_columna + 2
        for i in range(cantidad_filas_matrices):
            for j in range(cantidad_columnas_matrices):
                aux = 0.0
                for k in range(0, delimitador_maxima_iteraciones_fila_columna, 4):
                    aux += matriz_a[i][k] * matriz_b[k][j] + matriz_a[i][k + 1] * matriz_b[k + 1][j] + matriz_a[i][k + 2] * matriz_b[k + 2][j] + matriz_a[i][k + 3] * matriz_b[k + 3][j]
                # Calcula los productos adicionales de los elementos que no se pudieron incluir en el bucle principal

                matriz_resultado[i][j] = aux + matriz_a[i][delimitador_maxima_iteraciones_fila_columna] * matriz_b[delimitador_maxima_iteraciones_fila_columna][j] + matriz_a[i][delimitador_maxima_iteraciones_fila_columna2] * matriz_b[delimitador_maxima_iteraciones_fila_columna2][j] + matriz_a[i][delimitador_maxima_iteraciones_fila_columna1] * matriz_b[delimitador_maxima_iteraciones_fila_columna1][j]

    return matriz_resultado   #Retorna la matriz resultado