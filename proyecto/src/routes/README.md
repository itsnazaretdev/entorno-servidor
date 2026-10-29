# src/routes/

Solo conectan **URL + método HTTP → controlador** (y middlewares si hacen falta). No contienen lógica.

Cada archivo crea un `express.Router()` y lo exporta. `app.js` los monta con un prefijo.

## Archivos

| Archivo | Se monta en | Rutas |
|---|---|---|
| `productRoutes.js` | `/` | `GET /`, `GET /productos/:id` |
| `apiRoutes.js` | `/api` | `GET /`, `GET /:id` |
| `authRoutes.js` | `/` | `GET/POST /register`, `GET/POST /login`, `POST /logout` |
| `adminRoutes.js` | `/admin` | Todas las del panel (ver abajo) |

## `adminRoutes.js`

Aplica `requireAdmin` **una sola vez** a todo el router (`router.use(requireAdmin)`), así ninguna ruta de admin queda desprotegida por olvido.

| Método | Ruta (dentro de `/admin`) | Controlador |
|---|---|---|
| GET | `/` | `dashboard` |
| GET | `/productos/nuevo` | `showCreateForm` |
| POST | `/productos` | `create` |
| GET | `/productos/:id/editar` | `showEditForm` |
| PUT | `/productos/:id` | `update` |
| DELETE | `/productos/:id` | `remove` |

> `/productos/nuevo` va **antes** que cualquier ruta con `/:id` para que Express no interprete "nuevo" como un id.

## PUT y DELETE desde formularios

Los formularios HTML solo admiten `GET` y `POST`. Con `method-override` el formulario se envía como `POST` con `?_method=PUT` o `?_method=DELETE` en la URL, y Express lo trata como el método real.

## Orden de montaje en `app.js`

1. Estáticos (`public/`)
2. `express.urlencoded`, `express.json`, `method-override`
3. Sesión
4. Middleware que pasa `req.session.user` a las vistas (`res.locals.user`)
5. Rutas: `authRoutes`, `apiRoutes`, `adminRoutes`, `productRoutes`
6. 404
7. Manejador de errores (siempre el último)
