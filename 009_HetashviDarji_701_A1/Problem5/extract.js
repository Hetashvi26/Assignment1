const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

/**
 * Extracts a zip file to a specified directory.
 * @param {string} zipPath - The path to the source .zip file.
 * @param {string} outputPath - The path to the directory where files should be extracted.
 * @returns {Promise<string>} - Resolves with a success message.
 */
function extractZip(zipPath, outputPath) {
    return new Promise((resolve, reject) => {
        // Validate that the zip file exists before trying to read it
        if (!fs.existsSync(zipPath)) {
            return reject(new Error(`Source zip file not found at: ${zipPath}`));
        }

        // Ensure the destination folder exists (creates recursively if missing)
        fs.mkdirSync(outputPath, { recursive: true });

        // Create a read stream and pipe it to unzipper.Extract
        const readStream = fs.createReadStream(zipPath);
        const writeStream = unzipper.Extract({ path: outputPath });

        readStream
            .pipe(writeStream)
            .on('close', () => {
                resolve(`Successfully extracted to: ${outputPath}`);
            })
            .on('error', (err) => {
                reject(new Error(`Extraction failed: ${err.message}`));
            });

        // Catch read-stream errors (e.g., permission issues during reading)
        readStream.on('error', (err) => {
            reject(new Error(`Failed to read zip file: ${err.message}`));
        });
    });
}

// --- Example Usage ---
async function run() {
    const archive = path.join(__dirname, 'archive.zip');
    const destination = path.join(__dirname, 'extracted_files');

    try {
        console.log('Extracting... Please wait.');
        const result = await extractZip(archive, destination);
        console.log(result);
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

run();