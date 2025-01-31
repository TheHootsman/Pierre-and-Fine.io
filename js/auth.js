document.addEventListener("DOMContentLoaded", function () {
    checkPassword();
});

async function checkPassword() {
    const correctHash = "ef92b778bafe771e89245b89ecbc1833a9d6c3311db7a6c2872aa9bcd49a0c06"; // SHA-256 of "mypassword"

    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    }

    let userInput = prompt("Please enter the password:");
    if (userInput) {
        let hashedInput = await hashString(userInput);
        if (hashedInput === correctHash) {
            document.body.style.display = "block"; // Show the page
            return;
        }
    }

    alert("Incorrect password! Access denied.");
    document.body.innerHTML = ""; // Erase content
}
