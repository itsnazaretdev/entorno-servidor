<?php
require_once "Libro.php";


// Antes teníamos el array, ahora creamos un objeto libro con la clase Libro
$libros = [
    new Libro("El Hobbit", "J.R.R. Tolkien", 15.00, true, "Fantasía"),
    new Libro("1984", "George Orwell", 10.00, false, "Ficción distópica"),
    new Libro("Dune", "Frank Herbert", 20.00, true, "Ciencia ficción")
];
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 2 - Clase Libro</title>
</head>
<body>
    <h1>Catálogo</h1>

    <?php for ($i = 0; $i < count($libros); $i++) { ?>
        <div>
            <!-- Antes: $libros[$i]["titulo"]   Ahora: $libros[$i]->titulo -->
            <h2><?php echo $libros[$i]->titulo; ?></h2>
            <p>Autor: <?php echo $libros[$i]->autor; ?></p>

            <!-- El cálculo del IVA ya no está aquí: se lo pedimos al propio libro -->
            <p>Precio con IVA: <?php echo $libros[$i]->precioConIva(); ?> €</p>

            <?php if ($libros[$i]->estaDisponible()) { ?>
                <p>Disponible</p>
            <?php } else { ?>
                <p>Agotado</p>
            <?php } ?>
        </div>
    <?php } ?>
</body>
</html>