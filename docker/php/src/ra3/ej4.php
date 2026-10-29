<?php
$libros = [
    ["titulo" => "El Hobbit", "autor" => "J.R.R. Tolkien", "precioBase" => 15.00, "disponible" => true],
    ["titulo" => "1984", "autor" => "George Orwell", "precioBase" => 10.00, "disponible" => false],
    ["titulo" => "Dune", "autor" => "Frank Herbert", "precioBase" => 20.00, "disponible" => true]
];

$disponibles = 0;

for ($i = 0; $i < count($libros); $i++) {
    if ($libros[$i]["disponible"]) {
        $disponibles = $disponibles + 1;
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Catálogo</h1>
 
    <?php for ($i = 0; $i < count($libros); $i++) { ?>
        <div>
            <h2><?php echo $libros[$i]["titulo"]; ?></h2>
            <p>Título: <?php echo $libros[$i]["titulo"]; ?></p>
            <p>Autor: <?php echo $libros[$i]["autor"]; ?></p>
            <p>Precio: <?php echo $libros[$i]["precioBase"]; ?></p>
            <p>Disponibilidad: <?php echo $libros[$i]["disponible"] ? "Disponible" : "No disponible"; ?></p>

        </div>
    <?php } ?>

    <p><?php echo $disponibles; ?> de <?php echo count($libros); ?> disponibles</p>
</body>
</html>