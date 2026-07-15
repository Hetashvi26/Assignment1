const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Default to index.html if the root path is requested
    let filePath = req.url === '/' ? './index.html' : '.' + req.url;
    filePath = path.resolve(__dirname, filePath);

    // Get the file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    
    // Supported content types
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read and serve the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found (404)
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                // Server error (500)
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Success (200)
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Pure Node.js Server is running on http://localhost:${PORT}`);
});