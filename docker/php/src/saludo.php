<!-- saludo.php -->
<?php
$nombre = "Nazaret";
?>
<!doctype html>
<html>
  <body>
    <h1>Bienvenido</h1>
    <p>Son las <?= date("H:i") ?></p>
    <p>hola</p>

    <?php for ($i = 0; $i < 3; $i++): ?>
       <p><?php echo $nombre; ?></p>
    <?php endfor; ?>
  </body>
</html>