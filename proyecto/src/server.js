// Carga .env antes que nada (en Docker las variables ya vienen del env_file)
require('dotenv').config({ quiet: true });

if (!process.env.SESSION_SECRET) {
  console.error('Falta SESSION_SECRET en el .env');
  process.exit(1);
}

const app = require('./app');
const pool = require('./config/db');

const PORT = Number(process.env.PORT) || 3000;

async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('Conectado a PostgreSQL');
  } catch (err) {
    console.error('No se pudo conectar a PostgreSQL:', err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
}

start();
