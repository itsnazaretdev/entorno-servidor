import express from "express";

const app = express();

const libroBase = {
    titulo: "Dune",
    precioBase: 10.00,
    disponible: true
};

app.set("view engine", "ejs");

app.get("/producto", (req, res) => {
  res.render("producto", {
    nombre: "Teclado mecanico",
    precio: 79.90,
    hayStock: true
  });
});

app.get("/ra2/ej1", (req, res) => {
  res.render("ra2/ej1");
});

app.get("/ra2/ej2", (req, res) => {
  res.render("ra2/ej2");
});

app.get("/ra2/ej3", (req, res) => {
    res.render("ra2/ej3", libroBase);
});

// Ejercicio 4
app.get("/ra2/ej4", (req, res) => {
    const precioConIVA = libroBase.precioBase * 1.21;
    res.render("ra2/ej4", {
        precioBase: libroBase.precioBase,
        precioConIVA,
        etiquetaEstado: libroBase.disponible ? "En stock" : "Agotado"
    });
});

// Ejercicio 5 (Reutiliza libroBase)
app.get("/ra2/ej5", (req, res) => {
    const precioConIVA = libroBase.precioBase * 1.21;
    res.render("ra2/ej5", {
        titulo: libroBase.titulo,
        precioFormateado: precioConIVA.toFixed(2).replace('.', ',')
    });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor funcionando");
});