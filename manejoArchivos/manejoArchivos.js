const fs = require("fs");
const { getSystemErrorMap } = require("util");

class container {
  constructor(fileName) {
    this.fileName = fileName;
  }

  //SAVE
  async fileSave(file) {
    try {
      //SE MUESTRA EN PANTALLA EL PRODUCTO A AGREGAR
      console.log("Producto a agregar:", file);

      // SE INTENTA LEER EL ARCHIVO Y SE GUARDA EN UNA VARIABLE
      const existingInfo = JSON.parse(
        await fs.promises.readFile(this.fileName, "utf-8")
      );
      console.log("Archivo:", existingInfo);

      //SI EL ARCHIVO EXISTE, SE LEE EL ULTIMO ID Y SE LE AGREGA UN NUMERO MAS AL SIGUIENTE ID
      file.id = existingInfo[existingInfo.length - 1].id + 1;

      //SE AGREGA EL NUEVO PRODUCTO AL ARRAY DE ARCHIVOS
      existingInfo.push(file);

      //SE SOBREESCRIBE EL ARCHIVO CON EL NUEVO ARCHIVO COMPLETO
      await fs.promises.writeFile(this.fileName, JSON.stringify(existingInfo));
      console.log("Se agrego con exito el nuevo producto!");

      //PEDIDO POR EL EJERCICIO, DEVUELVE EL ID DEL NUEVO PRODUCTO
      console.log("El ID del nuevo producto es: " + file.id);
    } catch (err) {
      //SE LEE EL ERROR
      console.log("hubo un error:", err);

      //SI EL ERROR ES QUE EL ARCHIVO NO EXISTE, ENTONCES CREA EL ARCHIVO NUEVO EMPEZANDO CON EL ID DE 1
      if (err.errno === -4058) {
        file.id = 1;
        await fs.promises.appendFile(this.fileName, JSON.stringify([file]));
        console.log("Archivo Creado!");
      }
    }
  }

  //GET BY ID
  async getByID(selectedProductId) {
    try {
      //SE INTENTA LEER EL ARCHIVO Y GUARDARLO EN UNA VARIABLE
      const existingInfo = JSON.parse(
        await fs.promises.readFile(this.fileName, "utf-8")
      );

      //SE BUSCA DENTRO DEL ARCHVIO EL PRODUCTO CON EL ID SELECCIONADO
      const selectedProduct = existingInfo.find(
        (product) => product.id === selectedProductId
      );

      //SI EL ARCHIVO NO EXISTE, DEVUELVE UN MENSAJE
      if (selectedProduct === undefined) {
        console.log("El producto seleccionado no existe");
      } else {
        //SI EL ARCHVIO EXISTE, LO DEVUELVE
        console.log("Producto seleccionado por ID:", existingInfo);
      }
    } catch (err) {
      console.log("hubo un error:", err);
      if (err.errno === -4058) {
        console.log("El archivo seleccionado no existe");
      }
    }
  }

  //GET ALL
  async getAll() {
    try {
      //SE INTENTA LEER EL ARCHIVO Y GUARDARLO EN UNA VARIABLE
      const existingInfo = JSON.parse(
        await fs.promises.readFile(this.fileName, "utf-8")
      );
      //SE MUESTRA LA INFO DEL ARCHIVO EN CONSOLA
      console.log("Info del archivo seleccionado:", existingInfo);
    } catch (err) {
      console.log("hubo un error:", err);
      if (err.errno === -4058) {
        console.log("El archivo seleccionado no existe");
      }
    }
  }

  //DELETE BY ID
  async deleteById(selectedProductId) {
    try {
      //SE INTENTA LEER EL ARCHIVO Y GUARDARLO EN UNA VARIABLE
      const existingInfo = JSON.parse(
        await fs.promises.readFile(this.fileName, "utf-8")
      );
      //SE BUSCA EL INDICE DEL PRODUCTO A BORRAR
      const indexToDelete = existingInfo.findIndex(
        (producto) => producto.id === selectedProductId
      );
      //SI EL PRODUCTO NO EXISTE, SE DEVUELVE UN MENSAJE
      if (indexToDelete === -1) {
        console.log("El producto seleccionado no existe");
      } else {
        //SI EL PRODUCTO EXISTE, SE MUESTRA EL PRODUCTO EN PANTALLA Y SE REMUEVE
        console.log("Producto a remover:", existingInfo[indexToDelete]);
        existingInfo.splice(indexToDelete, 1);
        console.log("El producto seleccionado fue removido con exito!");
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(existingInfo)
        );
      }
    } catch (err) {
      console.log("hubo un error:", err);
      if (err.errno === -4058) {
        console.log("El archivo seleccionado no existe");
      }
    }
  }

  //DELETE ALL
  async deleteAll() {
    try {
      //SE INTENTA BORRAR EL ARCHIVO
      await fs.promises.unlink(this.fileName);
      console.log("El archivo fue borrado con exito!");
    } catch (err) {
      console.log("hubo un error:", err);
      if (err.errno === -4058) {
        console.log("El archivo seleccionado no existe");
      }
    }
  }
}

//SE EXPORTA PARA SER USADO EN TEST
module.exports = container;
