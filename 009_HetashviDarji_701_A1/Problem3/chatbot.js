// Predefined domain knowledge for the IT Helpdesk
const knowledgeBase = {
    greetings: ["hello", "hi", "hey", "help"],
    password: ["password", "reset", "login", "lock"],
    internet: ["wifi", "internet", "network", "slow", "connect"],
    hardware: ["printer", "mouse", "keyboard", "screen", "monitor"],
    exit: ["exit", "quit", "bye", "stop"]
};

class SupportBot {
    constructor() {
        this.botName = "TechBot";
    }

    getGreeting() {
        return `[${this.botName}]: Hello! I am your IT Support Assistant. How can I help you today? (Type 'exit' to quit)`;
    }

    // Process user input and return a domain-specific response
    processInput(input) {
        const cleanInput = input.toLowerCase().trim();

        if (this.matchesCategory(cleanInput, knowledgeBase.exit)) {
            return `[${this.botName}]: Goodbye! Have a great day.`;
        }
        if (this.matchesCategory(cleanInput, knowledgeBase.greetings)) {
            return `[${this.botName}]: I can assist you with password resets, Wi-Fi issues, or hardware troubleshooting. What seems to be the problem?`;
        }
        if (this.matchesCategory(cleanInput, knowledgeBase.password)) {
            return `[${this.botName}]: To reset your password, please visit identity.company.com or press Ctrl+Alt+Del on your workstation if you are logged in.`;
        }
        if (this.matchesCategory(cleanInput, knowledgeBase.internet)) {
            return `[${this.botName}]: For network issues, please verify that your Ethernet cable is secure or toggle your Wi-Fi off and back on. If the issue persists, reboot your router.`;
        }
        if (this.matchesCategory(cleanInput, knowledgeBase.hardware)) {
            return `[${this.botName}]: If peripheral devices aren't responding, try unplugging the USB connector, waiting 5 seconds, and plugging it into a different USB port.`;
        }

        // Fallback response if no domain keywords match
        return `[${this.botName}]: I'm sorry, I didn't quite catch that. Could you describe your problem using keywords like 'password', 'wifi', or 'printer'?`;
    }

    // Helper method to check if input matches keywords in a category
    matchesCategory(input, keywords) {
        return keywords.some(keyword => input.includes(keyword));
    }
}

// Export the module using standard CommonJS
module.exports = SupportBot;