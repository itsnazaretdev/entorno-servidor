# Productos App

Aplicación web en **Node.js + Express** con vistas **EJS**, base de datos **PostgreSQL** y despliegue con **Docker Compose**.

Muestra un catálogo de productos, expone los productos en JSON en `/api` y tiene una zona de administración (login y registro) desde la que se pueden **crear, editar y eliminar** productos.

> Cada carpeta tiene su propio README explicando qué contiene y por qué.

---

## Índice

1. [Tecnologías](#tecnologías)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Rutas de la aplicación](#rutas-de-la-aplicación)
4. [Flujo de autenticación](#flujo-de-autenticación)
5. [Variables de entorno](#variables-de-entorno)
6. [Docker](#docker)
7. [Puesta en marcha](#puesta-en-marcha)
8. [Orden de desarrollo recomendado](#orden-de-desarrollo-recomendado)
9. [README de cada carpeta](#readme-de-cada-carpeta)

---

## Tecnologías

| Pieza | Paquete | Para qué |
|---|---|---|
| Servidor | `express` | Rutas y middlewares |
| Plantillas | `ejs` | Renderizar HTML en el servidor |
| Base de datos | `pg` | Conectar con PostgreSQL (pool de conexiones) |
| Contraseñas | `bcryptjs` | Guardar las contraseñas cifradas (hash), nunca en texto plano. Versión en JavaScript puro de bcrypt: no necesita compilar nada al construir la imagen de Docker |
| Sesiones | `express-session` + `connect-pg-simple` | Mantener al admin logueado; las sesiones se guardan en PostgreSQL |
| Formularios PUT/DELETE | `method-override` | Los formularios HTML solo envían GET/POST; esto permite editar y eliminar |
| Configuración | `dotenv` | Leer el archivo `.env` en local |
| Desarrollo | `nodemon` | Reiniciar el servidor al guardar |

Versiones: **Node 20 o superior**, **Express 5** y **PostgreSQL 16**.

> Express 5 pasa automáticamente al manejador de errores cualquier error de una función `async`, así que los controladores no necesitan `try/catch`.

---

## Estructura del proyecto

```
productos-app/
├── README.md               ← este archivo
├── Dockerfile              ← imagen de la app Node
├── docker-compose.yml      ← levanta app + base de datos
├── .dockerignore
├── .env.example            ← plantilla de variables (sí se sube a git)
├── .env                    ← variables reales (NO se sube a git)
├── .gitignore
├── package.json
│
├── db/                     ← todo lo de PostgreSQL
│   ├── README.md
│   ├── 01-schema.sql       ← tablas
│   └── 02-seed.sql         ← los 4 productos de ejemplo
│
├── src/
│   ├── app.js              ← configura Express (middlewares, vistas, rutas)
│   ├── server.js           ← arranca el servidor (app.listen)
│   │
│   ├── config/             ← conexión a la BD y sesiones
│   │   └── README.md
│   ├── models/             ← consultas SQL (acceso a datos)
│   │   └── README.md
│   ├── controllers/        ← lógica de cada ruta
│   │   └── README.md
│   ├── routes/             ← definición de URLs
│   │   └── README.md
│   ├── middlewares/        ← protección de rutas admin, errores
│   │   └── README.md
│   ├── utils/              ← helpers: isUuid.js y validators.js
│   └── views/              ← plantillas EJS
│       └── README.md
│
└── public/                 ← CSS, imágenes, JS del navegador
    └── README.md
```

### Por qué esta separación (patrón MVC)

- **Model** (`models/`): solo habla con la base de datos. No sabe nada de HTTP.
- **View** (`views/`): solo pinta HTML con los datos que recibe.
- **Controller** (`controllers/`): recibe la petición, pide datos al modelo y decide qué vista mostrar o qué JSON devolver.
- **Routes** (`routes/`): solo asocian una URL + método HTTP con un controlador.

Así cada archivo tiene una única responsabilidad y es fácil encontrar dónde tocar.

---

## Rutas de la aplicación

### Públicas

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/` | Página de inicio con el listado de productos |
| GET | `/productos/:id` | Detalle de un producto |
| GET | `/api` | **JSON** con todos los productos |
| GET | `/api/:id` | JSON de un solo producto |

### Autenticación

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/register` | Formulario de registro |
| POST | `/register` | Crea el usuario |
| GET | `/login` | Formulario de login |
| POST | `/login` | Comprueba credenciales y crea la sesión |
| POST | `/logout` | Cierra la sesión |

### Admin (requieren sesión iniciada)

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/admin` | Panel con la tabla de productos y botones editar / eliminar |
| GET | `/admin/productos/nuevo` | Formulario para crear producto |
| POST | `/admin/productos` | Guarda el producto nuevo |
| GET | `/admin/productos/:id/editar` | Formulario de edición relleno |
| PUT | `/admin/productos/:id` | Guarda los cambios |
| DELETE | `/admin/productos/:id` | Elimina el producto |

### Ejemplo de respuesta de `/api`

```json
[
  {
    "id": "3f1c9a2e-7b4d-4e8a-9c21-5d6f0a1b2c3d",
    "name": "Teclado mecánico",
    "description": "Teclado compacto 75% con switches marrones",
    "price": 89.90,
    "stock": 15,
    "image_url": "/img/teclado.svg",
    "created_at": "2026-10-23T10:00:00.000Z"
  }
]
```

Los `id` de los productos son **UUID** (texto), no números. Ejemplo de URL: `/api/3f1c9a2e-7b4d-4e8a-9c21-5d6f0a1b2c3d`.

La API es **solo lectura**: editar y eliminar se hace desde el panel admin, no desde `/api`.

---

## Flujo de autenticación

1. El usuario entra en `/register`, rellena email y contraseña.
2. El servidor comprueba que el email no exista, cifra la contraseña con `bcryptjs` y guarda el usuario. Después inicia la sesión directamente y lleva al panel.
3. En `/login` se busca el usuario por email y se compara la contraseña con el hash.
4. Si coincide, se regenera la sesión (nuevo id, para evitar que alguien reutilice uno anterior) y se guarda `req.session.user = { id, email, role }`.
5. Las rutas `/admin/*` pasan por el middleware `requireAdmin`, que redirige a `/login` si no hay sesión.
6. `/logout` destruye la sesión.

**Decisión de roles:** como es un proyecto de práctica, todo usuario que se registra se crea con rol `admin`. La tabla `users` ya tiene la columna `role`, así que en el futuro se puede cambiar para que el registro cree usuarios `user` y solo algunos sean `admin` (o cerrar el registro tras crear el primer admin).

---

## Variables de entorno

Archivo `.env.example` (se copia a `.env` y se rellena):

| Variable | Ejemplo | Descripción |
|---|---|---|
| `PORT` | `3000` | Puerto de la app |
| `NODE_ENV` | `development` | `development` o `production` |
| `DB_HOST` | `db` | Nombre del servicio de Postgres en docker-compose |
| `DB_PORT` | `5432` | Puerto de Postgres |
| `DB_USER` | `productos_user` | Usuario de la BD |
| `DB_PASSWORD` | `cambiar_esto` | Contraseña de la BD |
| `DB_NAME` | `productos_db` | Nombre de la BD |
| `SESSION_SECRET` | `una_cadena_larga_y_aleatoria` | Firma las cookies de sesión. La app no arranca si falta |
| `COOKIE_SECURE` | `false` | `true` solo si la web se sirve por HTTPS; en localhost debe ser `false` o el login no funcionará |

> `DB_HOST` es `db` dentro de Docker. Si algún día ejecutas Node fuera de Docker, sería `localhost`.

---

## Docker

Se levantan **dos contenedores** con `docker-compose.yml`:

### Servicio `db`
- Imagen oficial `postgres:16-alpine`.
- Recibe usuario, contraseña y nombre de BD desde el `.env`.
- Monta la carpeta `./db` en `/docker-entrypoint-initdb.d`: Postgres ejecuta automáticamente los `.sql` en orden alfabético **la primera vez** que se crea el volumen (por eso se llaman `01-` y `02-`).
- Usa un volumen con nombre (`pgdata`) para que los datos no se pierdan al parar el contenedor.
- Tiene un `healthcheck` con `pg_isready` para saber cuándo está lista.

### Servicio `app`
- Se construye con el `Dockerfile` del proyecto.
- `depends_on` con `condition: service_healthy`, para que no arranque antes que la BD.
- Expone el puerto `3000`.
- Lee las variables del `.env`.

### Dockerfile (pasos previstos)
1. Partir de `node:20-alpine`.
2. Copiar primero `package.json` (y `package-lock.json` si existe) e instalar dependencias de producción (así Docker cachea esta capa).
3. Copiar el resto del código.
4. Exponer el puerto 3000 y arrancar con `node src/server.js` usando el usuario `node` (sin privilegios de root).

### `.dockerignore`
`node_modules`, `.env`, `.git`, `npm-debug.log` y los README.

---

## Puesta en marcha

```bash
npm install                 # genera node_modules y package-lock.json (recomendado subir el lock a git)
cp .env.example .env        # y rellenar valores
docker compose up --build   # construir y levantar
```

### Sin Docker (solo la app)

Con un PostgreSQL ya instalado en tu equipo, ejecuta los dos `.sql` de `db/` en una base de datos vacía, pon `DB_HOST=localhost` en el `.env` y:

```bash
npm run dev                 # arranca con nodemon
```

Después:
- Web: http://localhost:3000
- API: http://localhost:3000/api
- Registro: http://localhost:3000/register

Otros comandos útiles:

```bash
docker compose down          # parar
docker compose down -v       # parar y BORRAR la base de datos (vuelve a ejecutar los .sql)
docker compose logs -f app   # ver logs de la app
docker compose exec db psql -U productos_user -d productos_db   # entrar a Postgres
```

---

## Orden de desarrollo recomendado

1. `package.json`, `Dockerfile`, `docker-compose.yml`, `.env.example`.
2. `db/01-schema.sql` y `db/02-seed.sql` → comprobar con `psql` que hay 4 productos.
3. `src/config/db.js` y `src/server.js` mínimo → comprobar que conecta.
4. Modelo de productos + ruta `/api` → comprobar el JSON en el navegador.
5. Vistas públicas (`/` y detalle).
6. Modelo de usuarios + register / login / logout.
7. Middleware `requireAdmin` + panel admin con crear, editar y eliminar.
8. Estilos en `public/css`.

---

## README de cada carpeta

- [`db/`](db/README.md) — tablas, datos de ejemplo
- [`src/config/`](src/config/README.md) — conexión a Postgres y sesiones
- [`src/models/`](src/models/README.md) — funciones de acceso a datos
- [`src/controllers/`](src/controllers/README.md) — lógica de cada ruta
- [`src/routes/`](src/routes/README.md) — mapa de URLs
- [`src/middlewares/`](src/middlewares/README.md) — protección y errores
- [`src/views/`](src/views/README.md) — plantillas EJS
- [`public/`](public/README.md) — archivos estáticos
