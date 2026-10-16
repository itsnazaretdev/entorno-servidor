const http = require('http');

// Si no se define NODE_ENV, usamos 'development' por defecto
let env = process.env.NODE_ENV;
if (!env) {
    env = 'development';
}

const server = http.createServer((req, res) => {
    if (req.url === '/error') {
        try {
            throw new Error('Fallo al conectar con la base de datos en db.js:42');
        } catch (err) {
            res.statusCode = 500;
            if (env === 'production') {
                res.end('Algo ha ido mal. Inténtalo más tarde.');
            } else {
                res.end('Error: ' + err.message + '\n\n' + err.stack);
            }
        }
        return;
    }
    res.end('Servidor en modo: ' + env);
});

server.listen(3000, () => {
    console.log('Servidor en http://localhost:3000 (modo ' + env + ')');
});
