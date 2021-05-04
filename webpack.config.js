const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
//Minimizar CSS
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  //Punto de entrada de la app
  entry: "./src/index.js",
  output: {
    //Lugar donde se va a guardar/preparar el proyecto
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    //Para guardar las imagenes generadas en la carpeta assets
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    //Extensiones con la que trabajaremos en el proyecto: .js, react, etc
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils"),
      "@templates": path.resolve(__dirname, "src/templates"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@images": path.resolve(__dirname, "src/assets/images"),
    },
  },
  module: {
    rules: [
      //Reglas para babel
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
      //Reglas para CSS
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      //Reglas para imagenes
      {
        test: /\.png/,
        type: "asset/resource",
      },
      //Reglas para fuentes
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            //Hacia que carpeta se enviara
            outputPath: "./assets/fonts",
            publicPath: "../assets/fonts",
            esModule: false,
          },
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
    //Configuraciones plugin de CSS
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css",
    }),
    //Configuraciones plugin para copiar/mover archivos
    new CopyPlugin({
      patterns: [
        {
          //Colocamos el archivos o carpeta que vamos a mover, en este
          //caso assets/images, movere todas las imagenes a dist
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
  ],
  optimization: {
    //Minimizar CSS
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
