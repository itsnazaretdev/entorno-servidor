<?php
// Modificamos el comportamiento por defecto de PHP:
// 1. Forzamos tipado estricto
declare(strict_types=1);

// 2. Forzamos que los errores se muestren por pantalla (útil en desarrollo)
ini_set('display_errors', '1');
error_reporting(E_ALL);

function sumar(int $a, int $b): int {
    return $a + $b;
}

// Probamos pasar un string numérico
echo sumar(5, "10"); 
?>