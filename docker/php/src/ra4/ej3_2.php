<?php
// EJERCICIO 3 - Página 2 con sesión
// session_start() siempre al principio, antes de cualquier HTML
session_start();

// Si el contador todavía no existe en la sesión, lo creamos a 0
if (!isset($_SESSION["visitas"])) {
    $_SESSION["visitas"] = 0;
}

// Sumamos 1 visita
$_SESSION["visitas"] = $_SESSION["visitas"] + 1;
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 3 - Página 2</title>
</head>
<body>
    <h1>Página 2</h1>
    <p>Visitas totales: <?php echo $_SESSION["visitas"]; ?></p>
    <a href="ej3_2.php">Ir a la página 1</a>
</body>
</html>