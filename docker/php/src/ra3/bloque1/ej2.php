<?php
// Datos de prueba
$usuarioActivo = [
    "nombre" => "Ana",
    "activo" => true
];
$usuarioInactivo = [
    "nombre" => "Luis",
    "activo" => false
];
$sinUsuario = null;

$libroDisponible = [
    "titulo" => "El Quijote de la Mancha",
    "disponible" => true
];

$libroAgotado = [
    "titulo" => "La sombra del viento",
    "disponible" => false
];

function puedePrestarse($usuarios, $libros)
{
    // 1. No hay usuario
    if ($usuarios == null) {
        return "No se puede: no hay usuario.";
    }

    // 2. No está activo
    if (!$usuarios["activo"]) {
        return "No se puede: el usuario no está activo.";
    }

    // 3. No está disponible
    if (!$libros["disponible"]) {
        return "No se puede: el libro no está disponible.";
    }

    // Si no pasa nada de lo anterior, se puede prestar
    return "Préstamo aceptado.";
}


?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Ejercicio 2 - Salidas tempranas</title>
</head>

<body>
    <h1>¿Se puede prestar?</h1>
    <p>Sin usuario: <?php echo puedePrestarse($sinUsuario, $libroDisponible); ?></p>
    <p>Usuario inactivo: <?php echo puedePrestarse($usuarioInactivo, $libroDisponible); ?></p>
    <p>Libro agotado: <?php echo puedePrestarse($usuarioActivo, $libroAgotado); ?></p>
    <p>Todo correcto: <?php echo puedePrestarse($usuarioActivo, $libroDisponible); ?></p>
</body>

</html>