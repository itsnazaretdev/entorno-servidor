<?php
// EJERCICIO 7 - Guardián
// Si no has iniciado sesión, te manda al login
if (!isset($_SESSION["usuario"])) {
    header("Location: ej5_login.php");
    exit;
}