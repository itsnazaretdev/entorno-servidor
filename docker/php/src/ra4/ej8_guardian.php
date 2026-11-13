<?php
// EJERCICIO 8 - Guardián solo para administradores

// 1. Si no has iniciado sesión, al login
if (!isset($_SESSION["usuario"])) {
    header("Location: ej5_login.php");
    exit;
}

// 2. Si has iniciado sesión pero no eres admin, no puedes pasar
if ($_SESSION["rol"] != "admin") {
    echo "<p>No tienes permiso para ver esta página.</p>";
    echo "<a href='ej5_login.php'>Volver</a>";
    exit;
}