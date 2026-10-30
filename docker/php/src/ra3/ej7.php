<?php
// EJERCICIO 7 - Recoger el dato con GET
// Lo que se escribe en el formulario llega en la URL: ej7.php?busqueda=quijote

$busqueda = "";
if (isset($_GET["busqueda"])) {
    $busqueda = $_GET["busqueda"];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 7 - Recoger el dato</title>
</head>
<body>
    <h1>Buscar libros</h1>

    <form action="ej7.php" method="get">
        <label for="busqueda">Título:</label>
        <input type="text" id="busqueda" name="busqueda" value="<?php echo htmlspecialchars($busqueda); ?>">
        <button type="submit">Buscar</button>
    </form>

    <?php if ($busqueda != "") { ?>
        <p>Resultados para: <?php echo htmlspecialchars($busqueda); ?></p>
    <?php } ?>
</body>
</html>