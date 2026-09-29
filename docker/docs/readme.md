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
