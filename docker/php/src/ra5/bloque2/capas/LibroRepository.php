<?php

require_once "Libro.php";

class LibroRepository
{
    /** @var Libro[] */
    private array $libros;

    public function __construct()
    {
        $this->libros = [
            new Libro("El Hobbit", "J.R.R. Tolkien", 15.00, true, "Fantasía"),
            new Libro("1984", "George Orwell", 10.00, false, "Distopía"),
            new Libro("Dune", "Frank Herbert", 20.00, true, "Ciencia ficción")
        ];
    }

    // Devuelve todos los libros
    public function obtenerTodos(): array
    {
        return $this->libros;
    }
}