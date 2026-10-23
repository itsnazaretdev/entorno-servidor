# db/

Scripts SQL que PostgreSQL ejecuta automáticamente la primera vez que se crea el contenedor.

## Archivos

| Archivo | Contenido |
|---|---|
| `01-schema.sql` | Creación de tablas |
| `02-seed.sql` | Inserción de los 4 productos de ejemplo |

Se ejecutan en **orden alfabético**, por eso llevan el número delante.

> Solo se ejecutan si el volumen de datos está vacío. Para volver a lanzarlos: `docker compose down -v` y `docker compose up`.

---

## Tablas

### `products`

| Columna | Tipo | Restricciones | Notas |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Lo genera PostgreSQL al insertar |
| `name` | `VARCHAR(100)` | `NOT NULL` | |
| `description` | `TEXT` | | |
| `price` | `NUMERIC(10,2)` | `NOT NULL`, `CHECK (price >= 0)` | `NUMERIC` y no `FLOAT` para no tener errores de redondeo con dinero |
| `stock` | `INTEGER` | `NOT NULL DEFAULT 0`, `CHECK (stock >= 0)` | |
| `image_url` | `VARCHAR(255)` | | Ruta dentro de `public/img` |
| `created_at` | `TIMESTAMP` | `DEFAULT NOW()` | |
| `updated_at` | `TIMESTAMP` | `DEFAULT NOW()` | Se actualiza desde el modelo al editar |

**Sobre el UUID:**
- `gen_random_uuid()` viene incluido en PostgreSQL desde la versión 13, así que con `postgres:16` no hace falta instalar ninguna extensión ni paquete de Node.
- Como el id ya no es un número que sube, el listado se ordena por `created_at` y, si coincide, por `name` (los 4 productos del seed se insertan a la vez y comparten `created_at`).
- En el seed **no** se escribe el id: se deja que Postgres lo genere. Por eso los UUID de los 4 productos serán distintos cada vez que se recree la base de datos.
- La tabla `users` sigue con `SERIAL`, porque su id nunca sale en ninguna URL pública. Si quieres, se puede pasar también a UUID con el mismo sistema.

### `users`

| Columna | Tipo | Restricciones | Notas |
|---|---|---|---|
| `id` | `SERIAL` | `PRIMARY KEY` | |
| `email` | `VARCHAR(255)` | `NOT NULL UNIQUE` | Se guarda en minúsculas |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Hash de bcrypt, **nunca** la contraseña real |
| `role` | `VARCHAR(20)` | `NOT NULL DEFAULT 'admin'`, `CHECK (role IN ('admin','user'))` | Preparado para separar roles más adelante |
| `created_at` | `TIMESTAMP` | `DEFAULT NOW()` | |

### `session`

Tabla que usa `connect-pg-simple` para guardar las sesiones (`sid`, `sess`, `expire`). Está creada en `01-schema.sql`, junto con un índice sobre `expire` para que el borrado de sesiones caducadas sea rápido.

---

## Datos de ejemplo (`02-seed.sql`)

Cuatro productos:

| name | description | price | stock | image_url |
|---|---|---|---|---|
| Teclado mecánico | Teclado compacto 75% con switches marrones | 89.90 | 15 | `/img/teclado.svg` |
| Ratón inalámbrico | Ratón ergonómico con conexión Bluetooth | 34.50 | 30 | `/img/raton.svg` |
| Monitor 27" | Monitor IPS 1440p a 144 Hz | 279.00 | 8 | `/img/monitor.svg` |
| Auriculares | Auriculares over-ear con cancelación de ruido | 129.99 | 12 | `/img/auriculares.svg` |

No se insertan usuarios: el primer admin se crea desde `/register`, así su contraseña pasa por bcrypt.

---

## Comprobaciones manuales

Entrar en la base de datos:

```bash
docker compose exec db psql -U productos_user -d productos_db
```

Dentro de `psql`:

```
\dt                       -- listar tablas
SELECT * FROM products;   -- deberían salir 4 filas
SELECT id, email, role FROM users;
\q                        -- salir
```
