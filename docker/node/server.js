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


app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor funcionando");
});