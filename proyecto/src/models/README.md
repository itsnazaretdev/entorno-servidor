# src/models/

Funciones que hablan con PostgreSQL. **Solo SQL**: no reciben `req` ni `res`, no saben nada de Express.

## Regla importante: consultas parametrizadas

Siempre se usan marcadores `$1, $2...` y se pasan los valores aparte. Nunca se concatenan valores del usuario dentro del texto SQL, para evitar **inyección SQL**.

## Archivos

### `productModel.js`

| Función | Qué hace | Devuelve |
|---|---|---|
| `findAll()` | Todos los productos ordenados por `created_at` y `name` | Array de productos |
| `findById(id)` | Un producto | Objeto o `null` si no existe |
| `create({ name, description, price, stock, image_url })` | Inserta un producto | El producto creado (`RETURNING *`) |
| `update(id, { ...campos })` | Actualiza y pone `updated_at = NOW()` | El producto actualizado o `null` |
| `remove(id)` | Elimina | `true` si borró algo, `false` si no existía |

### `userModel.js`

| Función | Qué hace | Devuelve |
|---|---|---|
| `findByEmail(email)` | Busca por email (en minúsculas) | Usuario **con** `password_hash` o `null` |
| `create({ email, passwordHash, role })` | Inserta el usuario | Usuario **sin** `password_hash` |

> El hash de la contraseña solo sale del modelo cuando hace falta compararlo en el login. Nunca se manda a una vista ni a la API.

## Nota sobre los UUID

El `id` de los productos es un UUID. Si a `findById`, `update` o `remove` les llega algo que no tiene formato UUID (por ejemplo `/api/abc`), PostgreSQL lanza un error (código `22P02`) en vez de devolver cero filas. Por eso los controladores comprueban el formato antes de llamar al modelo (ver `controllers/README.md`).

## Nota sobre `price`

PostgreSQL devuelve las columnas `NUMERIC` como **texto** (`"89.90"`) para no perder precisión. Para que `/api` devuelva un número, el modelo convierte `price` con `Number(...)` antes de devolver los datos.
