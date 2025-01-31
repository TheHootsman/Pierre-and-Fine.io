document.addEventListener("DOMContentLoaded", function () {
    const correctPassword = "toto123"; // Change this!
    
    let userInput = prompt("Enter the password:");

    if (userInput === correctPassword) {
        document.body.style.display = "block"; // Show the entire page
    } else {
        alert("Incorrect password! Access denied.");
        document.body.innerHTML = ""; // Clear content
    }
});
