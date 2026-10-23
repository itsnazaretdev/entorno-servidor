# src/config/

Configuración compartida por toda la app. Aquí no hay rutas ni lógica de negocio.

## Archivos

### `db.js`
- Crea **un único** `Pool` de `pg` con los datos del `.env` (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
- Exporta el pool para que los modelos hagan `pool.query(...)`.
- Un pool reutiliza conexiones; abrir una conexión nueva por cada petición sería lento.

### `session.js`
- Configura `express-session` usando `connect-pg-simple` como almacén (las sesiones viven en la tabla `session` de Postgres, así no se pierden al reiniciar la app).
- Opciones previstas:

| Opción | Valor | Motivo |
|---|---|---|
| `secret` | `process.env.SESSION_SECRET` | Firma la cookie |
| `resave` | `false` | No reescribir la sesión si no cambia |
| `saveUninitialized` | `false` | No crear sesiones vacías para visitantes |
| `cookie.httpOnly` | `true` | El JavaScript del navegador no puede leer la cookie |
| `cookie.maxAge` | 2 horas | La sesión caduca sola |
| `cookie.sameSite` | `'lax'` | La cookie no se envía en peticiones POST desde otras webs |
| `cookie.secure` | `COOKIE_SECURE` del `.env` | `true` solo con HTTPS. En local con HTTP debe ser `false` |

- Exporta el middleware ya configurado para que `app.js` lo use con `app.use(...)`.

## Quién usa esta carpeta

- `models/` importa `db.js`.
- `app.js` importa `session.js`.
