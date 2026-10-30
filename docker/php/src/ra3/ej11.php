<?php
// EJERCICIO 11 - El mismo buscador del ejercicio 8, pero con POST
// Compáralo con ej8.php: la lógica es igual, solo cambian method="post" y $_POST

$libros = [
    ["titulo" => "El Hobbit", "autor" => "J.R.R. Tolkien", "precioBase" => 15.00, "disponible" => true, "oferta" => true, "genero" => "Fantasía"],
    ["titulo" => "1984", "autor" => "George Orwell", "precioBase" => 10.00, "disponible" => false, "oferta" => true, "genero" => "Distopía"],
    ["titulo" => "Dune", "autor" => "Frank Herbert", "precioBase" => 20.00, "disponible" => true, "oferta" => false, "genero" => "Ciencia ficción"]
];

// Con POST el dato ya no viene en la URL, viene en $_POST
$busqueda = "";
if (isset($_POST["busqueda"])) {
    $busqueda = $_POST["busqueda"];
}

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
    <title>Ejercicio 11 - Búsqueda con POST</title>
</head>
<body>
    <h1>Buscar libros (POST)</h1>

    <form action="ej11.php" method="post">
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