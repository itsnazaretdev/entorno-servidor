<?php
// EJERCICIO 5 - Login básico (con rol para el ejercicio 8)
session_start();

// Usuarios en memoria: cada uno tiene un rol
$usuarios = [
    ["nombre" => "ana", "contrasena" => "1234", "rol" => "usuario"],
    ["nombre" => "luis", "contrasena" => "5678", "rol" => "admin"]
];

$mensaje = "";

// Si se ha enviado el formulario, comprobamos los datos
if (isset($_POST["nombre"])) {
    $nombre = $_POST["nombre"];
    $contrasena = $_POST["contrasena"];

    for ($i = 0; $i < count($usuarios); $i++) {
        if ($usuarios[$i]["nombre"] == $nombre && $usuarios[$i]["contrasena"] == $contrasena) {
            // Correcto: guardamos el usuario y su rol en la sesión
            $_SESSION["usuario"] = $nombre;
            $_SESSION["rol"] = $usuarios[$i]["rol"];
        }
    }

    if (!isset($_SESSION["usuario"])) {
        $mensaje = "Usuario o contraseña incorrectos.";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 5 - Login</title>
</head>
<body>
    <?php if (isset($_SESSION["usuario"])) { ?>
        <h1>Hola, <?php echo $_SESSION["usuario"]; ?></h1>
        <p>Rol: <?php echo $_SESSION["rol"]; ?></p>
        <a href="ej6_logout.php">Cerrar sesión</a>
        <a href="ej7_bolsa.php">Mi bolsa</a>
        <a href="ej8_panel.php">Panel de gestión</a>
    <?php } else { ?>
        <h1>Iniciar sesión</h1>
        <p><?php echo $mensaje; ?></p>

        <form action="ej5_login.php" method="post">
            <input type="text" name="nombre" placeholder="Usuario">
            <input type="password" name="contrasena" placeholder="Contraseña">
            <button type="submit">Entrar</button>
        </form>
    <?php } ?>
</body>
</html>