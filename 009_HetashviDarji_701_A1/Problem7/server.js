const http = require('http');

// 1. Define the port number for the server
const PORT = 3000;

// 2. Create the web server using the native http module
const server = http.createServer(async (req, res) => {
    
    // Route handler for '/google'
    if (req.url === '/google' && req.method === 'GET') {
        try {
            console.log('Fetching data from Google...');

            // Fetch the Google webpage data asynchronously
            const response = await fetch('https://www.google.com');

            if (!response.ok) {
                throw new Error(`Google HTTP error! Status: ${response.status}`);
            }

            // Get the HTML text content from the response
            const htmlData = await response.text();

            // Send back the HTML content to the client browser
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(htmlData);

        } catch (error) {
            console.error('Fetch error:', error.message);
            
            // Handle server-side errors gracefully
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end(`Internal Server Error: Failed to fetch data. ${error.message}`);
        }
    } 
    // Handle the home path or any other unknown routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found. Navigate to /google to fetch data.');
    }
});

// 3. Start the server and listen for incoming traffic
server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(` Server is running successfully at:`);
    console.log(` http://localhost:${PORT}/google`);
    console.log(`==================================================\n`);
});