const container = require("./manejoArchivos");

const productos = new container("./productos.txt");

//TODOS LOS METODOS PARA PROBAR LA APP CON ALGUNOS ARCHIVOS YA INCLUIDOS
// EN PRODUCTOS.TXT.

// EN CASO DE SER NECESARIO SE PUEDEN MODIFICAR LOS IDS PARA DIFERENTES RESULTADOS

productos.fileSave({
  title: "remera",
  price: "1500",
  thumbnail: "https://cf.shopee.com.ar/file/b0d527aac65cd97a9358adc6e2f4d620",
});

// productos.getByID(4);

// productos.getAll();

// productos.deleteById(3);

// productos.deleteAll();
