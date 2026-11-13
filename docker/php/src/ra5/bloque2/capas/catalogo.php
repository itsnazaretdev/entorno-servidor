<?php
/** @var array $config */

require_once "config.php";
require_once "LibroService.php";

$repositorio = new LibroRepository();
$servicio = new LibroService($repositorio, $config["librosPorPagina"]);

// 1. Recibir la petición
$busqueda = "";
if (isset($_GET["busqueda"])) {
    $busqueda = $_GET["busqueda"];
}

$genero = "";
if (isset($_GET["genero"])) {
    $genero = $_GET["genero"];
}

// 2. Pedir los datos ya preparados al servicio
$resultados = $servicio->filtrar($busqueda, $genero);
$disponibles = $servicio->contarDisponibles($resultados);
$generos = $servicio->obtenerGeneros();
$nombreApp = $config["nombre"];

// 3. Mostrar la vista (ve todas las variables de arriba)
require __DIR__ . "/../vistas/vista_catalogo.php";  
