<?php
// Estructura en PHP (Array asociativo)
$libro = [
    "titulo" => "El Hobbit",
    "autor" => "J.R.R. Tolkien",
    "precioBase" => 15.00,
    "iva" => 0.21,
    "disponible" => true
];

// Lógica en el servidor
$precioConIVA = number_format($libro["precioBase"] * (1 + $libro["iva"]), 2, ',', '.');
$estadoText = $libro["disponible"] ? "Disponible" : "Agotado";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 7 — Ficha con Estructura (PHP)</title>
</head>
<body>
    <h1>Ficha del Libro (Array Asociativo)</h1>
    <div>
        <h2><?php echo $libro["titulo"]; ?></h2>
        <p><strong>Autor:</strong> <?php echo $libro["autor"]; ?></p>
        <p><strong>Precio (IVA incl.):</strong> <?php echo $precioConIVA; ?> €</p>
        <p><strong>Estado:</strong> <?php echo $estadoText; ?></p>
    </div>
</body>
</html>