<?php
// EJERCICIO 9 - Filtro por género

$libros = [
    ["titulo" => "El Hobbit", "autor" => "J.R.R. Tolkien", "precioBase" => 15.00, "disponible" => true, "oferta" => true, "genero" => "Fantasía"],
    ["titulo" => "1984", "autor" => "George Orwell", "precioBase" => 10.00, "disponible" => false, "oferta" => true, "genero" => "Distopía"],
    ["titulo" => "Dune", "autor" => "Frank Herbert", "precioBase" => 20.00, "disponible" => true, "oferta" => false, "genero" => "Ciencia ficción"]
];

$busqueda = "";
if (isset($_GET["busqueda"])) {
    $busqueda = $_GET["busqueda"];
}

$genero = "";
if (isset($_GET["genero"])) {
    $genero = $_GET["genero"];
}

$resultados = [];

for ($i = 0; $i < count($libros); $i++) {
    $titulo = mb_strtolower($libros[$i]["titulo"]);
    $termino = mb_strtolower($busqueda);

    // Condición 1: el título contiene lo buscado
    $coincideTitulo = str_contains($titulo, $termino);

    // Condición 2: no se ha elegido género, o el género es el elegido
    $coincideGenero = false;
    if ($genero == "") {
        $coincideGenero = true;
    } else if ($libros[$i]["genero"] == $genero) {
        $coincideGenero = true;
    }

    // Solo lo añadimos si cumple las dos
    if ($coincideTitulo && $coincideGenero) {
        $resultados[] = $libros[$i];
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 9 - Filtro por género</title>
</head>
<body>
    <h1>Buscar libros</h1>

    <form action="ej9.php" method="get">
        <label for="busqueda">Título:</label>
        <input type="text" id="busqueda" name="busqueda" value="<?php echo htmlspecialchars($busqueda); ?>">

        <label for="genero">Género:</label>
        <select id="genero" name="genero">
            <option value="">Todos</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Distopía">Distopía</option>
            <option value="Ciencia ficción">Ciencia ficción</option>
        </select>

        <button type="submit">Buscar</button>
    </form>

    <?php for ($i = 0; $i < count($resultados); $i++) { ?>
        <div>
            <h2><?php echo $resultados[$i]["titulo"]; ?></h2>
            <p>Autor: <?php echo $resultados[$i]["autor"]; ?></p>
            <p>Género: <?php echo $resultados[$i]["genero"]; ?></p>
        </div>
    <?php } ?>
</body>
</html>