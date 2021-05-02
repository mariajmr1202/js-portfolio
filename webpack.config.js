const path = require("path");

module.exports = {
  //Punto de entrada de la app
  entry: "./src/index.js",
  output: {
    //Lugar donde se va a guardar/preparar el proyecto
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    //Extensiones con la que trabajaremos en el proyecto: .js, react, etc
    extensions: [".js"],
  },
};
