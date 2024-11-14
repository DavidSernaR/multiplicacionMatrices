import * as fs from "fs";

export function almacenar_tiempo_ejecucion_json(nombreArchivo, cadenaIdentificador, valorIdentificador) {
    try {
        if (fs.existsSync(nombreArchivo)) {
            let userData = fs.readFileSync(nombreArchivo);
            //Para convertir el string del json a un arreglo con el que podamos trabajar en js
            try {
                userData = JSON.parse(userData);
            } catch (ignored) {
                userData = {}
            }

            //Para agregar una nueva línea el arreglo en el json ya existente, si cadenaIdentificador ya existe, actualiza su valor con el que se le pase en la ejecución del método
            userData[cadenaIdentificador] = valorIdentificador;


            //Sobreescribe nombreArchivo.json con el arreglo userData, el cual fue actualizado, nombreArchivo.json debe existir si no arroja un error
            fs.writeFileSync(nombreArchivo, JSON.stringify(userData), { encoding: 'utf8' });

        } else {
            let userData = {
                [cadenaIdentificador]: valorIdentificador
            }
            fs.writeFileSync(nombreArchivo, JSON.stringify(userData), { encoding: 'utf8' });
        }
    } catch (error) {
        console.log(error);
    }
}