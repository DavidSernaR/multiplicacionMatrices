'''
Algoritmo tomado del artículo https://arxiv.org/abs/1106.1347 y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo

'''

import sys
sys.path.insert(0,'C:/Users/Crist/OneDrive/Escritorio/MultiplicacionMatricesGrandesProyecto/MetodosPython/Algoritmos')
from NaivStandard import naiv_standard
"""

    Parámetros:
        matrizA (number[][]): La primera matriz de entrada.
        matrizB (number[][]): La segunda matriz de entrada.
        matrizResultado (number[][]): La matriz donde se almacenará el resultado de la multiplicación.
        cantidadFilasMatrices (int): La cantidad de filas en las matrices de entrada.
        m (int): Un parámetro utilizado en el algoritmo.

    Retorna:
       (number[][]): La matriz resultado de la multiplicación.
    """
def strassen_naiv_step(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, m):

    nuevoTamanio = 0
    # Verifica si la cantidad de filas de la matriz es par y mayor que m

    if (cantidadFilasMatrices % 2 == 0) and (cantidadFilasMatrices > m):
        nuevoTamanio = cantidadFilasMatrices // 2
        
        matrizA11 = []
        matrizA12 = []
        matrizA21 = []
        matrizA22 = []
        
        matrizB11 = []
        matrizB12 = [] 
        matrizB21 = []
        matrizB22 = []
        
        matrizResultadoParte11 = []
        matrizResultadoParte12 = []
        matrizResultadoParte21 = []
        matrizResultadoParte22 = []
        
        ayudante1 = []
        ayudante2 = []
        
        auxiliar1 = []
        auxiliar2 = []
        auxiliar3 = []
        auxiliar4 = []
        auxiliar5 = []
        auxiliar6 = []
        auxiliar7 = []

        # Asignar memoria para cada fila
        for i in range(nuevoTamanio):
            matrizA11.append([0] * nuevoTamanio)
            matrizA12.append([0] * nuevoTamanio)
            matrizA21.append([0] * nuevoTamanio)
            matrizA22.append([0] * nuevoTamanio)
            
            matrizB11.append([0] * nuevoTamanio)
            matrizB12.append([0] * nuevoTamanio)
            matrizB21.append([0] * nuevoTamanio)
            matrizB22.append([0] * nuevoTamanio)
            
            matrizResultadoParte11.append([0] * nuevoTamanio)
            matrizResultadoParte12.append([0] * nuevoTamanio)
            matrizResultadoParte21.append([0] * nuevoTamanio)
            matrizResultadoParte22.append([0] * nuevoTamanio)
            
            ayudante1.append([0] * nuevoTamanio)
            ayudante2.append([0] * nuevoTamanio)
            
            auxiliar1.append([0] * nuevoTamanio)
            auxiliar2.append([0] * nuevoTamanio)
            auxiliar3.append([0] * nuevoTamanio)
            auxiliar4.append([0] * nuevoTamanio)
            auxiliar5.append([0] * nuevoTamanio)
            auxiliar6.append([0] * nuevoTamanio)
            auxiliar7.append([0] * nuevoTamanio)
            
        # Llenamos las matrices
        for i in range(nuevoTamanio):
            for j in range(nuevoTamanio):
                matrizA11[i][j] = matrizA[i][j]
                matrizA12[i][j] = matrizA[i][nuevoTamanio + j]
                matrizA21[i][j] = matrizA[nuevoTamanio + i][j] 
                matrizA22[i][j] = matrizA[nuevoTamanio + i][nuevoTamanio + j]

                matrizB11[i][j] = matrizB[i][j]
                matrizB12[i][j] = matrizB[i][nuevoTamanio + j]
                matrizB21[i][j] = matrizB[nuevoTamanio + i][j]
                matrizB22[i][j] = matrizB[nuevoTamanio + i][nuevoTamanio + j]
        
        
        
       # Computando las siete variables auxiliares
        ayudante1 = [[matrizA11[i][j] + matrizA22[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        ayudante2 = [[matrizB11[i][j] + matrizB22[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        auxiliar1 = strassen_naiv_step(ayudante1, ayudante2, auxiliar1, nuevoTamanio, m)


        ayudante1 = [[matrizA21[i][j] + matrizA22[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        auxiliar2 = strassen_naiv_step(ayudante1, matrizB11, auxiliar2, nuevoTamanio, m)
        
        ayudante1 = [[matrizB12[i][j] - matrizB22[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        auxiliar3 = strassen_naiv_step(matrizA11, ayudante1, auxiliar3, nuevoTamanio, m)
        
        ayudante1 = [[matrizB21[i][j] - matrizB11[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        auxiliar4 = strassen_naiv_step(matrizA22, ayudante1, auxiliar4, nuevoTamanio, m)
        
        ayudante1 = [[matrizA11[i][j] + matrizA12[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        auxiliar5 = strassen_naiv_step(ayudante1, matrizB22, auxiliar5, nuevoTamanio, m)
        
        ayudante1 = [[matrizA21[i][j] - matrizA11[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        ayudante2 = [[matrizB11[i][j] + matrizB12[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        auxiliar6 = strassen_naiv_step(ayudante1, ayudante2, auxiliar6, nuevoTamanio, m)
        
        ayudante1 = [[matrizA12[i][j] - matrizA22[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        ayudante2 = [[matrizB21[i][j] + matrizB22[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        auxiliar7 = strassen_naiv_step(ayudante1, ayudante2, auxiliar7, nuevoTamanio, m)
        
        # Computando las cuatro partes del resultado
        matrizResultadoParte11 = [[auxiliar1[i][j] + auxiliar4[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        matrizResultadoParte11 = [[matrizResultadoParte11[i][j] - auxiliar5[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        matrizResultadoParte11 = [[matrizResultadoParte11[i][j] + auxiliar7[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]

        matrizResultadoParte12 = [[auxiliar3[i][j] + auxiliar5[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]

        matrizResultadoParte21 = [[auxiliar2[i][j] + auxiliar4[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]

        matrizResultadoParte22 = [[auxiliar1[i][j] + auxiliar3[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        matrizResultadoParte22 = [[matrizResultadoParte22[i][j] - auxiliar2[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        matrizResultadoParte22 = [[matrizResultadoParte22[i][j] + auxiliar6[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]


       
        
        # Almacenar resultados en la matriz resultado
        for i in range(nuevoTamanio):
            for j in range(nuevoTamanio):
                matrizResultado[i][j] = matrizResultadoParte11[i][j]
        
        for i in range(nuevoTamanio):
            for j in range(nuevoTamanio):
                matrizResultado[i][nuevoTamanio + j] = matrizResultadoParte12[i][j]
        
        for i in range(nuevoTamanio):
            for j in range(nuevoTamanio):
                matrizResultado[nuevoTamanio + i][j] = matrizResultadoParte21[i][j]
        
        for i in range(nuevoTamanio):
            for j in range(nuevoTamanio):
                matrizResultado[nuevoTamanio + i][nuevoTamanio + j] = matrizResultadoParte22[i][j]
        
    else:
        # Usar algoritmo naiv
       # matrizResultado = naiv_standard(matrizA, matrizB, matrizResultado, len(matrizA), len(matrizB), len(matrizResultado))
        matrizResultado = naiv_standard(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, cantidadFilasMatrices, cantidadFilasMatrices)
    
    return matrizResultado #Retornar la matriz resultado 