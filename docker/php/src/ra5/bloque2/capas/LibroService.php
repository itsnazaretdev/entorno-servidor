<?php
// EJERCICIO 4 - SERVICIO: aquí vive la lógica de negocio (reglas, filtros, cálculos).
// No sabe dónde están los libros: se los pide al Repository.
// No sabe nada de HTML ni de $_GET.

require_once "LibroRepository.php";

class LibroService
{
    private LibroRepository $repositorio;
    private int $librosPorPagina;

    // El servicio recibe el repositorio y la configuración que necesita
    public function __construct(LibroRepository $repositorio, int $librosPorPagina)
    {
        $this->repositorio = $repositorio;
        $this->librosPorPagina = $librosPorPagina;
    }

    // Regla de búsqueda: el título contiene lo buscado y, si se ha elegido
    // un género, el libro es de ese género. Devuelve como máximo
    // los libros por página que diga la configuración.
    public function filtrar(string $busqueda, string $genero): array
    {
        $todos = $this->repositorio->obtenerTodos();
        $resultados = [];

        for ($i = 0; $i < count($todos); $i++) {
            $libro = $todos[$i];

            $coincideTitulo = str_contains(mb_strtolower($libro->titulo), mb_strtolower($busqueda));

            $coincideGenero = false;
            if ($genero == "") {
                $coincideGenero = true;
            } else if ($libro->genero == $genero) {
                $coincideGenero = true;
            }

            if ($coincideTitulo && $coincideGenero && count($resultados) < $this->librosPorPagina) {
                $resultados[] = $libro;
            }
        }

        return $resultados;
    }

    // Cálculo: cuántos de estos libros están disponibles
    public function contarDisponibles(array $libros): int
    {
        $disponibles = 0;

        for ($i = 0; $i < count($libros); $i++) {
            if ($libros[$i]->estaDisponible()) {
                $disponibles = $disponibles + 1;
            }
        }

        return $disponibles;
    }

    // Lista de géneros sin repetir, para construir el <select> (ejercicio 6)
    public function obtenerGeneros(): array
    {
        $todos = $this->repositorio->obtenerTodos();
        $generos = [];

        for ($i = 0; $i < count($todos); $i++) {
            if (!in_array($todos[$i]->genero, $generos)) {
                $generos[] = $todos[$i]->genero;
            }
        }

        return $generos;
    }
}