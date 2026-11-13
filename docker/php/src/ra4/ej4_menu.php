<?php
// EJERCICIO 4 - Menú que se incluye en todas las páginas
// Muestra cuántos libros hay en la bolsa
$totalBolsa = 0;
if (isset($_SESSION["bolsa"])) {
    $totalBolsa = count($_SESSION["bolsa"]);
}
?>
<nav>
    <a href="ej4_catalogo.php">Catálogo</a> |
    <a href="ej4_bolsa.php">Mi bolsa (<?php echo $totalBolsa; ?>)</a>
</nav>
<hr>