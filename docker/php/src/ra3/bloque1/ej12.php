<?php
// EJERCICIO 12 - Catálogo con bucle + búsqueda (versión PHP)
// Compárala con la versión Node: ruta /ra3/ej12 en server.js + views/ra3/ej12.ejs

$libros = [
    ["titulo" => "El Hobbit", "autor" => "J.R.R. Tolkien", "precioBase" => 15.00, "disponible" => true, "oferta" => true, "genero" => "Fantasía"],
    ["titulo" => "1984", "autor" => "George Orwell", "precioBase" => 10.00, "disponible" => false, "oferta" => true, "genero" => "Distopía"],
    ["titulo" => "Dune", "autor" => "Frank Herbert", "precioBase" => 20.00, "disponible" => true, "oferta" => false, "genero" => "Ciencia ficción"]
];

// 1. Recoger el dato del formulario (GET)
$busqueda = "";
if (isset($_GET["busqueda"])) {
    $busqueda = $_GET["busqueda"];
}

// 2. Recorrer el array y quedarnos con los que coinciden
$resultados = [];

for ($i = 0; $i < count($libros); $i++) {
    $titulo = mb_strtolower($libros[$i]["titulo"]);
    $termino = mb_strtolower($busqueda);

    if (str_contains($titulo, $termino)) {
        $resultados[] = $libros[$i];
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 12 - Catálogo (PHP)</title>
</head>
<body>
    <h1>Catálogo (PHP)</h1>

    <form action="ej12.php" method="get">
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
                <p>Precio: <?php echo $resultados[$i]["precioBase"]; ?> €</p>
            </div>
        <?php } ?>
    <?php } ?>
</body>
</html>