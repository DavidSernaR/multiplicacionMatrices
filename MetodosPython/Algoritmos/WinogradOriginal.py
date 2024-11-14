'''
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo

'''
"""
    Algoritmo de multiplicación de matrices basado en el método de Winograd original.

    Args:
    - matrizA (number[][]): Matriz de entrada A.
    - matrizB (number[][]): Matriz de entrada B.
    - matrizResultado (number[][]): Matriz donde se almacenará el resultado de la multiplicación.
    - cantidadFilasMatrices (int): Cantidad de filas de las matrices de entrada.
    - cantidadColumnasMatrices (int): Cantidad de columnas de las matrices de entrada.
    - delimitadorMaximaIteracionesFilaColumna (int): Delimitador máximo para las iteraciones de fila y columna.

    Returns:
    - (number[][]): Matriz resultado de la multiplicación de A y B.
    """
def winograd_original(matrizA, matrizB, MatrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna):
  aux = 0
  #Calculando epsilon y gamma

  epsilon = delimitadorMaximaIteracionesFilaColumna % 2
  gamma = delimitadorMaximaIteracionesFilaColumna - epsilon
  
  y = []
  z = []
  # Calcula las sumas auxiliares para la matriz A

  for i in range(cantidadColumnasMatrices):
    aux = 0.0
    for j in range(0, gamma, 2):
      aux += matrizA[i][j] * matrizA[i][j+1]
    y.append(aux)
    
  # Calcula las sumas auxiliares para la matriz B

  for i in range(cantidadFilasMatrices):
    aux = 0.0
    for j in range(0, gamma, 2):
      aux += matrizB[j][i] * matrizB[j+1][i]
    z.append(aux)

  if epsilon == 1:
        # P es impar, falta el valor matrizA[i][delimitadorMaximaIteracionesFilaColumna-1]*matrizB[delimitadorMaximaIteracionesFilaColumna-1][k]
        # en todas las sumas auxiliares.
    delimitadorMaximaIteracionesFilaColumna = delimitadorMaximaIteracionesFilaColumna-1
    
    for i in range(cantidadColumnasMatrices):
      for k in range(cantidadFilasMatrices):
        aux = 0.0
        for j in range(0, gamma, 2):
          aux += (matrizA[i][j] + matrizB[j+1][k]) * (matrizA[i][j+1] + matrizB[j][k])
        MatrizResultado[i][k] = aux - y[i] - z[k] + matrizA[i][delimitadorMaximaIteracionesFilaColumna]*matrizB[delimitadorMaximaIteracionesFilaColumna][k]

  else:
    # P es par, el resultado se puede calcular con las sumas auxiliares.
    for i in range(cantidadColumnasMatrices):
      for k in range(cantidadFilasMatrices):
        aux = 0.0
        for j in range(0, gamma, 2):
          aux += (matrizA[i][j] + matrizB[j+1][k]) * (matrizA[i][j+1] + matrizB[j][k])
        MatrizResultado[i][k] = aux - y[i] - z[k]
        
  return MatrizResultado  #Retorna la matriz resultado