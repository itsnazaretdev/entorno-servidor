<?php
  // Datos del catalogo, escritos a mano (aun sin base de datos)
  $p1Nombre = "Teclado mecanico"; $p1Precio = 79.90; $p1Stock = true;
  $p2Nombre = "Raton inalambrico"; $p2Precio = 25.00; $p2Stock = true;
  $p3Nombre = "Alfombrilla XL";    $p3Precio = 12.50; $p3Stock = false;
?>

<!doctype html>
<html>
  <body>
    <h1>Catalogo</h1>

    <!-- Producto 1 -->
    <div class="producto">
      <h2><?= $p1Nombre ?></h2>
      <p>Precio con IVA: <?= $p1Precio * 1.21 ?> €</p>
      <p><?= $p1Stock ? "Disponible" : "Agotado" ?></p>
    </div>

    <!-- Producto 2 (mismo bloque, otros datos) -->
    <div class="producto">
      <h2><?= $p2Nombre ?></h2>
      <p>Precio con IVA: <?= $p2Precio * 1.21 ?> €</p>
      <p><?= $p2Stock ? "Disponible" : "Agotado" ?></p>
    </div>

    <!-- Producto 3 (otra vez el mismo bloque) -->
    <div class="producto">
      <h2><?= $p3Nombre ?></h2>
      <p>Precio con IVA: <?= $p3Precio * 1.21 ?> €</p>
      <p><?= $p3Stock ? "Disponible" : "Agotado" ?></p>
    </div>
  </body>
</html>