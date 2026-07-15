const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Requirement 1: Route "/gethello" with GET method returning "Hello NodeJS!!"
app.get('/gethello', (req, res) => {
    res.send('Hello NodeJS!!');
});

// Requirement 2: Serve the HTML page at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});