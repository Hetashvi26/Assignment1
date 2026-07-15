const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from your native Node.js server setup!');
});

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(` Server executing live at: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
});