<?php
// Sin directiva: PHP convierte los tipos en silencio (coerción)

function sum(int $a, int $b): int {
    return $a + $b;
}

echo "Resultado: " . sum("5", 3) . PHP_EOL;
