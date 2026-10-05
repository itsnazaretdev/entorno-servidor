import express from "express";

const app = express();

app.set("view engine", "ejs");

app.get("/producto", (req, res) => {
  res.render("producto", {
    nombre: "Teclado mecanico",
    precio: 79.90,
    hayStock: true
  });
});

app.get("/ra2", (req, res) => {
  res.render("ra2/ej1");
});


app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor funcionando");
});