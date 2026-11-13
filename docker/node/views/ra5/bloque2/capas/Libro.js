export class Libro {
  constructor(titulo, autor, precio, disponible, genero) {
    this.titulo = titulo;
    this.autor = autor;
    this.precio = precio;
    this.disponible = disponible;
    this.genero = genero;
  }

  // Devuelve el precio con el 4 % de IVA, con 2 decimales
  precioConIva() {
    const total = this.precio + (this.precio * 0.04);
    return total.toFixed(2);
  }

  // Devuelve true si el libro está disponible
  estaDisponible() {
    return this.disponible;
  }
}
