# src/controllers/

Lógica de cada ruta. Un controlador recibe `req`, usa los modelos y responde con `res.render(...)`, `res.json(...)` o `res.redirect(...)`.

Las funciones son `async`. Con Express 5, si una lanza un error, Express lo envía solo al middleware de errores, sin `try/catch`.

## Archivos

### `productController.js` — parte pública

| Función | Ruta | Respuesta |
|---|---|---|
| `listProducts` | `GET /` | Vista `products/index` con todos los productos |
| `showProduct` | `GET /productos/:id` | Vista `products/detail`, o 404 si no existe |

### `apiController.js` — JSON

| Función | Ruta | Respuesta |
|---|---|---|
| `getAll` | `GET /api` | `200` + array de productos |
| `getOne` | `GET /api/:id` | `200` + producto, o `404` + `{ "error": "Producto no encontrado" }` |

### `authController.js`

| Función | Ruta | Qué hace |
|---|---|---|
| `showRegister` | `GET /register` | Muestra el formulario |
| `register` | `POST /register` | Valida → comprueba email repetido → `bcrypt.hash` (10 rondas) → crea usuario → regenera la sesión → redirige a `/admin` |
| `showLogin` | `GET /login` | Muestra el formulario |
| `login` | `POST /login` | Busca por email → `bcrypt.compare` → regenera la sesión → guarda `req.session.user` → redirige a `/admin` |
| `logout` | `POST /logout` | `req.session.destroy()` → redirige a `/` |

Mensajes de error del login: siempre el mismo genérico (**"Email o contraseña incorrectos"**), sin decir cuál de los dos falla, para no revelar qué emails existen.

### `adminController.js`

| Función | Ruta | Qué hace |
|---|---|---|
| `dashboard` | `GET /admin` | Tabla con todos los productos |
| `showCreateForm` | `GET /admin/productos/nuevo` | Formulario vacío |
| `create` | `POST /admin/productos` | Valida → crea → redirige a `/admin` |
| `showEditForm` | `GET /admin/productos/:id/editar` | Formulario relleno, o 404 |
| `update` | `PUT /admin/productos/:id` | Valida → actualiza → redirige a `/admin` |
| `remove` | `DELETE /admin/productos/:id` | Elimina → redirige a `/admin` |

## Ids con formato UUID

Todas las rutas con `:id` comprueban primero que el id tiene formato UUID, con una expresión regular en un pequeño helper (`utils/isUuid.js`).
- Si no lo tiene → **404** directamente (JSON en `/api`, vista `errors/404` en el resto), sin consultar la base de datos.
- Así un id mal escrito da "no encontrado" y no un error 500.

## Validaciones

| Campo | Regla |
|---|---|
| `email` | Obligatorio, formato email, se pasa a minúsculas |
| `password` | Mínimo 8 caracteres; en registro, debe coincidir con `confirmPassword` |
| `name` | Obligatorio, máximo 100 caracteres |
| `price` | Obligatorio, número ≥ 0 |
| `stock` | Entero ≥ 0 |
| `description`, `image_url` | Opcionales |

Están en `src/utils/validators.js` (`validateProduct` y `validateCredentials`), que devuelven `{ errors, data }`. El precio acepta coma o punto decimal.

Si hay errores, se vuelve a pintar el mismo formulario (estado `422`) con los mensajes y con los datos que el usuario ya había escrito, para que no tenga que repetirlos.

## Mensajes de confirmación

Tras crear, editar, eliminar o registrarse se guarda un texto en `req.session.flash`. El middleware `setLocals` lo pasa a la vista siguiente y lo borra, así se muestra una sola vez.
