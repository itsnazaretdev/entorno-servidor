-- =========================================================
-- Tablas de la aplicación
-- Se ejecuta solo la primera vez que se crea el volumen de Postgres
-- =========================================================

-- Productos (id UUID generado por PostgreSQL)
CREATE TABLE IF NOT EXISTS products (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(100)   NOT NULL,
    description TEXT,
    price       NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    stock       INTEGER        NOT NULL DEFAULT 0 CHECK (stock >= 0),
    image_url   VARCHAR(255),
    created_at  TIMESTAMP      NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP      NOT NULL DEFAULT NOW()
);

-- Usuarios (el registro crea usuarios con rol admin)
CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(20)  NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'user')),
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Sesiones (estructura que espera connect-pg-simple)
CREATE TABLE IF NOT EXISTS session (
    sid    VARCHAR      NOT NULL COLLATE "default" PRIMARY KEY,
    sess   JSON         NOT NULL,
    expire TIMESTAMP(6) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_session_expire ON session (expire);
