document.addEventListener("DOMContentLoaded", function () {
    const correctPassword = "toto123"; // Change this!
    
    let userInput = prompt("Enter the password:");

    if (userInput === correctPassword) {
        document.getElementById("top").style.display = "block";
    } else {
        alert("Incorrect password! Access denied.");
        document.body.innerHTML = ""; // Clear content
    }
});
