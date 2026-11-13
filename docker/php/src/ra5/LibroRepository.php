<?php
// EJERCICIO 3 - LibroRepository
// Es la única clase que sabe dónde están guardados los libros.
// El resto del código le PIDE los libros, nunca toca el array.

require_once "Libro.php";

class LibroRepository
{
    // private: desde fuera de esta clase NO se puede usar $libros
    private array $libros;

    public function __construct()
    {
        $this->libros = [
            new Libro("El Hobbit", "J.R.R. Tolkien", 15.00, true),
            new Libro("1984", "George Orwell", 10.00, false),
            new Libro("Dune", "Frank Herbert", 20.00, true)
        ];
    }

    // Devuelve todos los libros
    public function obtenerTodos()
    {
        return $this->libros;
    }

    // Devuelve los libros cuyo título contiene el término buscado
    public function buscarPorTitulo(string $termino)
    {
        $resultados = [];

        for ($i = 0; $i < count($this->libros); $i++) {
            $titulo = mb_strtolower($this->libros[$i]->titulo);

            if (str_contains($titulo, mb_strtolower($termino))) {
                $resultados[] = $this->libros[$i];
            }
        }

        return $resultados;
    }
}
