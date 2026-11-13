<?php
// EJERCICIO 4 - La bolsa: muestra los libros apartados
session_start();

if (!isset($_SESSION["bolsa"])) {
    $_SESSION["bolsa"] = [];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 4 - Mi bolsa</title>
</head>
<body>
    <?php include "ej4_menu.php"; ?>

    <h1>Mi bolsa de préstamos</h1>

    <?php if (count($_SESSION["bolsa"]) == 0) { ?>
        <p>Tu bolsa está vacía.</p>
    <?php } else { ?>
        <ul>
            <?php for ($i = 0; $i < count($_SESSION["bolsa"]); $i++) { ?>
                <li><?php echo $_SESSION["bolsa"][$i]; ?></li>
            <?php } ?>
        </ul>
    <?php } ?>
</body>
</html>