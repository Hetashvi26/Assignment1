/**
 * Task 1: Fetch Raw User Data from Database
 * @param {number} userId 
 * @returns {Promise<object>}
 */
function fetchUserProfile(userId) {
    return new Promise((resolve, reject) => {
        console.log(`[Task 1] Fetching raw profile details for User ID: ${userId}...`);
        
        setTimeout(() => {
            if (userId <= 0) {
                return reject(new Error("Invalid User ID provided. Fetch aborted."));
            }
            // Pass the resolved raw profile data to the next chain block
            resolve({ id: userId, username: "dev_architect", status: "active" });
        }, 1000); // Simulates a 1-second database query latency
    });
}

/**
 * Task 2: Validate Security Access Permissions (Depends on Task 1 output)
 * @param {object} userProfile 
 * @returns {Promise<object>}
 */
function verifySecurityClearance(userProfile) {
    return new Promise((resolve, reject) => {
        console.log(`[Task 2] Evaluating security credentials for @${userProfile.username}...`);
        
        setTimeout(() => {
            if (userProfile.status !== "active") {
                return reject(new Error(`Security block: Account status is ${userProfile.status}.`));
            }
            // Append clearance access level to the user data object and pass forward
            userProfile.clearanceLevel = "Level_3_Admin";
            resolve(userProfile);
        }, 1000);
    });
}

/**
 * Task 3: Generate Encryption Auth Token (Depends on Task 2 output)
 * @param {object} secureProfile 
 * @returns {Promise<object>}
 */
function generateAccessToken(secureProfile) {
    return new Promise((resolve, reject) => {
        console.log(`[Task 3] Provisioning crypto-token with clearance: ${secureProfile.clearanceLevel}...`);
        
        setTimeout(() => {
            const tokenSeed = Math.random().toString(36).substring(2, 15).toUpperCase();
            
            // Generate the finalized payload configuration bundle
            const authManifest = {
                user: secureProfile.username,
                clearance: secureProfile.clearanceLevel,
                token: `JWT_SECURE_${tokenSeed}`,
                issuedAt: new Date().toISOString()
            };
            resolve(authManifest);
        }, 1000);
    });
}

// ============================================================================
// EXECUTING THE SEQUENTIAL PROMISE CHAIN
// ============================================================================

console.log("\n==================================================");
console.log(" Starting Async Dependent Operations Pipeline     ");
console.log("==================================================\n");

// Call Task 1...
fetchUserProfile(1048)
    // ...then pass Task 1's output directly into Task 2
    .then((profileData) => {
        return verifySecurityClearance(profileData);
    })
    // ...then pass Task 2's updated output directly into Task 3
    .then((verifiedProfile) => {
        return generateAccessToken(verifiedProfile);
    })
    // ...finally handle the ultimate compiled payload response bundle
    .then((finalAuthManifest) => {
        console.log("\n==================================================");
        console.log(" Pipeline Complete! Token Generated Successfully:");
        console.log(JSON.stringify(finalAuthManifest, null, 2));
        console.log("==================================================\n");
    })
    // A single catch block gracefully intercepts errors anywhere in the chain
    .catch((error) => {
        console.error("\n[Pipeline Broken] Operation failed mid-execution:", error.message, "\n");
    });