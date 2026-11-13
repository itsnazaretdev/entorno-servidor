<?php
// EJERCICIO 6 - Cerrar sesión
session_start();

// Destruimos la sesión: se borra el usuario guardado
session_destroy();

// Volvemos al login, que ahora mostrará el formulario otra vez
header("Location: ej5_login.php");
exit;