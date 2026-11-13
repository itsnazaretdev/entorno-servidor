<?php
// EJERCICIO 2 - Guardar la última búsqueda en una cookie

// Si llega una búsqueda, la guardamos en una cookie durante 1 hora
// setcookie tiene que ir antes de cualquier HTML
if (isset($_GET["busqueda"])) {
    setcookie("ultimaBusqueda", $_GET["busqueda"], time() + 3600);
}

// Leemos la cookie (el navegador la envía en cada petición)
$ultimaBusqueda = "";
if (isset($_COOKIE["ultimaBusqueda"])) {
    $ultimaBusqueda = $_COOKIE["ultimaBusqueda"];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 2 - Cookie y localStorage</title>
</head>
<body>
    <h1>Buscar libros</h1>

    <form action="ej2.php" method="get">
        <label for="busqueda">Título:</label>
        <input type="text" id="busqueda" name="busqueda">
        <button type="submit">Buscar</button>
    </form>

    <h2>Con cookie (la lee PHP, en el servidor)</h2>
    <?php if ($ultimaBusqueda != "") { ?>
        <p>Tu última búsqueda: <?php echo htmlspecialchars($ultimaBusqueda); ?></p>
    <?php } else { ?>
        <p>Todavía no has buscado nada.</p>
    <?php } ?>

    <h2>Con localStorage (lo lee JavaScript, en el navegador)</h2>
    <p id="mensaje"></p>

    <script>
        // Miramos si en la URL viene una búsqueda (?busqueda=...)
        const parametros = new URLSearchParams(window.location.search);
        const busqueda = parametros.get("busqueda");

        // Si viene, la guardamos en localStorage
        if (busqueda !== null) {
            localStorage.setItem("ultimaBusqueda", busqueda);
        }

        // Leemos lo que haya guardado
        const guardada = localStorage.getItem("ultimaBusqueda");
        const mensaje = document.getElementById("mensaje");

        if (guardada !== null) {
            mensaje.textContent = "Tu última búsqueda: " + guardada;
        } else {
            mensaje.textContent = "Todavía no has buscado nada.";
        }
    </script>
</body>
</html>