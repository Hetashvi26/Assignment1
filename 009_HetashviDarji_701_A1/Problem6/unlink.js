const fs = require('fs');
const util = require('util');
const path = require('path');

// 1. Promisify the fs.unlink function
const unlinkPromise = util.promisify(fs.unlink);

const targetFile = path.join(__dirname, 'temp_file.txt');

async function run() {
    // Setup: Create a temporary file to delete so the code has an asset to work with
    fs.writeFileSync(targetFile, 'This file is scheduled for deletion.');
    console.log(`[Setup] Created temporary file at: ${targetFile}`);

    try {
        console.log('Attempting to delete the file using the Promisified unlink...');
        
        // 2. Call the promisified function using await
        await unlinkPromise(targetFile);
        
        console.log('Success! The file was successfully deleted.');
    } catch (error) {
        console.error('An error occurred during file deletion:', error.message);
    }
}

run();