// ============================================================================
// 1. DEMONSTRATING GLOBAL OBJECTS
// ============================================================================

console.log('===================================================');
console.log('         NODE.JS GLOBAL OBJECTS DEMO               ');
console.log('===================================================\n');

// global: The main global namespace object (like 'window' in browsers)
global.myGlobalVariable = "I am a custom variable attached to the global object!";
console.log(`[global] -> ${global.myGlobalVariable}`);

// __filename: The absolute path of the code file being executed
console.log(`[__filename] -> Currently executing file: ${__filename}`);

// __dirname: The absolute path of the directory containing the code file
console.log(`[__dirname] -> File is located in folder: ${__dirname}`);

// process: Provides details and control over the current Node.js process
console.log(`[process.platform] -> Operating System Platform: ${process.platform}`);
console.log(`[process.version] -> Node.js Runtime Version: ${process.version}`);
console.log(`[process.memoryUsage] -> Current Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`);

// ============================================================================
// 2. READING AND PRINTING COMMAND LINE ARGUMENTS
// ============================================================================

console.log('\n===================================================');
console.log('         COMMAND LINE ARGUMENTS PROCESSING         ');
console.log('===================================================\n');

// process.argv is an array containing the command line arguments:
// - process.argv[0]: Absolute path of the node.exe engine
// - process.argv[1]: Absolute path of the JavaScript file being executed
// - process.argv[2] and onwards: Actual custom arguments passed by the user
const allArgs = process.argv;

console.log(`Total items in process.argv: ${allArgs.length}`);
console.log('Raw process.argv array structure:', allArgs);

// Extracting only the user-defined custom arguments
const userArgs = process.argv.slice(2);

console.log('\n--- User Defined Arguments ---');
if (userArgs.length === 0) {
    console.log('No custom arguments were passed!');
    console.log('Try running: node globals_and_args.js Hello 123 "Fullstack Assignment"');
} else {
    userArgs.forEach((arg, index) => {
        console.log(`Argument #${index + 1}: ${arg}`);
    });
}

// ============================================================================
// 3. ASYNCHRONOUS TIMERS (Global Functions)
// ============================================================================
console.log('\n[setTimeout] -> Registering a 1.5-second delayed message...');
setTimeout(() => {
    console.log('\n[Timer Fired] -> Thanks for running the script! Goodbye.');
    console.log('===================================================');
}, 1500);