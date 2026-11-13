<?php
$env = parse_ini_file(__DIR__ . "/.env");

$config = [
    "nombre" => $env["APP_NOMBRE"],
    "librosPorPagina" => (int) $env["LIBROS_POR_PAGINA"],
    "entorno" => $env["APP_ENTORNO"]
];

// Según el entorno, mostramos los errores o no (como en el ejercicio 10 del RA2)
if ($config["entorno"] == "development") {
    ini_set("display_errors", "1");
} else {
    ini_set("display_errors", "0");
}