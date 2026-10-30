import express from "express";

const app = express();

const titulo = "Dune";
const precioBase = 10.0;
const disponible = true;

app.set("view engine", "ejs");

// Para que Express pueda leer los datos de formularios enviados con POST
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("saludo");
});

app.get("/producto", (req, res) => {
  res.render("producto", {
    nombre: "Teclado mecanico",
    precio: 79.9,
    hayStock: true,
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
  const libroBase = { titulo, precioBase, disponible };
  res.render("ra2/bloque1/ej3", libroBase);
});

// Ejercicio 4
app.get("/ra2/bloque1/ej4", (req, res) => {
  const precioConIVA = precioBase * 1.21;
  res.render("ra2/bloque1/ej4", {
    precioBase,
    precioConIVA,
    etiquetaEstado: disponible ? "En stock" : "Agotado",
  });
});

// Ejercicio 5
app.get("/ra2/bloque1/ej5", (req, res) => {
  const precioConIVA = precioBase * 1.21;
  res.render("ra2/bloque1/ej5", {
    titulo,
    precioFormateado: precioConIVA.toFixed(2).replace(".", ","),
  });
});

// Ejercicio 6
app.get("/ra2/bloque2/ej6", (req, res) => {
  // Variables sueltas
  const titulo = "Cien años de soledad";
  const autor = "Gabriel García Márquez";
  const precioBase = 20.0;
  const iva = 0.21;
  const disponible = true;

  // Lógica en el servidor
  const precioConIVA = (precioBase * (1 + iva)).toFixed(2).replace(".", ",");
  const estadoText = disponible ? "Disponible" : "Agotado";

  // Pasamos las variables sueltas
  res.render("ra2/bloque2/ej6", {
    titulo,
    autor,
    precioConIVA,
    estadoText,
  });
});

// Ejercicio 7
app.get("/ra2/bloque2/ej7", (req, res) => {
  // Agrupamos en una estructura (Objeto)
  const libro = {
    titulo: "El Hobbit",
    autor: "J.R.R. Tolkien",
    precioBase: 15.0,
    iva: 0.21,
    disponible: true,
  };

  // Lógica en el servidor usando los campos del objeto
  const precioConIVA = (libro.precioBase * (1 + libro.iva))
    .toFixed(2)
    .replace(".", ",");
  const estadoText = libro.disponible ? "Disponible" : "Agotado";

  // Pasamos el objeto 'libro' junto con los cálculos
  res.render("ra2/bloque2/ej7", {
    libro,
    precioConIVA,
    estadoText,
  });
});

// Ejercicio 8 — El catálogo (a mano, repetido)
app.get("/ra2/bloque2/ej8", (req, res) => {
  // Libro 1
  const libro1 = {
    titulo: "El Hobbit",
    autor: "J.R.R. Tolkien",
    precioBase: 15.0,
    disponible: true,
  };
  const precioIVA1 = (libro1.precioBase * 1.21).toFixed(2).replace(".", ",");
  const estado1 = libro1.disponible ? "Disponible" : "Agotado";

  // Libro 2
  const libro2 = {
    titulo: "1984",
    autor: "George Orwell",
    precioBase: 10.0,
    disponible: false,
  };
  const precioIVA2 = (libro2.precioBase * 1.21).toFixed(2).replace(".", ",");
  const estado2 = libro2.disponible ? "Disponible" : "Agotado";

  // Libro 3
  const libro3 = {
    titulo: "Dune",
    autor: "Frank Herbert",
    precioBase: 20.0,
    disponible: true,
  };
  const precioIVA3 = (libro3.precioBase * 1.21).toFixed(2).replace(".", ",");
  const estado3 = libro3.disponible ? "Disponible" : "Agotado";

  // Enviamos todos los datos sueltos/procesados a la vista
  res.render("ra2/bloque2/ej8", {
    libro1,
    precioIVA1,
    estado1,
    libro2,
    precioIVA2,
    estado2,
    libro3,
    precioIVA3,
    estado3,
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

  const precioFinal = calcularPrecioConIVA(100).toFixed(2).replace(".", ",");

  // PROVOCAMOS EL ERROR A PROPÓSITO:
  // Si descomentas la siguiente línea, el servidor lanzará ReferenceError y detendrá la ejecución
  // console.log(resultadoLocal);

  res.render("ra2/bloque2/ej9", {
    precioFinal,
    // Pasamos una explicación en texto para mostrar en la vista
    explicacionError:
      "Si intentamos hacer 'console.log(resultadoLocal)' fuera de la función, Node lanza: ReferenceError: resultadoLocal is not defined.",
  });
});

//Ejercicio 10
const entorno = process.env.NODE_ENV || "development";

app.get("/ra2/bloque3/ej10", (req, res) => {
  // Datos de ejemplo para la ficha del libro (Ejercicio 11)
  const libro = {
    nombre: "El Quijote",
    categoria: "Novela",
    precio: 20.0,
    disponible: true,
  };

  // Comportamiento dinámico según el entorno (Ejercicio 10)
  if (entorno === "production") {
    console.log("Servidor en producción: ejecutando optimizaciones...");
  } else {
    console.log("Servidor en desarrollo: modo depuración activo.");
  }

  // Renderizamos la plantilla separada enviándole los datos y el entorno
  res.render("libro", { libro, entorno });
});

// Ejercicio 11 — Ficha del libro en Node/EJS (Criterios b y d)
app.get("/ra2/bloque3/ej11", (req, res) => {
  const libro = {
    titulo: "El Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    anio: 1605,
    paginas: 863,
    disponible: true,
  };

  res.render("ra2/bloque3/ej11", { libro });
});

//RA3 BLOQUE 1-------------------------------------------
const libros = [
    { titulo: "El Hobbit", autor: "J.R.R. Tolkien", precioBase: 15.00, disponible: true, oferta: true },
    { titulo: "1984", autor: "George Orwell", precioBase: 10.00, disponible: false, oferta: true },
    { titulo: "Dune", autor: "Frank Herbert", precioBase: 20.00, disponible: true, oferta: false }
];

// EJERCICIO 1
app.get("/ra3/ej1", function (req, res) {
  const libro = libros[0];
  let estado;

  if (libro.disponible) {
    estado = "Disponible";
  } else if (libro.oferta) {
    estado = "¡En oferta!";
  } else {
    estado = "Agotado";
  }

  res.render("ra3/ej1", { libro: libro, estado: estado });
});

// EJERCICIO 2 - Salidas tempranas
app.get("/ra3/ej2", function (req, res) {

  function puedePrestarse(usuario, libro) {
    if (usuario === null) {
      return "No se puede: no hay usuario.";
    }
    if (!usuario.activo) {
      return "No se puede: el usuario no está activo.";
    }
    if (!libro.disponible) {
      return "No se puede: el libro no está disponible.";
    }
    return "Préstamo aceptado.";
  }

  const usuarioActivo = { nombre: "Ana", activo: true };
  const usuarioInactivo = { nombre: "Luis", activo: false };

  res.render("ra3/ej2", {
    // 1. No hay usuario
    caso1: puedePrestarse(null, libros[0]),
    // 2. No está activo
    caso2: puedePrestarse(usuarioInactivo, libros[0]),
    // 3. No está disponible
    caso3: puedePrestarse(usuarioActivo, libros[1]),
    // Si no pasa nada de lo anterior, se puede prestar
    caso4: puedePrestarse(usuarioActivo, libros[0]),
  });
});

// EJERCICIO 3 - El catálogo con un bucle
app.get("/ra3/ej3", function (req, res) {
  // Aquí no hay lógica: el bucle está en el ejs
  res.render("ra3/ej3", { libros: libros });
});

// EJERCICIO 4 - Recorrer y contar
app.get("/ra3/ej4", function (req, res) {
  let disponibles = 0;

  for (let i = 0; i < libros.length; i++) {
    if (libros[i].disponible) {
      disponibles = disponibles + 1;
    }
  }

  res.render("ra3/ej4", { libros: libros, disponibles: disponibles, total: libros.length });
});

// EJERCICIO 5 - Funciones reutilizables
app.get("/ra3/ej5", function (req, res) {
  //Devolverá el iva, tomando libro desde lo que le pasamos en el html
  function precioConIva(libro) {
    const total = libro.precioBase + libro.precioBase * 0.02;
    return total.toFixed(2);
  }

  // Devolverá agotado, en oferta o disponible
  function estadoLibro(libro) {
    if (libro.disponible) {
      return "Disponible";
    } else if (libro.oferta) {
      return "¡En oferta!";
    } else {
      return "Agotado";
    }
  }

  // Le pasamos al ejs los libros y las dos funciones para usarlas en el bucle
  res.render("ra3/ej5", {
    libros: libros,
    precioConIva: precioConIva,
    estadoLibro: estadoLibro,
  });
});

//-----------------------------------------------------------
// EJERCICIO 6 - Formulario de búsqueda
app.get("/ra3/ej6", function (req, res) {
  res.render("ra3/ej6");
});


// EJERCICIO 7 - Recoger el dato con GET
app.get("/ra3/ej7", function (req, res) {
  // Lo que se escribe en el formulario llega en la URL: /ra3/ej7?busqueda=quijote
  let busqueda = req.query.busqueda;

  // Si todavía no se ha buscado nada, no llega nada (undefined)
  if (busqueda === undefined) {
    busqueda = "";
  }

  res.render("ra3/ej7", { busqueda: busqueda });
});


// EJERCICIO 8 - Buscar de verdad
app.get("/ra3/ej8", function (req, res) {
  let busqueda = req.query.busqueda;
  if (busqueda === undefined) {
    busqueda = "";
  }

  // Array vacío donde iremos guardando los libros que coinciden
  let resultados = [];

  for (let i = 0; i < libros.length; i++) {
    // Pasamos los dos textos a minúsculas para que "Dune" y "dune" coincidan
    let titulo = libros[i].titulo.toLowerCase();
    let termino = busqueda.toLowerCase();

    // includes comprueba si el título contiene el término buscado
    if (titulo.includes(termino)) {
      resultados.push(libros[i]);
    }
  }

  res.render("ra3/ej8", { busqueda: busqueda, resultados: resultados });
});


// EJERCICIO 9 - Filtro por género
app.get("/ra3/ej9", function (req, res) {
  let busqueda = req.query.busqueda;
  if (busqueda === undefined) {
    busqueda = "";
  }

  let genero = req.query.genero;
  if (genero === undefined) {
    genero = "";
  }

  let resultados = [];

  for (let i = 0; i < libros.length; i++) {
    let titulo = libros[i].titulo.toLowerCase();
    let termino = busqueda.toLowerCase();

    // Condición 1: el título contiene lo buscado
    let coincideTitulo = titulo.includes(termino);

    // Condición 2: no se ha elegido género, o el género es el elegido
    let coincideGenero = false;
    if (genero === "") {
      coincideGenero = true;
    } else if (libros[i].genero === genero) {
      coincideGenero = true;
    }

    // Solo lo añadimos si cumple las dos
    if (coincideTitulo && coincideGenero) {
      resultados.push(libros[i]);
    }
  }

  res.render("ra3/ej9", { busqueda: busqueda, genero: genero, resultados: resultados });
});


// EJERCICIO 10 - Sin resultados 
// La lógica es la misma que en el 9. El cambio está en el ejs.
app.get("/ra3/ej10", function (req, res) {
  let busqueda = req.query.busqueda;
  if (busqueda === undefined) {
    busqueda = "";
  }

  let genero = req.query.genero;
  if (genero === undefined) {
    genero = "";
  }

  let resultados = [];

  for (let i = 0; i < libros.length; i++) {
    let titulo = libros[i].titulo.toLowerCase();
    let termino = busqueda.toLowerCase();

    let coincideTitulo = titulo.includes(termino);

    let coincideGenero = false;
    if (genero === "") {
      coincideGenero = true;
    } else if (libros[i].genero === genero) {
      coincideGenero = true;
    }

    if (coincideTitulo && coincideGenero) {
      resultados.push(libros[i]);
    }
  }

  res.render("ra3/ej10", { busqueda: busqueda, genero: genero, resultados: resultados });
});


//------------------------------------------------------------
// EJERCICIO 11 - GET: cuando entras en la página, se muestra el formulario y todos los libros
app.get("/ra3/ej11", function (req, res) {
  res.render("ra3/ej11", { busqueda: "", resultados: libros });
});

// EJERCICIO 11 - POST: cuando envías el formulario
app.post("/ra3/ej11", function (req, res) {
  // Con POST el dato no viene en req.query, viene en req.body
  let busqueda = req.body.busqueda;
  if (busqueda === undefined) {
    busqueda = "";
  }

  let resultados = [];

  for (let i = 0; i < libros.length; i++) {
    let titulo = libros[i].titulo.toLowerCase();
    let termino = busqueda.toLowerCase();

    if (titulo.includes(termino)) {
      resultados.push(libros[i]);
    }
  }

  res.render("ra3/ej11", { busqueda: busqueda, resultados: resultados });
});

// EJERCICIO 12 - Catálogo con bucle + búsqueda (versión Node)
app.get("/ra3/ej12", function (req, res) {
  // 1. Recoger el dato del formulario (GET)
  let busqueda = req.query.busqueda;
  if (busqueda === undefined) {
    busqueda = "";
  }

  // 2. Recorrer el array y quedarnos con los que coinciden
  let resultados = [];

  for (let i = 0; i < libros.length; i++) {
    let titulo = libros[i].titulo.toLowerCase();
    let termino = busqueda.toLowerCase();

    if (titulo.includes(termino)) {
      resultados.push(libros[i]);
    }
  }

  res.render("ra3/ej12", { busqueda: busqueda, resultados: resultados });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor funcionando en http://localhost:3000");
});
