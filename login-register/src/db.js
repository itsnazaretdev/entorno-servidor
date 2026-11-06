const { Pool } = require('pg');

const requiredVariables = [
  'POSTGRES_DB',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_HOST'
];

for (const variable of requiredVariables) {
  if (!process.env[variable]) {
    throw new Error(`Falta la variable de entorno ${variable}`);
  }
}

const port = Number(process.env.POSTGRES_PORT || 5432);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('POSTGRES_PORT debe ser un puerto válido');
}

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  connectionTimeoutMillis: 5000
});

module.exports = { pool };
