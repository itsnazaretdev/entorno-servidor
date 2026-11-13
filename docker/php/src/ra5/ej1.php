<?php

// ==================== [DATOS] ====================
// El array de libros será el que contenga todos los datos que necesitamos
$libros = [
    ["titulo" => "El Hobbit", "autor" => "J.R.R. Tolkien", "precioBase" => 15.00, "disponible" => true, "oferta" => true, "genero" => "Fantasía"],
    ["titulo" => "1984", "autor" => "George Orwell", "precioBase" => 10.00, "disponible" => false, "oferta" => true, "genero" => "Distopía"],
    ["titulo" => "Dune", "autor" => "Frank Herbert", "precioBase" => 20.00, "disponible" => true, "oferta" => false, "genero" => "Ciencia ficción"]
];

// ==================== [LÓGICA] ====================
// Recoger el dato del formulario
$busqueda = "";
if (isset($_GET["busqueda"])) {
    $busqueda = $_GET["busqueda"];
}

// Regla de búsqueda: el título contiene lo buscado (sin mayúsculas)
// OJO: la lógica toca el array de DATOS directamente
$resultados = [];

for ($i = 0; $i < count($libros); $i++) {
    $titulo = mb_strtolower($libros[$i]["titulo"]);
    $termino = mb_strtolower($busqueda);

    if (str_contains($titulo, $termino)) {
        $resultados[] = $libros[$i];
    }
}
?>

<!-- ==================== [PRESENTACIÓN] ==================== -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 1 - Diagnóstico</title>
</head>
<body>
    <h1>Catálogo</h1>

    <form action="ej1_diagnostico.php" method="get">
        <label for="busqueda">Título:</label>
        <input type="text" id="busqueda" name="busqueda" value="<?php echo htmlspecialchars($busqueda); ?>">
        <button type="submit">Buscar</button>
    </form>

    <?php if ($busqueda != "") { ?>
        <p>Resultados para: <?php echo htmlspecialchars($busqueda); ?></p>
    <?php } ?>

    <?php if (count($resultados) == 0) { ?>
        <p>No se encontraron libros.</p>
    <?php } else { ?>
        <?php for ($i = 0; $i < count($resultados); $i++) { ?>
            <div>
                <h2><?php echo $resultados[$i]["titulo"]; ?></h2>
                <p>Autor: <?php echo $resultados[$i]["autor"]; ?></p>
                <!-- Si cambia el nombre en los DATOS, hay que cambiarlo aquí también -->
                <p>Precio: <?php echo $resultados[$i]["precioBase"]; ?> €</p>
            </div>
        <?php } ?>
    <?php } ?>
</body>
</html>