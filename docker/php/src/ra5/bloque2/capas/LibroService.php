<?php

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