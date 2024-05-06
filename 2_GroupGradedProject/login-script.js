document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var validUsername = 'user';
    var validPassword = 'user';
    if (username === validUsername && password === validPassword) {
        localStorage.setItem('username', username);
        window.location.href = 'resume.html';
    } else {
        document.getElementById('errorMessage').textContent = 'Invalid username/password';
    }
});

// Function to prevent back to login
function preventBack() {
    window.history.forward();
}
setTimeout("preventBack()", 0);
window.onunload = function () { alert("Back to login is prevented") }; 