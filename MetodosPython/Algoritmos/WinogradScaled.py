
'''
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo

'''


import numpy
# Importa la función winograd_original del módulo WinogradOriginal

from WinogradOriginal import winograd_original

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

def winograd_scaled(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna):
    # Realiza una copia de las matrices de entrada

  copiaMatrizA = [fila[:] for fila in matrizA]
  
  copiaMatrizB = [fila[:] for fila in matrizB]

    # Calcula la norma infinito de las matrices de entrada

  a = norma_infinito(matrizA)
  b = norma_infinito(matrizB)
  
  lambda_ = int(0.5 + numpy.log(b/a)/numpy.log(4))

  copiaMatrizA = multiplicacion_con_escalar(matrizA, matrizResultado, 2**lambda_)
  copiaMatrizB = multiplicacion_con_escalar(matrizB, matrizResultado, 2**-lambda_)

  matrizResultado=winograd_original(copiaMatrizA, copiaMatrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna)
  return matrizResultado     # Retorna matriz resultado


def norma_infinito(matriz):

  norm = 0.0
    # Calcula la suma de los máximos valores absolutos de cada fila de la matriz y los suma

  aux = sum(max(abs(x) for x in fila) for fila in matriz)
    # Actualiza la norma al máximo entre la norma actual y aux

  norm = max(norm, aux)

  return norm       # Retorna la norma calculada


# Define una función para la multiplicación de matrices con escalares

def multiplicacion_con_escalar(matrizA, matrizResultado, escalar):
  # Multiplica cada elemento de la matrizA por el escalar y lo asigna a matrizResultado

  matrizResultado = [[x * escalar for x in fila] for fila in matrizA]

  return matrizResultado     # Retorna la matriz resultado
