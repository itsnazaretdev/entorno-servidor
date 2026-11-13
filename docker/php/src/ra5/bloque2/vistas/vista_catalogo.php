<?php
// EJERCICIO 6 - VISTA: solo muestra.

/** @var string $nombreApp */
/** @var string $busqueda */
/** @var string $genero */
/** @var array $generos */
/** @var Libro[] $resultados */
/** @var int $disponibles */
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title><?php echo $nombreApp; ?></title>
</head>

<body>
    <h1><?php echo $nombreApp; ?></h1>

    <form action="catalogo.php" method="get">
        <label for="busqueda">Título:</label>
        <input type="text" id="busqueda" name="busqueda" value="<?php echo htmlspecialchars($busqueda); ?>">

        <?php // El select se construye desde la lista $generos, no está escrito a mano 
        ?>
        <label for="genero">Género:</label>
        <select id="genero" name="genero">
            <option value="">Todos</option>
            <?php for ($i = 0; $i < count($generos); $i++) { ?>
                <option value="<?php echo $generos[$i]; ?>" <?php if ($generos[$i] == $genero) {
                                                                echo "selected";
                                                            } ?>>
                    <?php echo $generos[$i]; ?>
                </option>
            <?php } ?>
        </select>

        <button type="submit">Buscar</button>
    </form>

    <?php if (count($resultados) == 0) { ?>
        <p>No se encontraron libros.</p>
    <?php } else { ?>
        <p><?php echo $disponibles; ?> de <?php echo count($resultados); ?> disponibles</p>

        <?php for ($i = 0; $i < count($resultados); $i++) { ?>
            <div>
                <h2><?php echo $resultados[$i]->titulo; ?></h2>
                <p>Autor: <?php echo $resultados[$i]->autor; ?></p>
                <p>Género: <?php echo $resultados[$i]->genero; ?></p>
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