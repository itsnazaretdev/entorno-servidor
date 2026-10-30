# Catálogo de productos — Node.js + EJS + PostgreSQL + Docker

Aplicación web renderizada en servidor con Express y EJS. Incluye catálogo público, login de administrador y operaciones CRUD protegidas.

## Requisitos
- Docker y Docker Compose

## Arranque
1. Copia las variables de entorno:
   ```bash
   cp .env.example .env
   ```
2. Edita `.env`. Cambia obligatoriamente `SESSION_SECRET` y `ADMIN_PASSWORD` por valores seguros. La contraseña de administrador debe tener al menos 12 caracteres.
3. Levanta los servicios:
   ```bash
   docker compose up --build -d
   ```
4. Abre http://localhost:3000

El usuario administrador se crea automáticamente en el primer arranque si no existe. Sus datos proceden de `ADMIN_NAME`, `ADMIN_EMAIL` y `ADMIN_PASSWORD` del archivo `.env`.
Si el catálogo está vacío, el primer arranque también añade cuatro productos de ejemplo. No se vuelven a insertar si ya hay productos.

## Uso
- `GET /productos`: catálogo público.
- `GET /api`: catálogo de productos en formato JSON.
- `GET /login`: formulario de acceso.
- `POST /login`: autenticación.
- `POST /logout`: cerrar sesión.
- Las rutas para crear, editar y borrar productos requieren sesión de administrador.

Los productos usan UUID como clave primaria, generado en PostgreSQL mediante `gen_random_uuid()`. El precio se guarda como `NUMERIC(12,2)`.

## Comandos útiles
```bash
docker compose logs -f app
docker compose logs -f db
docker compose down
docker compose down -v   # elimina también los datos de PostgreSQL
```

## Estructura
```text
src/
  db.js
  seed.js
  server.js
  controllers/
    authController.js
    productsController.js
    README.md
  models/
    productModel.js
    userModel.js
    README.md
  middleware/auth.js
  routes/
    api.js
    auth.js
    products.js
    README.md
views/
  login.ejs
  products/
  partials/
public/styles.css
db/init.sql
```

## Notas de seguridad antes de producción
Este proyecto es una base funcional para desarrollo. Antes de exponerlo públicamente, añade protección CSRF en formularios, limitación de intentos de login, cabeceras CSP ajustadas, HTTPS detrás de un proxy configurado y una política de copias de seguridad. Usa secretos únicos y no subas `.env` al repositorio. Para cambios en el esquema, incorpora migraciones versionadas.
