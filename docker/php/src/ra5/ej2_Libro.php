<?php

class Libro
{
    public string $titulo;
    public string $autor;
    public float $precio;
    public bool $disponible;


    public function __construct(string $titulo, string $autor, float $precio, bool $disponible)
    {
        $this->titulo = $titulo;
        $this->autor = $autor;
        $this->precio = $precio;
        $this->disponible = $disponible;
    }

    // Método: devuelve el precio con el 4 % de IVA, redondeado a 2 decimales
    public function precioConIva()
    {
        $total = $this->precio + ($this->precio * 0.04);
        return round($total, 2);
    }

    // Método: devuelve true si el libro está disponible
    public function estaDisponible()
    {
        return $this->disponible;
    }
}