'''
Algoritmo implementado con la ayuda de inteligencia artificial


Integrantes del grupo:
Esteban Julián Ortega Tapie
Jhon Sebastián Zambrano Ariza
David Serna Restrepo
'''

import json
"""
    Carga una matriz desde un archivo JSON y la convierte en una matriz de números.
    
    Args:
        nombre_archivo (str): Nombre del archivo JSON que contiene la matriz.
        valor_llave (str): Nombre de la llave que contiene la matriz en el archivo JSON.
    
    Returns:
        list[list[int]]: La matriz convertida en una matriz de números.
    """
def cargar_matriz(nombre_archivo, valor_llave):
  
  # Abre el archivo JSON en modo de lectura y carga su contenido en un objeto Python

  with open(nombre_archivo, 'r') as archivo:
    variable = json.load(archivo)
  
  # Extrae la matriz del objeto usando el valor de la llave proporcionada

  matriz = variable[valor_llave]

  # Reemplazar [] por Array()
  #cadena = matriz.replace('[', 'Array(')
  #cadena = cadena.replace(']', ')')

  # Evalúa la cadena como código Python para obtener la matriz

  nueva_matriz = eval(matriz)
  # Convierte los elementos de la matriz en números enteros y crea una nueva matriz

  map1 = [list(map(int, subarray)) for subarray in nueva_matriz]

  return map1  #Retorna la matriz