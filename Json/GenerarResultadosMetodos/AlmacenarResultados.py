import time
from threading import Lock
import json
import os
import numpy as np


ejecutando = False 
bloqueo = Lock()

def almacenar_resultados_json(nombre_archivo, cadena_identificador, valor_identificador):
  valor_identificador=np.array(valor_identificador)
  valor_identificador=np.array2string(valor_identificador, separator=', ', threshold=np.inf).replace('\n','')
  global ejecutando

  bloqueo.acquire()
  if ejecutando:
    bloqueo.release()
    while ejecutando:
      time.sleep(0.1)
    bloqueo.acquire()
  
  ejecutando = True

  path = 'C:/MultiplicacionMatricesGrandesProyectoFinal/'+nombre_archivo
  if os.path.exists(path):
        # Read JSON file
     with open(nombre_archivo, encoding='utf-8') as fp:
       data = json.load(fp)
  
       #Si se repite cadenaIdentificador, se sobreescribe en el json el valorIdentificador con el nuevo
       data[cadena_identificador]=valor_identificador
       #print(data)
     with open(nombre_archivo, 'w', encoding='utf-8') as outfile:
      
       json.dump(data, outfile,ensure_ascii=False)
  else:     
    # Serializing json
    
    data={cadena_identificador:valor_identificador}
     
    # Writing to nombreArchivo.json
    with open(nombre_archivo, "w", encoding='utf-8') as outfile:
       # outfile.write(json_object)
         outfile.write(json.dumps(data, indent=4, ensure_ascii=False))
  ejecutando = False
  bloqueo.release()
    
    
    
# Create a function to be called while serializing JSON
def json_serialize(obj):
    if isinstance(obj, np.ndarray):
        return obj.tolist()
    return obj