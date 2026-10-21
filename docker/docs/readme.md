# Hola mundo con PHP, Node, Python y Docker

Proyecto con tres aplicaciones independientes, una en PHP, otra en Node y otra en Python.

## PHP

Construye y ejecuta la aplicación PHP:

```bash
docker compose up --build php
```

Abre [http://localhost:8080](http://localhost:8080) en el navegador. Deberías ver `Hola mundo`.

La ruta de productos está en `php/src/productos/index.php`. Apache sirve ese archivo al visitar [http://localhost:8080/productos](http://localhost:8080/productos), donde verás `Hola, desde productos`. También puedes usar [http://localhost:8080/producto](http://localhost:8080/producto); es un alias definido en `php/src/producto/index.php`.

Para detener el contenedor, pulsa `Ctrl+C` o ejecuta:

```bash
docker compose down
```

## Node

La aplicación Node se ejecuta en un contenedor separado y está disponible en el puerto 3000:

```bash
docker compose up --build node
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador. Deberías ver `Hola, mundo desde Node`.

La ruta de productos se define en `node/server.js` con `app.get("/productos", ...)`. Express responde a las peticiones GET que llegan a `/productos` con el texto `Hola, desde productos`. Como Docker publica el puerto 3000, abre [http://localhost:3000/productos](http://localhost:3000/productos) para verlo.

### Arquitectura prevista: Node.js, PostgreSQL y EJS

La aplicación Node actual es una demostración con datos definidos en el código. La conexión con PostgreSQL y el flujo descrito a continuación son el objetivo de una futura evolución; todavía no están implementados.

El navegador accederá a la aplicación en `http://localhost:3000`. Cuando solicite una página, el servidor Express consultará PostgreSQL, transformará el resultado en un objeto con estructura JSON y se lo pasará a una plantilla EJS. EJS generará el HTML y Express devolverá esa página renderizada al navegador.

```text
Navegador (localhost:3000)
        │ petición HTTP
        ▼
Node.js + Express ── consulta ──► PostgreSQL
        │                           │
        │      filas de resultados ┘
        ▼
Objeto con estructura JSON
        │ datos para la plantilla
        ▼
Plantilla EJS ── renderiza ──► HTML enviado al navegador
```

El objeto JSON es el formato de los datos entre la consulta y la plantilla; no implica que la respuesta de la página sea JSON. La respuesta al navegador será HTML generado por EJS. Si más adelante se necesita una API para otros clientes, se podrán definir rutas que respondan directamente con JSON por separado.

#### Responsabilidades

- **Express** recibe las peticiones, coordina la consulta y selecciona la plantilla que debe renderizarse.
- **PostgreSQL** almacena los datos persistentes y responde a las consultas del servidor.
- **EJS** presenta los datos recibidos y genera el HTML; no consulta la base de datos.
- **Docker Compose** coordina los contenedores de Node.js y PostgreSQL en una red interna. El navegador accede a Node mediante el puerto publicado; Node accede a PostgreSQL usando el nombre del servicio de base de datos, no `localhost`.

#### Estructura propuesta

La siguiente estructura es orientativa y se concretará al implementar la aplicación:

```text
docker/
├── docker-compose.yml
└── node/
    ├── Dockerfile
    ├── package.json
    ├── server.js
    ├── db/             # conexión y consultas a PostgreSQL
    └── views/          # plantillas EJS
```

PostgreSQL se ejecutará como un servicio independiente de Compose, con almacenamiento persistente para sus datos. La aplicación recibirá la configuración de conexión mediante variables de entorno (por ejemplo, host, puerto, nombre de base de datos, usuario y contraseña); las credenciales no deben incluirse en el código ni publicarse en el repositorio.

#### Secuencia de una petición

1. El navegador solicita una ruta de la aplicación, por ejemplo, una página de productos.
2. Express invoca la lógica de acceso a datos para consultar PostgreSQL.
3. El servidor organiza el resultado en un objeto de datos con estructura JSON.
4. La ruta pasa esos datos a la plantilla EJS correspondiente.
5. EJS renderiza el HTML y Express lo envía como respuesta al navegador.

Las consultas deberán usar parámetros para separar los valores de entrada de las instrucciones SQL. Si PostgreSQL no está disponible o la consulta falla, el servidor deberá registrar el error y responder con un error HTTP adecuado, sin presentar datos de ejemplo como si fueran datos reales.

## Python

La aplicación Python sigue la misma estructura que PHP y Node: tiene su propio directorio, un `Dockerfile` y un archivo `app.py`. El Dockerfile usa la imagen oficial de Python, copia `app.py` al contenedor, expone el puerto `5000` y ejecuta la aplicación al iniciar:

```bash
docker compose up --build python
```

Abre [http://localhost:5000](http://localhost:5000) en el navegador. Deberías ver `Hola mundo desde Python`.

## Ejecutar las dos aplicaciones

Para levantar PHP, Node y Python al mismo tiempo:

```bash
docker compose up --build
```

PHP estará en `http://localhost:8080`, Node en `http://localhost:3000` y Python en `http://localhost:5000`.
