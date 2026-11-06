# Especificación: registro e inicio de sesión

> **Estado:** propuesta inicial para revisar. Describe el comportamiento esperado; no documenta una implementación existente.

## Objetivo

Definir la autenticación básica de una aplicación mediante:

- Registro de una cuenta.
- Inicio de sesión con una cuenta existente.
- Cierre de sesión.

El alcance no incluye consultar o editar perfiles, eliminar cuentas, recuperar contraseñas, verificar el correo ni gestionar roles.

El desarrollo se hará primero en Node.js. Después se realizará una versión en PHP que mantenga el mismo contrato y las mismas reglas.

## Conceptos

- **Registro:** crea una cuenta nueva a partir de sus credenciales.
- **Inicio de sesión:** valida las credenciales y establece una sesión autenticada.
- **Cierre de sesión:** invalida la sesión actual.

Registro e inicio de sesión no son por sí solos un CRUD completo: el registro crea una cuenta, pero las operaciones de consulta, actualización y eliminación de cuentas quedan fuera de este alcance.

## Contrato propuesto

Se proponen rutas HTTP independientes de un framework. Los nombres y formatos se pueden ajustar antes de implementarlos.

## Datos de la base de datos

La tabla de usuarios necesita estos campos:

| Campo | Uso |
|---|---|
| `id` | Identificador único de la cuenta, generado por el sistema; se recomienda UUID |
| `user` | Nombre de usuario obligatorio y no único |
| `email` | Correo electrónico de la cuenta |
| `passwd` | Hash seguro de la contraseña; nunca se guarda la contraseña en texto plano |

`id` será la clave primaria y `email` debe ser único, sin distinguir mayúsculas y minúsculas. Al registrar, se comprobará si el correo ya existe y se informará si la cuenta ya está registrada. Esto es una comprobación de duplicados, no una verificación de propiedad del correo mediante un enlace.

En las solicitudes de la aplicación, la contraseña se recibe como `password`; `passwd` es el nombre propuesto para almacenarla como hash en la base de datos.

### `POST /auth/register`

Crea una cuenta.

**Entrada**

| Campo | Tipo | Requerido |
|---|---|---|
| `user` | Cadena | Sí |
| `email` | Cadena | Sí |
| `password` | Cadena | Sí |

**Respuestas**

- `201 Created`: cuenta creada. No se devuelve la contraseña ni su hash.
- `400 Bad Request`: datos ausentes o inválidos.
- `409 Conflict`: ya existe una cuenta con ese correo.

### `POST /auth/login`

Valida las credenciales y establece la sesión autenticada.

**Entrada**

| Campo | Tipo | Requerido |
|---|---|---|
| `email` | Cadena | Sí |
| `password` | Cadena | Sí |

**Respuestas**

- `200 OK`: inicio de sesión correcto.
- `400 Bad Request`: datos ausentes o inválidos.
- `401 Unauthorized`: credenciales no válidas. El mensaje no debe revelar si el correo está registrado.

### `POST /auth/logout`

Invalida la sesión actual.

**Respuestas**

- `204 No Content`: sesión cerrada.
- `401 Unauthorized`: no hay una sesión autenticada, si el cierre requiere autenticación.

## Reglas funcionales

1. El `id` de cada cuenta es único; `user` es obligatorio y no necesita ser único.
2. El correo debe tener un formato válido y ser único, sin distinguir mayúsculas y minúsculas.
3. La contraseña debe contener al menos una mayúscula, un número y un carácter especial. La longitud mínima queda pendiente de definir.
4. La contraseña se almacena únicamente como un hash seguro; nunca en texto plano.
5. Las credenciales se validan tanto al registrar como al iniciar sesión.
6. Los errores de inicio de sesión usan una respuesta genérica para no confirmar la existencia de una cuenta.
7. El cierre de sesión invalida la sesión actual.

## Requisitos de seguridad

- Toda comunicación de credenciales debe realizarse mediante HTTPS.
- Aplicar límites de intentos al inicio de sesión para reducir ataques de fuerza bruta.
- No incluir contraseñas, hashes ni identificadores de sesión en registros de aplicación o mensajes de error.

## Sesión: cookie o `localStorage`

Para una aplicación web, se recomienda una **cookie de sesión** en lugar de guardar un token de autenticación en `localStorage`.

- Una cookie configurada como `HttpOnly` no puede leerse desde JavaScript de la página, lo que reduce el riesgo de robo de la sesión ante ciertos ataques XSS.
- Debe configurarse también `Secure` (solo HTTPS) y `SameSite` (`Lax` como punto de partida). Si el frontend y el backend requieren solicitudes entre sitios, habrá que ajustar `SameSite` y proteger las operaciones frente a CSRF.
- El servidor invalida la sesión al cerrar sesión. La cookie contiene el identificador de sesión, no la contraseña.
- `localStorage` es accesible desde JavaScript; por eso un token almacenado allí puede ser extraído si ocurre un XSS. No se recomienda para esta autenticación.

Esta recomendación se usará como base para Node.js y se mantendrá en la versión PHP. Si el tipo de cliente cambia (por ejemplo, una aplicación móvil), se revisará el mecanismo.

## Respuestas de error

La pregunta sobre el formato de errores se refiere a cómo devolver el detalle junto al código HTTP. Como convención inicial, se propone JSON con `error.code` y `error.message`, por ejemplo:

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Revisa los datos enviados."
  }
}
```

Los errores de validación pueden incluir un objeto `fields` con los campos que deben corregirse. Las respuestas de Node.js y PHP deberán mantener esta misma estructura.

## Decisiones pendientes

- ¿Cuál será la longitud mínima de la contraseña?

## Primer paso: esquema PostgreSQL

El esquema inicial está en [`db/schema.sql`](../db/schema.sql). La tabla `users` guarda el UUID de la cuenta, el nombre, el correo y el hash de la contraseña.

- La aplicación generará el UUID al crear la cuenta.
- Un índice único sobre `lower(email)` evita registros duplicados aunque cambien las mayúsculas del correo.
- El nombre de columna `"user"` va entre comillas porque puede confundirse con la palabra reservada `USER` de SQL.

## Conexión inicial desde Node.js

El primer servidor Node.js se conecta a PostgreSQL y expone `GET /health`. Esta ruta ejecuta `SELECT 1`: devuelve `200` si la base responde y `503` si no está disponible. Todavía no registra usuarios ni gestiona sesiones.

La aplicación lee la configuración de PostgreSQL desde `.env`. Para ejecutarla se necesita Node.js 22 o superior:

1. Instalar Node.js y las dependencias con `npm install`.
2. Arrancar PostgreSQL con `docker compose up -d`.
3. Iniciar el servidor con `npm start`.
4. Abrir `http://localhost:3000/health` y comprobar que la respuesta indica `database: "connected"`.

No se deben compartir ni subir los valores secretos de `.env`.
- La política de complejidad de contraseña se validará en Node.js; la base de datos solo almacena su hash.