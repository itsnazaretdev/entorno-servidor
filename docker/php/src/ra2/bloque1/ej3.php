<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 3 - PHP</title>
</head>
<body>

    <?php
        $titulo = "Dune";
        $precio = 10.00;
        $disponible = true;
    ?>

    <h2>Datos del libro (PHP)</h2>
    <p><strong>Título:</strong> <?php echo $titulo; ?></p>
    <p><strong>Precio:</strong> <?php echo $precio; ?> €</p>
    
    <!-- Aquí probamos la salida directa del booleano -->
    <p><strong>Disponible (salida directa):</strong> [<?php echo $disponible; ?>]</p>

</body>
</html>