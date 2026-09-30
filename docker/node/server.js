import express from "express";

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("saludo");
});

app.get("/productos", (req, res) => {
  res.send("Hola, desde productos");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor funcionando");
});