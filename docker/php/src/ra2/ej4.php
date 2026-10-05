<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 4 - Operadores (PHP)</title>
</head>
<body>

    <?php
        $precioBase = 20.00;
        $disponible = true;

        $precioConIVA = $precioBase * 1.21;

        $etiquetaEstado = $disponible ? "En stock" : "Agotado";
    ?>

    <h2>Detalle del Libro</h2>
    <p><strong>Precio Base:</strong> <?php echo $precioBase; ?> €</p>
    <p><strong>Precio con IVA (21%):</strong> <?php echo $precioConIVA; ?> €</p>
    <p><strong>Estado:</strong> <?php echo $etiquetaEstado; ?></p>

</body>
</html>