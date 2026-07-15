const readline = require('readline');
const SupportBot = require('./chatbot'); // Import our custom module

// Initialize the chatbot instance
const bot = new SupportBot();

// Setup the console interface for input and output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Start the conversation
console.log("\n==============================================");
console.log(bot.getGreeting());
console.log("==============================================\n");

// Function to handle ongoing terminal prompts
const askQuestion = () => {
    rl.question('You: ', (userInput) => {
        const response = bot.processInput(userInput);
        console.log(response + "\n");

        // If the user didn't type an exit keyword, keep asking questions
        if (userInput.toLowerCase().trim() === 'exit' || userInput.toLowerCase().trim() === 'quit') {
            rl.close();
        } else {
            askQuestion();
        }
    });
};

// Start the loop
askQuestion();