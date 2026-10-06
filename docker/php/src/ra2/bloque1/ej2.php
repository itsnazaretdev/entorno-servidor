<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 2 - PHP</title>
</head>
<body>

    <h2>Texto en HTML puro</h2>
    <p>Este párrafo es HTML fijo en la web.</p>

    <?php
        //Crear variable
        $mensaje = "Este mensaje se procesó en el servidor PHP.";
        //Pasar variable
        echo "<p><strong>$mensaje</strong></p>";
    ?>
   
    <p>Volvemos a estar en HTML fijo.</p>

    <?php if (true): ?>
        <p>Entramos a PHP solo para evaluar un condicional e imprimir este bloque HTML.</p>
    <?php endif; ?>

</body>
</html>