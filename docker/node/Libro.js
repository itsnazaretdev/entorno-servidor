// EJERCICIO 2 - La entidad Libro
// Una clase es un "molde": define qué datos tiene un libro y qué sabe hacer.

export class Libro {
  // Constructor: se ejecuta al hacer "new Libro(...)" y rellena las propiedades
  constructor(titulo, autor, precio, disponible) {
    this.titulo = titulo;
    this.autor = autor;
    this.precio = precio;
    this.disponible = disponible;
  }

  // Método: devuelve el precio con el 4 % de IVA, con 2 decimales
  precioConIva() {
    const total = this.precio + (this.precio * 0.04);
    return total.toFixed(2);
  }

  // Método: devuelve true si el libro está disponible
  estaDisponible() {
    return this.disponible;
  }
}