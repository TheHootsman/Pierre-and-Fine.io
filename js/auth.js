document.addEventListener("DOMContentLoaded", async function () {
    const correctHash = "63e14d8ebe250e386a64444764ac714cd9096aabad7490b72c7b217deb2a8cc6"; // SHA-256 of the famous password

    // Function to hash input string
    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str.toLowerCase());
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    }

    // Requesting password input
    let userInput = prompt("Please enter the password:");
    
    if (userInput) {
        let hashedInput = await hashString(userInput);
        if (hashedInput === correctHash) {
            document.body.style.display = "block"; // Show the page if hash matches
            return;
        }
    }

    alert("Incorrect password! Access denied.");
    document.body.innerHTML = ""; // Clear content if password is wrong
});
