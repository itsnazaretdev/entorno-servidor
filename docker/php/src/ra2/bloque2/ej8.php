<?php
// --- SERVIDOR: LÓGICA Y DATOS ---

// Libro 1
$libro1 = ["titulo" => "El Hobbit", "autor" => "J.R.R. Tolkien", "precioBase" => 15.00, "disponible" => true];
$precioIVA1 = number_format($libro1["precioBase"] * 1.21, 2, ',', '.');
$estado1 = $libro1["disponible"] ? "Disponible" : "Agotado";

// Libro 2
$libro2 = ["titulo" => "1984", "autor" => "George Orwell", "precioBase" => 10.00, "disponible" => false];
$precioIVA2 = number_format($libro2["precioBase"] * 1.21, 2, ',', '.');
$estado2 = $libro2["disponible"] ? "Disponible" : "Agotado";

// Libro 3
$libro3 = ["titulo" => "Dune", "autor" => "Frank Herbert", "precioBase" => 20.00, "disponible" => true];
$precioIVA3 = number_format($libro3["precioBase"] * 1.21, 2, ',', '.');
$estado3 = $libro3["disponible"] ? "Disponible" : "Agotado";
?>

<!-- --- SERVIDOR: RENDERING DEL HTML --- -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 8 — Catálogo Manual (PHP)</title>
    <style>
        .ficha {
            border: 1px solid #ccc;
            padding: 12px;
            margin-bottom: 12px;
            border-radius: 6px;
        }
    </style>
</head>
<body>
    <h1>Catálogo de Libros (PHP — Repetición Manual)</h1>

    <!-- Bloque 1 -->
    <div class="ficha">
        <h2><?php echo $libro1["titulo"]; ?></h2>
        <p><strong>Autor:</strong> <?php echo $libro1["autor"]; ?></p>
        <p><strong>Precio (IVA incl.):</strong> <?php echo $precioIVA1; ?> €</p>
        <p><strong>Estado:</strong> <?php echo $estado1; ?></p>
    </div>

    <!-- Bloque 2 (Copiado y pegado a mano) -->
    <div class="ficha">
        <h2><?php echo $libro2["titulo"]; ?></h2>
        <p><strong>Autor:</strong> <?php echo $libro2["autor"]; ?></p>
        <p><strong>Precio (IVA incl.):</strong> <?php echo $precioIVA2; ?> €</p>
        <p><strong>Estado:</strong> <?php echo $estado2; ?></p>
    </div>

    <!-- Bloque 3 (Copiado y pegado a mano) -->
    <div class="ficha">
        <h2><?php echo $libro3["titulo"]; ?></h2>
        <p><strong>Autor:</strong> <?php echo $libro3["autor"]; ?></p>
        <p><strong>Precio (IVA incl.):</strong> <?php echo $precioIVA3; ?> €</p>
        <p><strong>Estado:</strong> <?php echo $estado3; ?></p>
    </div>

    <!-- Anotación del ejercicio -->
    <section style="background-color: #fff3cd; padding: 10px; margin-top: 20px;">
        <h3>Anotación / Reflexión:</h3>
        <p>
            <strong>Inconvenientes observados:</strong><br>
            1. <strong>Mantenimiento pesado:</strong> Si cambia la maquetación HTML, hay que retocar cada bloque individualmente.<br>
            2. <strong>Error humano:</strong> Alto riesgo de equivocarse en el índice o nombre de variable (ej. poner <code>$libro1</code> dentro de la segunda ficha).<br>
            3. <strong>Código no escalable:</strong> Para decenas de libros la cantidad de líneas de código repetidas se vuelve inmanejable.
        </p>
    </section>
</body>
</html>