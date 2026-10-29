<?php
$libros = [
    ["titulo" => "El Hobbit", "autor" => "J.R.R. Tolkien", "precioBase" => 15.00, "disponible" => true, "oferta" => true],
    ["titulo" => "1984", "autor" => "George Orwell", "precioBase" => 10.00, "disponible" => false, "oferta" => true],
    ["titulo" => "Dune", "autor" => "Frank Herbert", "precioBase" => 20.00, "disponible" => true, "oferta" => false]
];

// Esta función recibe un libro que vendrá del html cuando mencionemos $libros[$i] y devuelve el precio con IVA del 2%.
function precioConIva($libro) {
    $iva = 0.02;
    $total = $libro["precioBase"] + ($libro["precioBase"] * $iva);
    return $total;
}

// Esta función va a recibir otro libro y devolverá agotado, en oferta o disponible.
function estadoLibro($libro) {
    if ($libro["disponible"]) {
        return "Disponible";
    } else if ($libro["oferta"]) {
        return "En oferta";
    } else {
        return "Agotado";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>Catálogo</h1>

    <?php for ($i = 0; $i < count($libros); $i++) { ?>
        <div>
            <h2><?php echo $libros[$i]["titulo"]; ?></h2>
            <p>Autor: <?php echo $libros[$i]["autor"]; ?></p>
            <p>Precio con IVA: <?php echo precioConIva($libros[$i]); ?> €</p>
            <p>Estado: <?php echo estadoLibro($libros[$i]); ?></p>
        </div>
    <?php } ?>
</body>

</html>