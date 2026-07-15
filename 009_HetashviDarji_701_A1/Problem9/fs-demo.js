const fs = require('fs').promises;
const path = require('path');

// Configure our demo file and folder paths
const targetDirectory = path.join(__dirname, 'demo_workspace');
const targetFile = path.join(targetDirectory, 'example.txt');
const renamedFile = path.join(targetDirectory, 'final_copy.txt');

async function runFileOperations() {
    try {
        console.log('\n--- Starting Node.js fs Module Operations ---\n');

        // 1. fs.mkdir - Create a new directory safely
        // 'recursive: true' prevents errors if the folder already exists
        await fs.mkdir(targetDirectory, { recursive: true });
        console.log(`[1] Directory created/verified at: ${targetDirectory}`);

        // 2. fs.writeFile - Create a new file and write text to it
        // This will overwrite the file if it already exists
        const initialContent = 'Hello! This is the initial text inside the file.\n';
        await fs.writeFile(targetFile, initialContent, 'utf8');
        console.log(`[2] File written successfully: ${path.basename(targetFile)}`);

        // 3. fs.appendFile - Append/add new data to the end of the existing file
        const additionalContent = 'Adding this extra line dynamically using appendFile.\n';
        await fs.appendFile(targetFile, additionalContent, 'utf8');
        console.log('[3] Content successfully appended to the file.');

        // 4. fs.readFile - Read contents from the file
        // Specifying 'utf8' ensures we get a readable string instead of a raw Buffer
        const fileData = await fs.readFile(targetFile, 'utf8');
        console.log('\n[4] Reading current file contents:\n-------------------------');
        console.log(fileData.trim());
        console.log('-------------------------\n');

        // 5. fs.stat - Retrieve metadata/information about the file (like size or creation time)
        const fileStats = await fs.stat(targetFile);
        console.log(`[5] File Metadata Retrieved:`);
        console.log(`    - Size: ${fileStats.size} bytes`);
        console.log(`    - Is it a file? ${fileStats.isFile()}`);

        // 6. fs.rename - Move or rename the file
        await fs.rename(targetFile, renamedFile);
        console.log(`[6] File successfully renamed to: ${path.basename(renamedFile)}`);

        // 7. fs.readdir - Read the contents of a directory (lists files inside)
        const folderContents = await fs.readdir(targetDirectory);
        console.log(`[7] Listing contents of the folder:`, folderContents);

        // 8. fs.unlink - Delete the file cleanly from the disk
        await fs.unlink(renamedFile);
        console.log(`[8] File cleanup complete. Deleted: ${path.basename(renamedFile)}`);

        // 9. fs.rmdir - Delete the directory cleanly
        await fs.rmdir(targetDirectory);
        console.log(`[9] Folder cleanup complete. Removed directory.`);

        console.log('\n--- All Core File System Operations Completed Error-Free! ---\n');

    } catch (error) {
        console.error('An unexpected file system error occurred:', error.message);
    }
}

// Execute the application wrapper
runFileOperations();