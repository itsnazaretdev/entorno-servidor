<?php
// EJERCICIO 7 - Mi bolsa, protegida por el guardián
session_start();
include "ej7_guardian.php";

if (!isset($_SESSION["bolsa"])) {
    $_SESSION["bolsa"] = [];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 7 - Mi bolsa</title>
</head>
<body>
    <h1>Mi bolsa de préstamos</h1>
    <p>Hola, <?php echo $_SESSION["usuario"]; ?></p>

    <?php if (count($_SESSION["bolsa"]) == 0) { ?>
        <p>Tu bolsa está vacía.</p>
    <?php } else { ?>
        <ul>
            <?php for ($i = 0; $i < count($_SESSION["bolsa"]); $i++) { ?>
                <li><?php echo $_SESSION["bolsa"][$i]; ?></li>
            <?php } ?>
        </ul>
    <?php } ?>

    <a href="ej5_login.php">Volver</a>
</body>
</html>