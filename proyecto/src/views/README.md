# src/views/

Plantillas **EJS**. Reciben datos del controlador y generan HTML. No hacen consultas ni lógica, como mucho un bucle o un `if`.

## Estructura

```
views/
├── partials/
│   ├── head.ejs          ← <head>, título, enlace al CSS
│   ├── header.ejs        ← menú (cambia si hay usuario logueado)
│   ├── footer.ejs
│   └── form-errors.ejs   ← lista de errores de validación
│
├── products/
│   ├── index.ejs         ← catálogo (tarjetas)
│   └── detail.ejs        ← detalle de un producto
│
├── auth/
│   ├── login.ejs
│   └── register.ejs
│
├── admin/
│   ├── dashboard.ejs     ← tabla con editar / eliminar
│   └── product-form.ejs  ← mismo formulario para crear y editar
│
└── errors/
    ├── 404.ejs
    └── 500.ejs
```

Los partials se incluyen con `<%- include('../partials/header') %>`.

## Datos que recibe cada vista

| Vista | Variables |
|---|---|
| `products/index` | `products` |
| `products/detail` | `product` |
| `auth/login` | `errors`, `old` (email escrito) |
| `auth/register` | `errors`, `old` |
| `admin/dashboard` | `products` |
| `admin/product-form` | `product` (vacío al crear), `errors`, `isEdit` |
| Todas | `user` y `flash` (desde `res.locals`, pueden ser `null`) |

En los partials se usa `locals.user` en vez de `user`: si una variable no existe, `locals.x` da `undefined` en lugar de lanzar un error (importante en la página de error 500, que puede mostrarse antes de que se carguen esos datos).

## Detalles importantes

- **`<%= %>` vs `<%- %>`**: `<%= %>` escapa el HTML (protege contra XSS) y es el que se usa para **cualquier dato** de la BD o del usuario. `<%- %>` solo para `include` de partials.
- **Menú del header**: sin sesión → "Iniciar sesión" y "Registrarse". Con sesión → "Panel admin" y botón "Cerrar sesión" (es un formulario `POST /logout`, no un enlace).
- **`product-form.ejs`**: con `isEdit` decide el título ("Nuevo producto" / "Editar producto"), la URL de `action` y si añade `?_method=PUT`.
- **Botón eliminar** en el dashboard: formulario `POST` a `/admin/productos/:id?_method=DELETE` con un atributo `data-confirm`; `public/js/main.js` muestra el `confirm()` antes de enviar.
- Textos de cara al usuario en **español**; nombres de variables en **inglés**.
