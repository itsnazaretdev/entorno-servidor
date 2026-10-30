# Rutas

Esta carpeta declara las URLs y los métodos HTTP disponibles. Cada ruta conecta una petición con su controlador; aquí se aplican los middlewares propios de la ruta, como la autenticación y la validación.

- `auth.js`: login y logout.
- `products.js`: páginas HTML y operaciones CRUD del catálogo.
- `api.js`: `GET /api`, que devuelve los productos en JSON.
