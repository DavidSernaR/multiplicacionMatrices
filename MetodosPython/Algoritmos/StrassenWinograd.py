'''
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo

'''
"""

    Parámetros:
    - matrizA: Matriz de entrada A.
    - matrizB: Matriz de entrada B.
    - matrizResultado: Matriz donde se almacenará el resultado de la multiplicación.
    - cantidadFilasMatrices: Número de filas en las matrices de entrada.
    - cantidadColumnasMatrices: Número de columnas en las matrices de entrada.
    - delimitadorMaximaIteracionesFilaColumna: Límite máximo de iteraciones para filas y columnas.

    Retorna:
    - matrizResultado: Matriz resultante de la multiplicación.
    """
from math import floor,log
import sys
sys.path.insert(0,'C:/Users/Crist/OneDrive/Escritorio/MultiplicacionMatricesGrandesProyecto/MetodosPython/Algoritmos')
from StrassenWinogradStep import strassen_winograd_step


def strassen_winograd(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna):
    # Calcula el tamaño máximo necesario para las matrices
    tamanioMaximo = max(cantidadFilasMatrices, delimitadorMaximaIteracionesFilaColumna)
    tamanioMaximo = max(tamanioMaximo, cantidadFilasMatrices)
    
    if tamanioMaximo < 16:
        tamanioMaximo = 16 # Si no, no es posible computar K
    
    # Calcula k y m para el algoritmo de Strassen-Winograd
    k = floor(log(tamanioMaximo)/log(2)) - 4
    m = floor(tamanioMaximo * pow(2,-k)) + 1
    nuevoTamanio = m * pow(2,k)
    
    nuevaMatrizA = []
    nuevaMatrizB = [] 
    matrizResultadoAuxiliar = []
    
    # Asignar memoria e inicializar Inicializar cada elemento de las nuevas matrices A y B con ceros
   

    for i in range(nuevoTamanio):
         nuevaMatrizA.append([0 for i in range(nuevoTamanio)] )
         nuevaMatrizB.append([0 for i in range(nuevoTamanio)] )
         matrizResultadoAuxiliar.append([0 for i in range(nuevoTamanio)] )
 
        
    
            
    # Asignamos en cada posición i,j de las nuevas matrices A y B los valores que están en las matrices A y B respectivamente
    for i in range(cantidadFilasMatrices):
        for j in range(delimitadorMaximaIteracionesFilaColumna):
            nuevaMatrizA[i][j] = matrizA[i][j]
            
    for i in range(delimitadorMaximaIteracionesFilaColumna):
        for j in range(cantidadColumnasMatrices):
            nuevaMatrizB[i][j] = matrizB[i][j]
            
    matrizResultadoAuxiliar = strassen_winograd_step(nuevaMatrizA, nuevaMatrizB, matrizResultadoAuxiliar, nuevoTamanio, m)
    
    for i in range(cantidadFilasMatrices):
        for j in range(cantidadColumnasMatrices):
            matrizResultado[i][j] = matrizResultadoAuxiliar[i][j]
            
    return matrizResultado