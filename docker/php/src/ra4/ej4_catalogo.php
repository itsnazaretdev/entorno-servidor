<?php
// EJERCICIO 4 - Catálogo: aquí el usuario aparta libros
session_start();

$libros = [
    ["titulo" => "El Hobbit", "autor" => "J.R.R. Tolkien", "precioBase" => 15.00, "disponible" => true, "oferta" => true, "genero" => "Fantasía"],
    ["titulo" => "1984", "autor" => "George Orwell", "precioBase" => 10.00, "disponible" => false, "oferta" => true, "genero" => "Distopía"],
    ["titulo" => "Dune", "autor" => "Frank Herbert", "precioBase" => 20.00, "disponible" => true, "oferta" => false, "genero" => "Ciencia ficción"]
];

// Si la bolsa no existe todavía, la creamos vacía
if (!isset($_SESSION["bolsa"])) {
    $_SESSION["bolsa"] = [];
}

// Si se ha pulsado "Apartar", añadimos el libro a la bolsa
$mensaje = "";
if (isset($_POST["titulo"])) {
    $titulo = $_POST["titulo"];

    // Solo lo añadimos si no estaba ya
    if (in_array($titulo, $_SESSION["bolsa"])) {
        $mensaje = "Ese libro ya está en tu bolsa.";
    } else {
        $_SESSION["bolsa"][] = $titulo;
        $mensaje = "Has apartado: " . $titulo;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 4 - Catálogo</title>
</head>
<body>
    <?php include "ej4_menu.php"; ?>

    <h1>Catálogo</h1>

    <?php if ($mensaje != "") { ?>
        <p><?php echo $mensaje; ?></p>
    <?php } ?>

    <?php for ($i = 0; $i < count($libros); $i++) { ?>
        <div>
            <h2><?php echo $libros[$i]["titulo"]; ?></h2>
            <p>Autor: <?php echo $libros[$i]["autor"]; ?></p>
            <form action="ej4_catalogo.php" method="post">
                <input type="hidden" name="titulo" value="<?php echo $libros[$i]["titulo"]; ?>">
                <button type="submit">Apartar</button>
            </form>
        </div>
    <?php } ?>
</body>
</html>