'''
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo

'''

from math import floor,log
import sys
sys.path.insert(0,'C:/Users/Crist/OneDrive/Escritorio/MultiplicacionMatricesGrandesProyecto/MetodosPython/Algoritmos')
"""
    Realiza la multiplicación de matrices utilizando el algoritmo de Strassen Naiv.

    Parámetros:
        matrizA (number[][]]): La primera matriz de entrada.
        matrizB (number[][]]): La segunda matriz de entrada.
        matrizResultado (number[][]]): La matriz donde se almacenará el resultado de la multiplicación.
        cantidadFilasMatrices (int): La cantidad de filas en las matrices de entrada y salida.
        cantidadColumnasMatrices (int): La cantidad de columnas en las matrices de entrada y salida.
        delimitadorMaximaIteracionesFilaColumna (int): El delimitador de la cantidad máxima de iteraciones para cada fila y columna.

    Retorna:
        (number[][]]): La matriz resultado de la multiplicación.
    """
from StrassenNaivStep import strassen_naiv_step


def strassen_naiv(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadColumnasMatrices, delimitadorMaximaIteracionesFilaColumna):
    # Determina el tamaño máximo necesario para las matrices de entrada

    tamanioMaximo = max(cantidadFilasMatrices, delimitadorMaximaIteracionesFilaColumna)
    tamanioMaximo = max(tamanioMaximo, cantidadFilasMatrices)
    
    # Si el tamaño máximo es menor que 16, se ajusta a 16 para garantizar la computación de K

    if tamanioMaximo < 16:
        tamanioMaximo = 16 # Si no, no es posible computar K
    
    # Calcula los parámetros para la adaptación de Strassen

    k = floor(log(tamanioMaximo)/log(2)) - 4   #Con un número igual o menor a 16 en tamaniomaximo, da 0, en caso contrario, da 1 o superior
    m = floor(tamanioMaximo * pow(2,-k)) + 1   #Con un k igual a 1 o superior, daría de una unidad mayor a tamaniomaximo para arriba
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
    
    # Realiza la multiplicación de matrices utilizando el método Strassen

    matrizResultadoAuxiliar = strassen_naiv_step(nuevaMatrizA, nuevaMatrizB, matrizResultadoAuxiliar, nuevoTamanio, m)
    
    # Copia los resultados de la matriz auxiliar a la matriz resultado final

    for i in range(cantidadFilasMatrices):
        for j in range(cantidadColumnasMatrices):
            matrizResultado[i][j] = matrizResultadoAuxiliar[i][j]
            
    return matrizResultado #Retorna matriz resultado