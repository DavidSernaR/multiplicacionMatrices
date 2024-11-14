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
def strassen_winograd_step(matrizA, matrizB, matrizResultado, cantidadFilasMatrices, m):

    nuevoTamanio = 0
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
        
        matrizA1 = []
        matrizA2 = []
        matrizB1 = []
        matrizB2 = []
        
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
        
        auxiliar8 = []
        auxiliar9 = []

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
            
            matrizA1.append([0] * nuevoTamanio)
            matrizA2.append([0] * nuevoTamanio)
            matrizB1.append([0] * nuevoTamanio)
            matrizB2.append([0] * nuevoTamanio)
            
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
            
            auxiliar8.append([0] * nuevoTamanio)
            auxiliar9.append([0] * nuevoTamanio)
            
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
        
        # computing the seven aux. variables
        matrizA1 = [[matrizA11[i][j] - matrizA21[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        matrizA2 = [[matrizA22[i][j] - matrizA1[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        
        matrizB1 = [[matrizB22[i][j] - matrizB12[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        matrizB2 = [[matrizB1[i][j] + matrizB11[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]

        auxiliar1 = strassen_winograd_step(matrizA11, matrizB11, auxiliar1, nuevoTamanio, m)
        auxiliar2 = strassen_winograd_step(matrizA12, matrizB21, auxiliar2, nuevoTamanio, m)  
        auxiliar3 = strassen_winograd_step(matrizA2, matrizB2, auxiliar3, nuevoTamanio, m)

        ayudante1 = [[matrizA21[i][j] + matrizA22[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        ayudante2 = [[matrizB12[i][j] - matrizB11[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]

        auxiliar4 = strassen_winograd_step(ayudante1, ayudante2, auxiliar4, nuevoTamanio, m)
       
        auxiliar5 = strassen_winograd_step(matrizA1, matrizB1, auxiliar5, nuevoTamanio, m)
        
        ayudante1 = [[matrizA12[i][j] - matrizA2[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        
        auxiliar6 = strassen_winograd_step(ayudante1, matrizB22, auxiliar6, nuevoTamanio, m)
        
        ayudante1 = [[matrizB21[i][j] - matrizB2[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        
        auxiliar7 = strassen_winograd_step(matrizA22, ayudante1, auxiliar7, nuevoTamanio, m)
        
        auxiliar8 = [[auxiliar1[i][j] + auxiliar3[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        auxiliar9 = [[auxiliar8[i][j] + auxiliar4[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]


       # Calcular partes de la matriz resultado
       
        matrizResultadoParte11 = [[auxiliar1[i][j] + auxiliar2[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        matrizResultadoParte12 = [[auxiliar9[i][j] + auxiliar6[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        ayudante1 = [[auxiliar8[i][j] + auxiliar5[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        matrizResultadoParte21 = [[ayudante1[i][j] + auxiliar7[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]
        matrizResultadoParte22 = [[auxiliar9[i][j] + auxiliar5[i][j] for j in range(nuevoTamanio)] for i in range(nuevoTamanio)]


       

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
        matrizResultado = naiv_standard(matrizA, matrizB, matrizResultado, len(matrizA), len(matrizB), len(matrizResultado))
    
    return matrizResultado  #Retorna matriz resultado