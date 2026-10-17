<?php
//declare(strict_types=1); // 1. Obligatoriamente en la primera línea

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

function sumStrict(int $a, int $b): int
{
    return $a + $b;
}

// Al estar el declare(strict_types=1) arriba, esto lanzará un TypeError y se verá claramente en pantalla gracias al ini_set
$resultStrict = sumStrict("5", 3);
echo "Resultado: " . $resultStrict;
?>