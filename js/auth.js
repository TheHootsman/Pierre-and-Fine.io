async function checkPassword() {
    // Function to hash input string
    async function hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str.toLowerCase());
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
    }

    const inputPassword = document.getElementById("passwordInput").value;
    const hashedInput = await hashString(inputPassword);
    const correctHash = "63e14d8ebe250e386a64444764ac714cd9096aabad7490b72c7b217deb2a8cc6"; // SHA-256 of the famous password
    
    if (hashedInput === correctHash) {
        document.getElementById("auth-modal").style.display = "none";
        document.documentElement.style.overflow = 'scroll'; // Restores scrolling
    } else {
        document.getElementById("errorMsg").style.display = "block";
    }
}

