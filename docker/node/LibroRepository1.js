// EJERCICIO 3 - LibroRepository
// Es la única clase que sabe dónde están guardados los libros.
// El resto del código le PIDE los libros, nunca toca el array.

import { Libro } from "./Libro.js";

export class LibroRepository1 {
  constructor() {
    this.libros = [
      new Libro("El Hobbit", "J.R.R. Tolkien", 15.00, true),
      new Libro("1984", "George Orwell", 10.00, false),
      new Libro("Dune", "Frank Herbert", 20.00, true)
    ];
  }

  // Devuelve todos los libros
  obtenerTodos() {
    return this.libros;
  }

  // Devuelve los libros cuyo título contiene el término buscado
  buscarPorTitulo(termino) {
    let resultados = [];

    for (let i = 0; i < this.libros.length; i++) {
      let titulo = this.libros[i].titulo.toLowerCase();

      if (titulo.includes(termino.toLowerCase())) {
        resultados.push(this.libros[i]);
      }
    }

    return resultados;
  }
}