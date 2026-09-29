// app.js
import express from "express"; // traemos la herramienta Express
const app = express(); // creamos nuestra aplicacion

// Cuando llegue una peticion GET a la raiz "/", respondemos con un texto
app.get("/", (req, res) => {
  res.send("Hola, mundo desde Node");
});

// Cuando llegue una peticion GET a "/productos", respondemos con un texto
app.get("/productos", (req, res) => {
  res.send("Hola, desde productos");
});

// Ponemos el servidor a escuchar en el puerto 3000
app.listen(3000);
