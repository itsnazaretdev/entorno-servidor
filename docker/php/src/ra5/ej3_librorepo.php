<?php
require_once "LibroRepository.php";

// Creamos el repositorio: es quien tiene los libros
$repositorio = new LibroRepository();

// Recoger la búsqueda
$busqueda = "";
if (isset($_GET["busqueda"])) {
    $busqueda = $_GET["busqueda"];
}

// Ya no recorremos ningún array aquí: se lo pedimos al repositorio
$resultados = $repositorio->buscarPorTitulo($busqueda);
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 3 - Repository</title>
</head>
<body>
    <h1>Catálogo</h1>

    <form action="ej3.php" method="get">
        <label for="busqueda">Título:</label>
        <input type="text" id="busqueda" name="busqueda" value="<?php echo htmlspecialchars($busqueda); ?>">
        <button type="submit">Buscar</button>
    </form>

    <?php if ($busqueda != "") { ?>
        <p>Resultados para: <?php echo htmlspecialchars($busqueda); ?></p>
    <?php } ?>

    <?php if (count($resultados) == 0) { ?>
        <p>No se encontraron libros.</p>
    <?php } else { ?>
        <?php for ($i = 0; $i < count($resultados); $i++) { ?>
            <div>
                <h2><?php echo $resultados[$i]->titulo; ?></h2>
                <p>Autor: <?php echo $resultados[$i]->autor; ?></p>
                <p>Precio con IVA: <?php echo $resultados[$i]->precioConIva(); ?> €</p>

                <?php if ($resultados[$i]->estaDisponible()) { ?>
                    <p>Disponible</p>
                <?php } else { ?>
                    <p>Agotado</p>
                <?php } ?>
            </div>
        <?php } ?>
    <?php } ?>
</body>
</html>