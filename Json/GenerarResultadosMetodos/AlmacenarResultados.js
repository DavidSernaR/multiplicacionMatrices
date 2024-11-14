import * as fs from "fs";


//La función es asíncrona ya que no se puede llamar al método si una instancia anterior no ha finalizado, daría errores en la persistencia del archivo
let ejecutando = false;

export async function almacenar_resultados_json(nombreArchivo, cadenaIdentificador, valorIdentificador) {

  if (ejecutando) {
    await new Promise(resolve => {
      const intervalo = setInterval(() => {
        if (!ejecutando) {
          clearInterval(intervalo);
          resolve();
        }
      }, 100);
    });
  }

  ejecutando = true;

  try {
    if (fs.existsSync(nombreArchivo)) {
      let userData = fs.readFileSync(nombreArchivo);
      try {
        userData = JSON.parse(userData);
      } catch (ignored) {
        userData = {}
      }
      userData[cadenaIdentificador] = valorIdentificador;
      fs.writeFileSync(nombreArchivo, JSON.stringify(userData));
    } else {
      let userData = { [cadenaIdentificador]: valorIdentificador };
      await fs.promises.writeFile(nombreArchivo, JSON.stringify(userData));

    }
  } catch (error) {
    throw error;
  } finally {
    ejecutando = false;
  }

}
