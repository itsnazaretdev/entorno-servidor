# Tienda online

Documento inicial de arquitectura y alcance para una tienda web desarrollada con
Node.js, EJS, una API REST, PostgreSQL y Docker Compose. Este documento define
la estructura y el comportamiento esperado; no contiene una implementación.

## Objetivo

Publicar un catálogo de productos almacenado en PostgreSQL. La API consultará la
base de datos y devolverá los datos en JSON. La aplicación web consumirá esa API
y renderizará las páginas HTML con plantillas EJS. Los servicios se ejecutarán
en contenedores Docker.

## Arquitectura

```text
Navegador
   |
   v
web (Node.js + Express + EJS)
   | solicitudes HTTP internas
   v
api (Node.js + Express, API REST)
   | consultas
   v
db (PostgreSQL)
```

- **web** presenta las páginas y obtiene los datos mediante la API. No accede
  directamente a PostgreSQL. Solicita autenticación antes de mostrar productos.
- **api** valida las solicitudes, consulta PostgreSQL y responde con JSON.
- **db** almacena usuarios, sesiones, catálogos, productos y sus detalles.
- **Docker Compose** coordina los servicios y su red interna. La web y la API
  estarán disponibles desde el equipo anfitrión; PostgreSQL solo necesita ser
  accesible para la API dentro de la red de Docker.

## Estructura prevista

```text
proyecto/
├── api/
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
├── web/
│   ├── src/
│   ├── views/             # Plantillas EJS
│   ├── public/            # CSS, imágenes y otros recursos estáticos
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
├── db/
│   └── init/              # Esquema y datos iniciales de PostgreSQL
├── docs/
│   └── README.md
├── compose.yaml
└── .env.example
```

La estructura es una propuesta para la primera versión. La configuración
secreta y los archivos `.env` reales no deben incorporarse al control de
versiones.

## Modelo de datos inicial

Se propone que un catálogo agrupe productos y que cada producto tenga un único
registro de detalle. Los usuarios tendrán una cuenta para iniciar sesión y
acceder al catálogo. Los nombres indicados son nombres lógicos de tablas y
campos; se pueden ajustar al definir la implementación. Todas las claves
primarias y foráneas usarán el tipo `UUID` de PostgreSQL, incluidos los
identificadores de sesión y las relaciones entre usuarios, catálogos, productos
y detalles. Los UUID se generarán en la base de datos o en la aplicación con un
generador estándar.

### `usuarios`

| Campo | Uso |
| --- | --- |
| `id` | Identificador primario UUID. |
| `email` | Correo de inicio de sesión; único y normalizado. |
| `password_hash` | Hash de contraseña generado con un algoritmo adecuado para contraseñas; nunca almacenar la contraseña en texto plano. |
| `activo` | Permite bloquear una cuenta sin eliminarla. |
| `created_at`, `updated_at` | Fechas de creación y actualización. |

### `sesiones`

| Campo | Uso |
| --- | --- |
| `id` | Identificador primario UUID. |
| `usuario_id` | Referencia UUID al usuario autenticado. |
| `token_hash` | Hash del token de sesión; nunca almacenar el token en claro. |
| `expira_at` | Fecha y hora de expiración de la sesión. |
| `created_at` | Fecha y hora de creación. |

Las sesiones autenticadas deberán expirar y poder invalidarse al cerrar sesión.

### `catalogos`

| Campo | Uso |
| --- | --- |
| `id` | Identificador primario UUID. |
| `nombre` | Nombre visible del catálogo. |
| `slug` | Nombre legible para URL; único. |
| `descripcion` | Descripción opcional. |
| `activo` | Indica si se muestra en la tienda. |
| `created_at`, `updated_at` | Fechas de creación y actualización. |

### `categorias`

| Campo | Uso |
| --- | --- |
| `id` | Identificador primario UUID. |
| `nombre` | Nombre visible de la categoría. |
| `slug` | Nombre legible para URL; único. |
| `descripcion` | Descripción opcional. |
| `activo` | Indica si la categoría se muestra en la tienda. |
| `created_at`, `updated_at` | Fechas de creación y actualización. |

### `productos`

| Campo | Uso |
| --- | --- |
| `id` | Identificador primario UUID. |
| `catalogo_id` | Referencia UUID al catálogo al que pertenece el producto. |
| `categoria_id` | Referencia UUID a la categoría del producto. |
| `nombre` | Nombre visible del producto. |
| `slug` | Nombre legible para URL; único. |
| `resumen` | Texto breve para las tarjetas del catálogo. |
| `precio` | Precio decimal, no negativo. |
| `moneda` | Código de moneda de tres caracteres, por ejemplo `EUR`. |
| `activo` | Indica si el producto se puede mostrar y consultar. |
| `created_at`, `updated_at` | Fechas de creación y actualización. |

### `detalle_productos`

| Campo | Uso |
| --- | --- |
| `producto_id` | Clave primaria UUID y referencia única a `productos.id`. |
| `descripcion` | Descripción completa del producto. |
| `sku` | Referencia de inventario; única si se proporciona. |
| `stock` | Unidades disponibles; valor entero no negativo. |
| `imagen_url` | URL o ruta de la imagen principal; opcional. |
| `especificaciones` | Atributos variables del producto, almacenados como JSONB. |

### Relaciones e integridad

- `usuarios.id` tiene una relación uno a muchos con `sesiones.usuario_id`.
- `catalogos.id` tiene una relación uno a muchos con `productos.catalogo_id`.
- `categorias.id` tiene una relación uno a muchos con `productos.categoria_id`.
- `productos.id` tiene una relación uno a uno con `detalle_productos.producto_id`.
- Las claves foráneas deben impedir detalles o productos asociados a registros
  inexistentes. Al eliminar un catálogo con productos, la aplicación debe evitar
  una eliminación accidental o definir explícitamente una política de borrado.
- Los precios se guardan con tipo decimal, nunca como punto flotante. El stock
  y los precios deben validarse tanto en la API como en la base de datos.
- La primera versión asume que cada producto pertenece a un solo catálogo. Si
  un producto debe aparecer en varios catálogos, se deberá sustituir esa
  relación por una tabla intermedia.

## API REST

La ruta principal de datos será `GET /api/json`. Devolverá en una sola respuesta
JSON los catálogos activos, sus productos activos y los detalles disponibles de
cada producto. Requiere que el usuario haya iniciado sesión.

| Método y ruta | Resultado |
| --- | --- |
| `POST /api/login` | Recibe correo y contraseña, valida las credenciales y crea una sesión autenticada. |
| `POST /api/logout` | Invalida la sesión actual. |
| `GET /api/json` | Devuelve el catálogo y los productos con sus detalles; requiere autenticación. |

Una respuesta satisfactoria de `GET /api/json` tendrá esta forma:

```json
{
  "catalogos": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "nombre": "Accesorios",
      "slug": "accesorios",
      "productos": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440010",
          "nombre": "Mochila",
          "slug": "mochila",
          "categoria": {
            "id": "550e8400-e29b-41d4-a716-446655440020",
            "nombre": "Bolsos",
            "slug": "bolsos"
          },
          "resumen": "Mochila de uso diario",
          "precio": "49.90",
          "moneda": "EUR",
          "detalle": {
            "descripcion": "Descripción completa del producto",
            "sku": "MOCH-001",
            "stock": 12,
            "imagen_url": "/images/mochila.jpg",
            "especificaciones": {}
          }
        }
      ]
    }
  ]
}
```

El precio se serializa como decimal exacto. Las rutas de inicio de sesión y
cierre de sesión aceptan y devuelven JSON; las credenciales inválidas deben
responder con `401`, y una petición sin sesión válida a `/api/json` también
debe responder con `401`. Los errores incluirán un mensaje claro, sin exponer
credenciales ni detalles internos de la base de datos.

La sesión se transportará mediante una cookie `HttpOnly`, `SameSite` y `Secure`
en producción; la cookie contendrá un token aleatorio cuya versión en claro no
se almacena en la base de datos. La API validará la sesión en cada solicitud
protegida. La implementación deberá limitar intentos de inicio de sesión,
proteger las operaciones autenticadas frente a CSRF y no registrar contraseñas
ni tokens.

## Aplicación web

La aplicación `web` renderizará HTML con EJS y obtendrá los datos a través de la
API. Las vistas iniciales previstas son:

- **Inicio de sesión:** formulario para acceder con una cuenta.
- **Catálogo:** muestra catálogos y productos solo a usuarios autenticados.
- **Productos de un catálogo:** muestra las tarjetas de sus productos tras
  comprobar la sesión.
- **Detalle de producto:** muestra descripción, precio, imagen, especificaciones
  y disponibilidad tras comprobar la sesión.

Las solicitudes del servidor web a la API usarán una URL configurable por
entorno. Dentro de Docker, la comunicación se realizará por el nombre del
servicio de la API, no por `localhost`. La web reenviará a la API la cookie de
sesión de la solicitud del usuario. Si no hay sesión o esta ha expirado, la web
redirigirá a la página de inicio de sesión; si la API no está disponible, la
web debe mostrar un error controlado y no fingir que la consulta tuvo éxito.

## Contenedores y configuración

`compose.yaml` definirá los servicios `web`, `api` y `db`, una red interna y un
volumen persistente para los datos de PostgreSQL. La API dependerá de que la
base de datos esté lista; la web dependerá de la API. La disponibilidad debe
comprobarse con healthchecks o reintentos, ya que el orden de inicio por sí
solo no garantiza que un servicio esté preparado.

Variables de entorno previstas:

| Variable | Servicio | Uso |
| --- | --- | --- |
| `WEB_PORT` | web | Puerto de escucha de la web dentro del contenedor. |
| `API_BASE_URL` | web | URL interna de la API. |
| `API_PORT` | api | Puerto de escucha de la API dentro del contenedor. |
| `DATABASE_URL` | api | Conexión de la API a PostgreSQL. |
| `POSTGRES_DB` | db | Nombre de la base de datos inicial. |
| `POSTGRES_USER` | db | Usuario de PostgreSQL. |
| `POSTGRES_PASSWORD` | db | Contraseña de PostgreSQL; debe configurarse fuera del repositorio. |

Los puertos publicados al anfitrión se definirán en Compose y se documentarán
en `.env.example`. En un entorno de despliegue, los secretos deben gestionarse
mediante el mecanismo seguro del entorno y no mediante valores de ejemplo.

## Flujo de una solicitud

1. El navegador solicita una página a `web`.
2. Si el usuario no tiene sesión, `web` presenta el formulario de inicio de
   sesión y envía las credenciales a `api`.
3. `api` valida las credenciales y crea la sesión.
4. Para una página de productos, `web` reenvía la cookie de sesión al endpoint
   `GET /api/json`.
5. `api` valida la sesión, consulta PostgreSQL y devuelve JSON; `web` entrega
   los datos a la plantilla EJS y responde con HTML.

## Puesta en marcha prevista

Cuando se implemente el proyecto, el flujo local deberá ser:

1. Copiar `.env.example` a `.env` y completar los valores locales.
2. Levantar los servicios con Docker Compose.
3. Esperar a que PostgreSQL y la API indiquen que están disponibles.
4. Abrir en el navegador el puerto publicado para `web`.
5. Consultar los endpoints de la API para comprobar las respuestas JSON.

Los pasos y comandos definitivos se añadirán al completar `compose.yaml` y los
Dockerfiles.

## Alcance inicial y criterios de aceptación

- PostgreSQL contiene catálogos, productos y detalles relacionados mediante
  claves e integridad referencial, además de usuarios y sesiones.
- Un usuario puede iniciar y cerrar sesión, y las contraseñas nunca se guardan
  en texto plano.
- `GET /api/json` devuelve catálogos, productos y sus detalles en JSON, y
  rechaza solicitudes no autenticadas.
- Cada producto está asociado a un catálogo y a una categoría.
- La web requiere inicio de sesión para mostrar el catálogo y las páginas de
  productos, que renderiza con EJS a partir de datos recibidos de la API.
- La web no mantiene una conexión directa con PostgreSQL.
- Los servicios se pueden levantar conjuntamente con Docker Compose y los
  datos de PostgreSQL persisten al reiniciar los contenedores.
- La configuración sensible no está guardada en el repositorio.

Administración de productos, carrito, pagos, pedidos e imágenes gestionadas por
almacenamiento externo quedan fuera del alcance inicial.