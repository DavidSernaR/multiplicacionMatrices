
import json
import os 

def almacenar_tiempo_ejecucion_json(nombreArchivo,cadenaIdentificador,valorIdentificador):
    
    path = 'C:/MultiplicacionMatricesGrandesProyectoFinal/'+nombreArchivo
    if os.path.exists(path):
        # Read JSON file
     with open(nombreArchivo, encoding='utf-8') as fp:
       data = json.load(fp)
       
       #Si se repite cadenaIdentificador, se sobreescribe en el json el valorIdentificador con el nuevo
       data[cadenaIdentificador]=valorIdentificador
       #print(data)
     with open(nombreArchivo, 'w', encoding='utf-8') as outfile:
      json.dump(data, outfile,ensure_ascii=False)
    else:     
    # Serializing json
     data={cadenaIdentificador:valorIdentificador}
    
    # Writing to nombreArchivo.json
     with open(nombreArchivo, "w",encoding='utf-8') as outfile:
       # outfile.write(json_object)
         outfile.write(json.dumps(data, indent=4, ensure_ascii=False))