<?php
// EJERCICIO 1 - HTTP no recuerda

// Contador guardado en una variable normal
$contador = 0;

// Le sumamos 1, pensando que "debería" subir cada vez que recargamos
$contador = $contador + 1;
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 1 - Contador sin memoria</title>
</head>
<body>
    <h1>Contador sin memoria</h1>
    <p>Visitas: <?php echo $contador; ?></p>
    <p>Recarga la página: siempre sale 1, porque cada petición empieza de cero.</p>
</body>
</html>