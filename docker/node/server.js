import express from "express";

const app = express();

const titulo = "Dune";
const precioBase = 10.00;
const disponible = true;

app.set("view engine", "ejs");

app.get("/producto", (req, res) => {
  res.render("producto", {
    nombre: "Teclado mecanico",
    precio: 79.90,
    hayStock: true
  });
});

// ==========================================
// BLOQUE 1 (Ejercicios 1 - 5)
// ==========================================

// Ejercicio 1
app.get("/ra2/bloque1/ej1", (req, res) => {
  res.render("ra2/bloque1/ej1");
});

// Ejercicio 2
app.get("/ra2/bloque1/ej2", (req, res) => {
  res.render("ra2/bloque1/ej2");
});

// Ejercicio 3
app.get("/ra2/bloque1/ej3", (req, res) => {
    res.render("ra2/bloque1/ej3", libroBase);
});

// Ejercicio 4
app.get("/ra2/bloque1/ej4", (req, res) => {
    const precioConIVA = precioBase * 1.21;
    res.render("ra2/bloque1/ej4", {
        precioBase,
        precioConIVA,
        etiquetaEstado: disponible ? "En stock" : "Agotado"
    });
});

// Ejercicio 5 
app.get("/ra2/bloque1/ej5", (req, res) => {
    const precioConIVA = precioBase * 1.21;
    res.render("ra2/bloque1/ej5", {
        titulo,
        precioFormateado: precioConIVA.toFixed(2).replace('.', ',')
    });
});


// Ejercicio 6 — La ficha de un libro
// Ejercicio 6 (Estricto: variables sueltas, sin objeto)
app.get("/ra2/bloque2/ej6", (req, res) => {
    // Variables sueltas
    const titulo = "Cien años de soledad";
    const autor = "Gabriel García Márquez";
    const precioBase = 20.00;
    const iva = 0.21;
    const disponible = true;

    // Lógica en el servidor
    const precioConIVA = (precioBase * (1 + iva)).toFixed(2).replace('.', ',');
    const estadoText = disponible ? "Disponible" : "Agotado";

    // Pasamos las variables sueltas
    res.render("ra2/bloque2/ej6", {
        titulo,
        autor,
        precioConIVA,
        estadoText
    });
});

// Ejercicio 7
// Ejercicio 7 — Los datos en una estructura
app.get("/ra2/bloque2/ej7", (req, res) => {
    // Agrupamos en una estructura (Objeto)
    const libro = {
        titulo: "El Hobbit",
        autor: "J.R.R. Tolkien",
        precioBase: 15.00,
        iva: 0.21,
        disponible: true
    };

    // Lógica en el servidor usando los campos del objeto
    const precioConIVA = (libro.precioBase * (1 + libro.iva)).toFixed(2).replace('.', ',');
    const estadoText = libro.disponible ? "Disponible" : "Agotado";

    // Pasamos el objeto 'libro' junto con los cálculos
    res.render("ra2/bloque2/ej7", {
        libro,
        precioConIVA,
        estadoText
    });
});

// Ejercicio 8 — El catálogo (a mano, repetido)
app.get("/ra2/bloque2/ej8", (req, res) => {
    // Libro 1
    const libro1 = { titulo: "El Hobbit", autor: "J.R.R. Tolkien", precioBase: 15.00, disponible: true };
    const precioIVA1 = (libro1.precioBase * 1.21).toFixed(2).replace('.', ',');
    const estado1 = libro1.disponible ? "Disponible" : "Agotado";

    // Libro 2
    const libro2 = { titulo: "1984", autor: "George Orwell", precioBase: 10.00, disponible: false };
    const precioIVA2 = (libro2.precioBase * 1.21).toFixed(2).replace('.', ',');
    const estado2 = libro2.disponible ? "Disponible" : "Agotado";

    // Libro 3
    const libro3 = { titulo: "Dune", autor: "Frank Herbert", precioBase: 20.00, disponible: true };
    const precioIVA3 = (libro3.precioBase * 1.21).toFixed(2).replace('.', ',');
    const estado3 = libro3.disponible ? "Disponible" : "Agotado";

    // Enviamos todos los datos sueltos/procesados a la vista
    res.render("ra2/bloque2/ej8", {
        libro1, precioIVA1, estado1,
        libro2, precioIVA2, estado2,
        libro3, precioIVA3, estado3
    });
});

// Ejercicio 9 — Ámbito de variables
app.get("/ra2/bloque2/ej9", (req, res) => {
    // Variable en ámbito del handler
    const tasaIVA = 0.21;

    function calcularPrecioConIVA(precioBase) {
        // Variable LOCAL a la función
        const resultadoLocal = precioBase * (1 + tasaIVA);
        return resultadoLocal;
    }

    const precioFinal = calcularPrecioConIVA(100).toFixed(2).replace('.', ',');

    // PROVOCAMOS EL ERROR A PROPÓSITO:
    // Si descomentas la siguiente línea, el servidor lanzará ReferenceError y detendrá la ejecución
    // console.log(resultadoLocal); 

    res.render("ra2/bloque2/ej9", {
        precioFinal,
        // Pasamos una explicación en texto para mostrar en la vista
        explicacionError: "Si intentamos hacer 'console.log(resultadoLocal)' fuera de la función, Node lanza: ReferenceError: resultadoLocal is not defined."
    });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor funcionando en http://localhost:3000");
});