require('dotenv').config();

const { createServer } = require('node:http');
const { pool } = require('./db');

const port = Number(process.env.PORT || 3000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT debe ser un puerto válido');
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', 'http://localhost');

  if (request.method === 'GET' && url.pathname === '/health') {
    try {
      await pool.query('SELECT 1');
      sendJson(response, 200, { status: 'ok', database: 'connected' });
    } catch (error) {
      console.error('No se pudo comprobar la conexión con PostgreSQL:', error);
      sendJson(response, 503, {
        error: {
          code: 'DATABASE_UNAVAILABLE',
          message: 'No se pudo comprobar la conexión con la base de datos.'
        }
      });
    }

    return;
  }

  sendJson(response, 404, {
    error: {
      code: 'NOT_FOUND',
      message: 'Ruta no encontrada.'
    }
  });
});

server.listen(port, () => {
  console.log(`Servidor Node.js escuchando en el puerto ${port}`);
});

function closeServer() {
  server.close(async (error) => {
    if (error) {
      console.error('Error al cerrar el servidor:', error);
      process.exitCode = 1;
    }

    await pool.end();
  });
}

process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
