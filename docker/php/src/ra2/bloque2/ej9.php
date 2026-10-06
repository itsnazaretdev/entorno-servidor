<?php
// Variable en ámbito GLOBAL
$tasaIVA = 0.21;

// Función para calcular el precio con IVA
function calcularPrecioConIVA($precioBase) {
    // $resultadoLocal es una variable LOCAL a esta función
    $resultadoLocal = $precioBase * 1.21;
    return $resultadoLocal;
}

// Calculamos el precio llamando a la función
$precioFinal = calcularPrecioConIVA(100);

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ejercicio 9 — Scope en PHP</title>
</head>
<body>
    <h1>Ejercicio 9 — Ámbito de Variables en PHP</h1>
    
    <p>Precio calculado correctamente: <?php echo $precioFinal; ?> €</p>

    <h2>Probando el error de ámbito:</h2>
    <p>
        Variable local fuera de contexto: 
        <?php echo $resultadoLocal; ?> 
        <!-- Produce: Warning: Undefined variable $resultadoLocal -->
    </p>

    <div style="background-color: #f8d7da; padding: 10px; border-radius: 5px;">
        <strong>Explicación del fallo en PHP:</strong><br>
        La variable <code>$resultadoLocal</code> fue declarada dentro de la función <code>calcularPrecioConIVA()</code>. Su ciclo de vida empieza y termina únicamente en la ejecución de esa función. Al intentar usarla fuera (en el ámbito global), el motor de PHP indica que la variable no está definida.
    </div>
</body>
</html>