<?php
$titulo = "Cien años de soledad";
$autor = "Gabriel García Márquez";
$precioBase = 20.00;
$iva = 0.21;

// Cálculos de negocio
$precioConIVA = number_format($precioBase * (1 + $iva), 2);
$disponible = true;

// Evaluamos el estado en el servidor
$estadoText = $disponible ? "Disponible" : "Agotado";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 6 — Ficha de Libro (PHP)</title>
</head>
<body>
    <h1>Ficha del Libro</h1>
    <div>
        <h2><?php echo $titulo; ?></h2>
        <p><strong>Autor:</strong> <?php echo $autor; ?></p>
        <p><strong>Precio (IVA incl.):</strong> <?php echo $precioConIVA; ?> €</p>
        <p><strong>Estado:</strong> <?php echo $estadoText; ?></p>
    </div>
</body>
</html>