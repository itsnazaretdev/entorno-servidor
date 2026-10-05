<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 5 - Código Embebido (PHP)</title>
</head>
<body>

    <?php
        $titulo = "Dune";
        $precioBase = 10.00;
        $precioConIVA = $precioBase * 1.21;
        $precioFormateado = number_format($precioConIVA, 2, ',', '.');
    ?>

    
    <p>El libro <strong><?php echo $titulo; ?></strong> cuesta <strong><?php echo $precioFormateado; ?> €</strong> con IVA.</p>

</body>
</html>