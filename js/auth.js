document.addEventListener("DOMContentLoaded", async function () {
    const correctHash = "9a45271efef868a31ebbd528c407c678c33d8982871d92da3a766c1283c12f69"; // SHA-256 of the famous password

    // Function to hash input string
    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
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
