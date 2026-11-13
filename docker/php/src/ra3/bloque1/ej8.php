<?php
// EJERCICIO 8 - Buscar de verdad

$libros = [
    ["titulo" => "El Hobbit", "autor" => "J.R.R. Tolkien", "precioBase" => 15.00, "disponible" => true, "oferta" => true, "genero" => "Fantasía"],
    ["titulo" => "1984", "autor" => "George Orwell", "precioBase" => 10.00, "disponible" => false, "oferta" => true, "genero" => "Distopía"],
    ["titulo" => "Dune", "autor" => "Frank Herbert", "precioBase" => 20.00, "disponible" => true, "oferta" => false, "genero" => "Ciencia ficción"]
];

$busqueda = "";
if (isset($_GET["busqueda"])) {
    $busqueda = $_GET["busqueda"];
}

// Array vacío donde iremos guardando los libros que coinciden
$resultados = [];

for ($i = 0; $i < count($libros); $i++) {
    // Pasamos los dos textos a minúsculas para que "Dune" y "dune" coincidan
    $titulo = mb_strtolower($libros[$i]["titulo"]);
    $termino = mb_strtolower($busqueda);

    // str_contains comprueba si el título contiene el término buscado
    if (str_contains($titulo, $termino)) {
        $resultados[] = $libros[$i];
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 8 - Buscar</title>
</head>
<body>
    <h1>Buscar libros</h1>

    <form action="ej8.php" method="get">
        <label for="busqueda">Título:</label>
        <input type="text" id="busqueda" name="busqueda" value="<?php echo htmlspecialchars($busqueda); ?>">
        <button type="submit">Buscar</button>
    </form>

    <?php if ($busqueda != "") { ?>
        <p>Resultados para: <?php echo htmlspecialchars($busqueda); ?></p>
    <?php } ?>

    <?php for ($i = 0; $i < count($resultados); $i++) { ?>
        <div>
            <h2><?php echo $resultados[$i]["titulo"]; ?></h2>
            <p>Autor: <?php echo $resultados[$i]["autor"]; ?></p>
        </div>
    <?php } ?>
</body>
</html>