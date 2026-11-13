export class LibroService {
  // El servicio recibe el repositorio y la configuración que necesita
  constructor(repositorio, librosPorPagina) {
    this.repositorio = repositorio;
    this.librosPorPagina = librosPorPagina;
  }

  filtrar(busqueda, genero) {
    const todos = this.repositorio.obtenerTodos();
    let resultados = [];

    for (let i = 0; i < todos.length; i++) {
      const libro = todos[i];

      const coincideTitulo = libro.titulo.toLowerCase().includes(busqueda.toLowerCase());

      let coincideGenero = false;
      if (genero === "") {
        coincideGenero = true;
      } else if (libro.genero === genero) {
        coincideGenero = true;
      }

      if (coincideTitulo && coincideGenero && resultados.length < this.librosPorPagina) {
        resultados.push(libro);
      }
    }

    return resultados;
  }

  // Cálculo: cuántos de estos libros están disponibles
  contarDisponibles(libros) {
    let disponibles = 0;

    for (let i = 0; i < libros.length; i++) {
      if (libros[i].estaDisponible()) {
        disponibles = disponibles + 1;
      }
    }

    return disponibles;
  }

  // Lista de géneros sin repetir, para construir el <select> (ejercicio 6)
  obtenerGeneros() {
    const todos = this.repositorio.obtenerTodos();
    let generos = [];

    for (let i = 0; i < todos.length; i++) {
      if (!generos.includes(todos[i].genero)) {
        generos.push(todos[i].genero);
      }
    }

    return generos;
  }
}
