import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { Libro } from "./Libro.js";
import { LibroRepository1 } from "./LibroRepository1.js";
import { config } from "./views/ra5/bloque2/capas/config.js";
import { LibroRepository } from "./views/ra5/bloque2/capas/LibroRepository.js";
import { LibroService } from "./views/ra5/bloque2/capas/LibroService.js";

const app = express();

const titulo = "Dune";
const precioBase = 10.0;
const disponible = true;

app.set("view engine", "ejs");

// Para que Express pueda leer los datos de formularios enviados con POST
app.use(express.urlencoded({ extended: true }));

// Para poder leer las cookies con req.cookies
app.use(cookieParser());

// Para poder usar sesiones con req.session
app.use(session({
  secret: "una-frase-secreta",
  resave: false,
  saveUninitialized: true
}));

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

//-------------------------------------------------------------------
//RA3 BLOQUE 1
//-------------------------------------------------------------------
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

//-------------------------------------------------------------------
//RA4 BLOQUE 1
//-------------------------------------------------------------------

// EJERCICIO 1 - HTTP no recuerda
app.get("/ra4/ej1", function (req, res) {
  // La variable se crea DENTRO de la ruta: nace de cero en cada petición
  let contador = 0;
  contador = contador + 1;

  res.render("r4/ej1", { contador: contador });
});

// EJERCICIO 2 - Guardar la última búsqueda en una cookie
app.get("/ra4/ej2", function (req, res) {
  // Si llega una búsqueda, la guardamos en una cookie durante 1 hora
  // maxAge va en milisegundos: 60 * 60 * 1000 = 1 hora
  if (req.query.busqueda !== undefined) {
    res.cookie("ultimaBusqueda", req.query.busqueda, { maxAge: 60 * 60 * 1000 });
  }

  // Leemos la cookie (el navegador la envía en cada petición)
  let ultimaBusqueda = req.cookies.ultimaBusqueda;
  if (ultimaBusqueda === undefined) {
    ultimaBusqueda = "";
  }

  res.render("r4/ej2", { ultimaBusqueda: ultimaBusqueda });
});


// EJERCICIO 3 - Página 1 con sesión
app.get("/ra4/ej3_1", function (req, res) {
  // Si el contador todavía no existe en la sesión, lo creamos a 0
  if (req.session.visitas === undefined) {
    req.session.visitas = 0;
  }

  req.session.visitas = req.session.visitas + 1;

  res.render("ra4/ej3_1", { visitas: req.session.visitas });
});

// EJERCICIO 3 - Página 2 con sesión (comparte el mismo contador)
app.get("/ra4/ej3_2", function (req, res) {
  if (req.session.visitas === undefined) {
    req.session.visitas = 0;
  }

  req.session.visitas = req.session.visitas + 1;

  res.render("ra4/ej3_2", { visitas: req.session.visitas });
});

// EJERCICIO 4 - Abrir directamente el catálogo
app.get("/ra4/ej4", function (req, res) {
  res.redirect("/ra4/ej4/catalogo");
});

// EJERCICIO 4 - Catálogo: ver los libros
app.get("/ra4/ej4/catalogo", function (req, res) {
  // Si la bolsa no existe todavía, la creamos vacía
  if (req.session.bolsa === undefined) {
    req.session.bolsa = [];
  }

  res.render("ra4/ej4_catalogo", { libros: libros, bolsa: req.session.bolsa, mensaje: "" });
});

// EJERCICIO 4 - Catálogo: apartar un libro (lo envía el botón "Apartar")
app.post("/ra4/ej4/catalogo", function (req, res) {
  if (req.session.bolsa === undefined) {
    req.session.bolsa = [];
  }

  let titulo = req.body.titulo;
  let mensaje = "";

  // Solo lo añadimos si no estaba ya
  if (req.session.bolsa.includes(titulo)) {
    mensaje = "Ese libro ya está en tu bolsa.";
  } else {
    req.session.bolsa.push(titulo);
    mensaje = "Has apartado: " + titulo;
  }

  res.render("ra4/ej4_catalogo", { libros: libros, bolsa: req.session.bolsa, mensaje: mensaje });
});

// EJERCICIO 4 - Ver la bolsa
app.get("/ra4/ej4/bolsa", function (req, res) {
  if (req.session.bolsa === undefined) {
    req.session.bolsa = [];
  }

  res.render("ra4/ej4_bolsa", { bolsa: req.session.bolsa });
});

// EJERCICIO 5 - Usuarios en memoria: cada uno tiene un rol
const usuarios = [
  { nombre: "ana", contrasena: "1234", rol: "usuario" },
  { nombre: "luis", contrasena: "5678", rol: "admin" }
];

// Mostrar la página
app.get("/ra4/ej5_login", function (req, res) {
  res.render("ra4/ej5_login", { usuario: req.session.usuario, rol: req.session.rol, mensaje: "" });
});

// Comprobar los datos del formulario
app.post("/ra4/ej5_login", function (req, res) {
  let nombre = req.body.nombre;
  let contrasena = req.body.contrasena;
  let mensaje = "";

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].nombre === nombre && usuarios[i].contrasena === contrasena) {
      // Correcto: guardamos el usuario y su rol en la sesión
      req.session.usuario = nombre;
      req.session.rol = usuarios[i].rol;
    }
  }

  if (req.session.usuario === undefined) {
    mensaje = "Usuario o contraseña incorrectos.";
  }

  res.render("ra4/ej5_login", { usuario: req.session.usuario, rol: req.session.rol, mensaje: mensaje });
});


// EJERCICIO 6 - Cerrar sesión
app.get("/ra4/ej6_logout", function (req, res) {
  // Destruimos la sesión y, cuando termina, volvemos al login
  req.session.destroy(function () {
    res.redirect("/ra4/ej5_login");
  });
});


// EJERCICIO 7 - Guardián (middleware)
// Si no has iniciado sesión, te manda al login
// Si has iniciado sesión, next() te deja pasar
function requiereLogin(req, res, next) {
  if (req.session.usuario === undefined) {
    res.redirect("/ra4/ej5_login");
  } else {
    next();
  }
}

// La bolsa, protegida: el guardián va entre la URL y la función
app.get("/ra4/ej7_bolsa", requiereLogin, function (req, res) {
  if (req.session.bolsa === undefined) {
    req.session.bolsa = [];
  }

  res.render("ra4/ej7_bolsa", { usuario: req.session.usuario, bolsa: req.session.bolsa });
});


// EJERCICIO 8 - Guardián solo para administradores
function requiereAdmin(req, res, next) {
  // 1. Si no has iniciado sesión, al login
  if (req.session.usuario === undefined) {
    res.redirect("/ra4/ej5_login");
    return;
  }

  // 2. Si has iniciado sesión pero no eres admin, no puedes pasar
  if (req.session.rol !== "admin") {
    res.send("<p>No tienes permiso para ver esta página.</p><a href='/ra4/ej5_login'>Volver</a>");
    return;
  }

  // 3. Si eres admin, puedes pasar
  next();
}

// El panel, protegido solo para admin
app.get("/ra4/ej8_panel", requiereAdmin, function (req, res) {
  res.render("ra4/ej8_panel", { usuario: req.session.usuario, libros: libros });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Servidor funcionando en http://localhost:3000");
});

//-------------------------------------------------------------------
//RA5 BLOQUE 1
//-------------------------------------------------------------------
// EJERCICIO 1 - Catálogo con bucle + búsqueda (versión Node)

// ==================== [DATOS] ====================
// const libros = [
//     { titulo: "El Hobbit", autor: "J.R.R. Tolkien", precioBase: 15.00, disponible: true, oferta: true },
//     { titulo: "1984", autor: "George Orwell", precioBase: 10.00, disponible: false, oferta: true },
//     { titulo: "Dune", autor: "Frank Herbert", precioBase: 20.00, disponible: true, oferta: false }
// ];

// ==================== [LÓGICA] ====================
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

// EJERCICIO 2 - Catálogo con objetos Libro

// Arriba del todo, con los demás import
// import { Libro } from "./Libro.js";

app.get("/ra5/ej2", function (req, res) {
  const libros = [
    new Libro("El Hobbit", "J.R.R. Tolkien", 15.00, true),
    new Libro("1984", "George Orwell", 10.00, false),
    new Libro("Dune", "Frank Herbert", 20.00, true)
  ];

  res.render("ra5/ej2", { libros: libros });
});

// EJERCICIO 3 - El catálogo pidiendo los datos al Repository
// Arriba del todo, con los demás import
// import { LibroRepository } from "./LibroRepository.js";

app.get("/ra5/ej3", function (req, res) {
  const repositorio = new LibroRepository1();

  let busqueda = req.query.busqueda;
  if (busqueda === undefined) {
    busqueda = "";
  }

  // Ya no recorremos ningún array aquí: se lo pedimos al repositorio
  const resultados = repositorio.buscarPorTitulo(busqueda);

  res.render("ra5/ej3", { busqueda: busqueda, resultados: resultados });
});

//-------------------------------------------------------------------
//RA4 BLOQUE 1
//-------------------------------------------------------------------
// Arriba del todo, con los demás import
// import { config } from "./views/ra5/bloque2/capas/config.js";
// import { LibroRepository } from "./views/ra5/bloque2/capas/LibroRepository.js";
// import { LibroService } from "./views/ra5/bloque2/capas/LibroService.js";

// EJERCICIO 5 - CONTROLADOR: solo coordina.
// 1. Recibe la petición   2. Llama al servicio   3. Pasa los datos a la vista
app.get("/ra5/catalogo", function (req, res) {
  const repositorio = new LibroRepository();
  const servicio = new LibroService(repositorio, config.librosPorPagina);

  // 1. Recibir la petición
  let busqueda = req.query.busqueda;
  if (busqueda === undefined) {
    busqueda = "";
  }

  let genero = req.query.genero;
  if (genero === undefined) {
    genero = "";
  }

  // 2. Pedir los datos ya preparados al servicio
  const resultados = servicio.filtrar(busqueda, genero);

  // 3. Pasarlos a la vista
  res.render("ra5/bloque2/vistas/catalogo", {
    nombreApp: config.nombre,
    busqueda: busqueda,
    genero: genero,
    generos: servicio.obtenerGeneros(),
    resultados: resultados,
    disponibles: servicio.contarDisponibles(resultados)
  });
});