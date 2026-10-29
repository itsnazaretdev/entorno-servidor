<?php
$libro = [
    "titulo" => "El Quijote de la Mancha",
    "autor" => "Miguel de Cervantes",
    "anio" => 1605,
    "paginas" => 863,
    "disponible" => true,
    "precio" => 15,
    "oferta" => true
];

if ($libro["disponible"]) {
    $estado = "Disponible";
} else if ($libro["oferta"]) {
    $estado = "¡En oferta!";
} else {
    $estado = "Agotado";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 1 - Estado del libro</title>
</head>
<body>
    <h1><?php echo $libro["titulo"]; ?></h1>
    <p>Estado: <?php echo $estado; ?></p>
</body>
</html>