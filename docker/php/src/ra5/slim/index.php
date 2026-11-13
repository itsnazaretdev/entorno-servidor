<?php
// EJERCICIO 11 - La misma página del catálogo, pero montada con Slim
// Reutiliza tal cual el servicio, el repositorio y la vista de la carpeta capas

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

// Carga Slim (lo instala Composer en la carpeta vendor)
require __DIR__ . "/vendor/autoload.php";

// Nuestro código de siempre, sin cambios
require __DIR__ . "/../bloque2/capas/config.php";
require_once __DIR__ . "/../bloque2/capas/LibroService.php";

$app = AppFactory::create();

// La app vive en esta carpeta, no en la raíz del servidor
$app->setBasePath("/ra5/slim");

// Muestra los errores y una página 404 si la ruta no existe
$app->addErrorMiddleware(true, true, true);

// LA RUTA: cuando alguien pide GET /libros, se ejecuta esta función
// "use ($config)" deja usar dentro la variable $config de fuera
$app->get("/libros", function (Request $request, Response $response) use ($config) {
    $repositorio = new LibroRepository();
    $servicio = new LibroService($repositorio, $config["librosPorPagina"]);

    // 1. Recibir la petición: en vez de $_GET, se lo pedimos a $request
    $parametros = $request->getQueryParams();

    $busqueda = "";
    if (isset($parametros["busqueda"])) {
        $busqueda = $parametros["busqueda"];
    }

    $genero = "";
    if (isset($parametros["genero"])) {
        $genero = $parametros["genero"];
    }

    // 2. Pedir los datos al servicio (igual que en capas/catalogo.php)
    $resultados = $servicio->filtrar($busqueda, $genero);
    $disponibles = $servicio->contarDisponibles($resultados);
    $generos = $servicio->obtenerGeneros();
    $nombreApp = $config["nombre"];
    $accionFormulario = "libros"; // el formulario vuelve a esta misma ruta

    // 3. La vista hace echo, pero Slim necesita el HTML dentro de $response.
    //    ob_start "atrapa" todo lo que la vista escribe y ob_get_clean lo devuelve.
    ob_start();
    require __DIR__ . "/../bloque2/vistas/vista_catalogo.php";
    $html = ob_get_clean();

    $response->getBody()->write($html);
    return $response;
});

$app->run();