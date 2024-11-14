'''
Algoritmo tomado del artículo http://paper.ijcsns.org/07_book/201202/20120212.pdf y adaptado con la ayuda de inteligencia artificial

Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
'''
def V3_sequential_block(matrizA, matrizB, matrizResultado, tamanioBloque):
    """
    Realiza la multiplicación de matrices por bloques de forma secuencial.

    Args:
        matrizA: La primera matriz a multiplicar.
        matrizB: La segunda matriz a multiplicar.
        matrizResultado: La matriz donde se almacenará el resultado.
        tamanioBloque: El tamaño de los bloques a utilizar.

    Returns:
        La matriz resultado con la multiplicación realizada.
    """

    size = len(matrizResultado)  # Suponiendo que todas las matrices tienen el mismo tamaño

    for i1 in range(0, size, tamanioBloque):
        for j1 in range(0, size, tamanioBloque):
            for k1 in range(0, size, tamanioBloque):
                for i in range(i1, min(i1 + tamanioBloque, size)):
                    for j in range(j1, min(j1 + tamanioBloque, size)):
                        for k in range(k1, min(k1 + tamanioBloque, size)):
                            matrizResultado[k][i] += matrizA[k][j] * matrizB[j][i] # Multiplicación y acumula en la posición [i][j]

    return matrizResultado # Retorna matriz resultado
