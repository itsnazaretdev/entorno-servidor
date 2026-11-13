process.loadEnvFile(new URL("../../../../.env", import.meta.url));

export const config = {
  nombre: process.env.APP_NOMBRE,
  librosPorPagina: Number(process.env.LIBROS_POR_PAGINA),
  entorno: process.env.NODE_ENV
};
