<?php

class Libro
{
    public string $titulo;
    public string $autor;
    public float $precio;
    public bool $disponible;
    public string $genero;

    public function __construct(string $titulo, string $autor, float $precio, bool $disponible, string $genero)
    {
        $this->titulo = $titulo;
        $this->autor = $autor;
        $this->precio = $precio;
        $this->disponible = $disponible;
        $this->genero = $genero;
    }

    // Devuelve el precio con el 4 % de IVA, redondeado a 2 decimales
    public function precioConIva(): float
    {
        $total = $this->precio + ($this->precio * 0.04);
        return round($total, 2);
    }

    // Devuelve true si el libro está disponible
    public function estaDisponible(): bool
    {
        return $this->disponible;
    }
}