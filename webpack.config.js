const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
  module: {
    rules: [
      {
        // Test declara que extensión de archivos transformara el loader, en este caso archivos .js
        test: /\.m?js$/,
        // Exclude permite omitir archivos o carpetas especificas, para que no escoga los archivos .js de esas carpetas
        exclude: /node_modules/,
        use: {
          //Le indicamos que usaremos el Loader Babel
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    //Configuraciones plugin de HTML
    new HtmlWebpackPlugin({
      //inyecta el bundle al template html
      inject: true,
      //la ruta al template html
      template: "./public/index.html",
      //nombre final del archivo
      filename: "./index.html",
    }),
  ],
};
