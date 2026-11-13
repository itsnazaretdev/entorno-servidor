<?php
// EJERCICIO 8 - Panel de gestión, solo para admin
session_start();
include "ej8_guardian_admin.php";

$libros = [
    ["titulo" => "El Hobbit", "autor" => "J.R.R. Tolkien", "precioBase" => 15.00, "disponible" => true],
    ["titulo" => "1984", "autor" => "George Orwell", "precioBase" => 10.00, "disponible" => false],
    ["titulo" => "Dune", "autor" => "Frank Herbert", "precioBase" => 20.00, "disponible" => true]
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 8 - Panel de gestión</title>
</head>
<body>
    <h1>Panel de gestión de libros</h1>
    <p>Hola, <?php echo $_SESSION["usuario"]; ?> (admin)</p>

    <ul>
        <?php for ($i = 0; $i < count($libros); $i++) { ?>
            <li>
                <?php echo $libros[$i]["titulo"]; ?> -
                <?php echo $libros[$i]["precioBase"]; ?> €
            </li>
        <?php } ?>
    </ul>

    <a href="ej5_login.php">Volver</a>
</body>
</html>