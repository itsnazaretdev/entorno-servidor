# src/middlewares/

Funciones `(req, res, next)` que se ejecutan antes (o después) de los controladores.

## Archivos

### `auth.js`

| Middleware | Qué hace | Dónde se usa |
|---|---|---|
| `requireAdmin` | Si no hay `req.session.user` o su `role` no es `admin`, redirige a `/login`. Si lo es, llama a `next()` | Todo el router `/admin` |
| `redirectIfLoggedIn` | Si ya hay sesión, manda a `/admin` en vez de mostrar login/registro otra vez | `GET /login`, `GET /register` |
| `setLocals` | Copia `req.session.user` a `res.locals.user` para que todas las vistas sepan si hay alguien logueado (y mostrar "Panel" / "Cerrar sesión" en el menú). También pasa el mensaje `flash` y lo borra de la sesión | Global, en `app.js` |

### `errorHandler.js`

| Middleware | Qué hace |
|---|---|
| `notFound` | Se ejecuta si ninguna ruta coincide. Responde `404`: JSON si la URL empieza por `/api`, si no la vista `errors/404` |
| `errorHandler` | Firma de 4 parámetros `(err, req, res, next)`. Registra el error en consola y responde `500`: JSON en `/api`, vista `errors/500` en el resto. En producción no muestra detalles técnicos al usuario |
