<?php
// EJERCICIO 6 - Formulario de búsqueda
// Al enviarlo, los datos van a ej7.php por GET
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 6 - Buscar</title>
</head>
<body>
    <h1>Buscar libros</h1>

    <form action="ej7.php" method="get">
        <label for="busqueda">Título:</label>
        <input type="text" id="busqueda" name="busqueda">
        <button type="submit">Buscar</button>
    </form>
</body>
</html>