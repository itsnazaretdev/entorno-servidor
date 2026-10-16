<?php
declare(strict_types=1);
// EJERCICIO 10 - Versión CON la directiva strict_types
// La línea declare tiene que ir justo después de <?php

// Es la misma función que en el otro archivo
function sumStrict(int $a, int $b): int
{
    return $a + $b;
}

// Le pasamos "5" como texto (string), igual que antes
$resultStrict = sumStrict("5", 3);

echo "Resultado: " . $resultStrict;
echo "\n";

// EJERCICIO 10 - Versión SIN la directiva strict_types

// Función que suma dos números enteros
function sumSinStrict(int $a, int $b): int
{
    return $a + $b;
}

// Le pasamos "5" como texto (string), no como número
$result = sumSinStrict("5", 3);

echo "Resultado: " . $result;
echo "\n";
<?php>