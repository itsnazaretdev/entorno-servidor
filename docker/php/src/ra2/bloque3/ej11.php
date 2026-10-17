<?php
// Datos del libro (simulando el ejercicio 6)
$libro = [
    "titulo" => "El Quijote de la Mancha",
    "autor" => "Miguel de Cervantes",
    "anio" => 1605,
    "paginas" => 863,
    "disponible" => true
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ficha del Libro (PHP)</title>
</head>
<body>
    <main>
        <!-- Mostramos variables con la etiqueta corta de impresión -->
        <h1><?= $libro["titulo"] ?></h1>
        <p><strong>Autor:</strong> <?= $libro["autor"] ?></p>
        <p><strong>Año:</strong> <?= $libro["anio"] ?></p>
        <p><strong>Páginas:</strong> <?= $libro["paginas"] ?></p>
        <p><strong>Estado:</strong> <?= $libro["disponible"] ? "Disponible" : "Prestado" ?></p>
    </main>
</body>
</html>